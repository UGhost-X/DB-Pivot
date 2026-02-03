import knex from 'knex'
import { LRUCache } from 'lru-cache'

// Cache configuration
const metadataCache = new LRUCache<string, { data: any; tree?: any }>({
  max: 500,
  ttl: 5 * 60 * 1000,
})

function getCacheKey(params: {
  type: string
  host: string
  port: number
  user: string
  database: string
  schemaName?: string | null
  tableName?: string | null
}) {
  const { type, host, port, user, database, schemaName, tableName } = params
  const schemaPart = schemaName ? `:${schemaName}` : ''
  const tablePart = tableName ? `:${tableName}` : ''
  return `${type}:${user}@${host}:${port}/${database}${schemaPart}${tablePart}`
}

const withTimeout = async <T>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  try {
    return await Promise.race([
      promise,
      new Promise<T>((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error('Connection timeout')), timeoutMs)
      }),
    ])
  } finally {
    if (timeoutId) clearTimeout(timeoutId)
  }
}

const escapeMySqlIdentifier = (value: string) => `\`${String(value).replace(/`/g, '``')}\``

const extractMySqlRows = (rawResult: any) => {
  if (Array.isArray(rawResult) && Array.isArray(rawResult[0])) return rawResult[0]
  if (Array.isArray(rawResult)) return rawResult[0]
  return rawResult
}

async function getTableList(client: any, type: string, database: string) {
  if (type === 'pg') {
    const result = await client.raw(`
      SELECT
        n.nspname AS table_schema,
        c.relname AS table_name
      FROM pg_catalog.pg_class c
      JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
      WHERE n.nspname NOT IN ('information_schema', 'pg_catalog')
        AND n.nspname NOT LIKE 'pg_toast%'
        AND c.relkind IN ('r', 'p')
      ORDER BY n.nspname, c.relname
    `)
    return result.rows
  }

  const dbEsc = escapeMySqlIdentifier(database)
  const rawResult = await client.raw(`SHOW FULL TABLES FROM ${dbEsc}`)
  const rows = extractMySqlRows(rawResult) as Array<Record<string, any>>

  return rows
    .map((row) => {
      const keys = Object.keys(row)
      const tableName = row[keys[0]]
      const tableType = row[keys[1]]
      return { table_schema: 'public', table_name: tableName, table_type: tableType }
    })
    .filter((row) => row.table_name && (row.table_type === 'BASE TABLE' || row.table_type === 'VIEW'))
}

async function getTableColumns(client: any, type: string, database: string, tableName: string, schemaName: string = 'public') {
  if (type === 'pg') {
    const result = await client.raw(
      `
      SELECT
        a.attname AS column_name,
        format_type(a.atttypid, a.atttypmod) AS data_type,
        NOT a.attnotnull AS is_nullable,
        EXISTS (
          SELECT 1
          FROM pg_catalog.pg_constraint con
          WHERE con.conrelid = c.oid
            AND con.contype = 'p'
            AND a.attnum = ANY(con.conkey)
        ) AS is_primary_key,
        EXISTS (
          SELECT 1
          FROM pg_catalog.pg_constraint con
          WHERE con.conrelid = c.oid
            AND con.contype = 'f'
            AND a.attnum = ANY(con.conkey)
        ) AS is_foreign_key
      FROM pg_catalog.pg_class c
      JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
      JOIN pg_catalog.pg_attribute a ON a.attrelid = c.oid
      WHERE n.nspname = ?
        AND c.relname = ?
        AND a.attnum > 0
        AND NOT a.attisdropped
      ORDER BY a.attnum
      `,
      [schemaName || 'public', tableName]
    )
    return result.rows
  }

  const dbEsc = escapeMySqlIdentifier(database)
  const tableEsc = escapeMySqlIdentifier(tableName)

  const rawColumnsResult = await client.raw(`SHOW COLUMNS FROM ${dbEsc}.${tableEsc}`)
  const columnsRows = extractMySqlRows(rawColumnsResult) as Array<Record<string, any>>

  const rawFkResult = await client.raw(
    `
    SELECT COLUMN_NAME AS column_name
    FROM information_schema.KEY_COLUMN_USAGE
    WHERE TABLE_SCHEMA = ?
      AND TABLE_NAME = ?
      AND REFERENCED_TABLE_NAME IS NOT NULL
    `,
    [database, tableName]
  )
  const fkRows = extractMySqlRows(rawFkResult) as Array<{ column_name: string }>
  const fkSet = new Set(fkRows.map((r) => r.column_name))

  return columnsRows.map((row) => ({
    column_name: row.Field,
    data_type: row.Type,
    is_nullable: row.Null,
    is_primary_key: row.Key === 'PRI' ? 1 : 0,
    is_foreign_key: fkSet.has(row.Field) ? 1 : 0,
  }))
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { type, host, port, user, password, database, timeoutMs: timeoutMsRaw, tableName, schemaName } = body
  const timeoutMs = Number(timeoutMsRaw) > 0 ? Number(timeoutMsRaw) : 30000

  if (!type || !host || !user || !database) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required connection details',
    })
  }

  const defaultPort =
    type === 'pg' ? 5432 : type === 'mysql' || type === 'mysql2' ? 3306 : 5432
  const parsedPort =
    typeof port === 'number' ? port : Number.parseInt(String(port ?? ''), 10)
  const effectivePort = Number.isFinite(parsedPort) ? parsedPort : defaultPort

  // Check Cache
  const cacheKey = getCacheKey({
    type,
    host,
    port: effectivePort,
    user,
    database,
    schemaName: schemaName ?? null,
    tableName: tableName ?? null,
  })
  const cached = metadataCache.get(cacheKey)
  if (cached) {
    return { success: true, data: cached.data, tree: cached.tree, fromCache: true }
  }

  const client = knex({
    client: type === 'mysql' ? 'mysql2' : type,
    connection: {
      host,
      port: effectivePort,
      user,
      password,
      database,
      ...(type === 'pg' ? { connectionTimeoutMillis: timeoutMs } : {}),
      ...(type === 'mysql' || type === 'mysql2'
        ? {
            connectTimeout: timeoutMs,
            ssl: { rejectUnauthorized: false },
          }
        : {}),
    },
    acquireConnectionTimeout: timeoutMs,
    pool: {
      min: 0,
      max: 1,
      idleTimeoutMillis: 5000,
    }
  })


  try {
    if (tableName) {
        const rows = await withTimeout(getTableColumns(client, type, database, tableName, schemaName), timeoutMs)
        
        const columns = rows.map((row: any) => ({
            name: row.column_name,
            type: row.data_type,
            nullable: row.is_nullable === 'YES' || row.is_nullable === true || row.is_nullable === 1,
            isPrimaryKey: Boolean(row.is_primary_key),
            isForeignKey: Boolean(row.is_foreign_key)
        }))

        const resultData = { [tableName]: columns }
        
        // Cache the result
        metadataCache.set(cacheKey, { data: resultData })
        
        return { success: true, data: resultData }
    }

    // 2. Otherwise, fetch table list only (Initial load)
    console.log(`[Metadata] Fetching table list only`)
    
    const rows = await withTimeout(getTableList(client, type, database), timeoutMs)
    
    // Process rows into structure
    const tables: Record<string, any[]> = {}
    const schemas: Record<string, string[]> = {}
    
    for (const row of rows) {
        const tName = row.table_name
        const sName = row.table_schema || 'public'
        
        // Initialize with empty columns for lazy loading
        if (!tables[tName]) {
            tables[tName] = []
        }

        if (!schemas[sName]) schemas[sName] = []
        if (!schemas[sName].includes(tName)) schemas[sName].push(tName)
    }

    const tree = {
      database,
      schemas: Object.fromEntries(
        Object.entries(schemas).map(([sName, tNames]) => [
          sName,
          { tables: tNames.sort((a, b) => a.localeCompare(b)) },
        ])
      ),
    }

    // Cache the result
    metadataCache.set(cacheKey, { data: tables, tree })

    return { success: true, data: tables, tree }

  } catch (error: any) {
    console.error('Database connection error:', error)
    throw createError({
        statusCode: 500,
        statusMessage: `Connection failed: ${error.message}`,
    })
  } finally {
    await client.destroy()
  }
})
