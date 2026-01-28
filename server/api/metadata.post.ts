import knex from 'knex'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { type, host, port, user, password, database } = body

  if (!type || !host || !user || !database) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required connection details',
    })
  }

  const defaultPort =
    type === 'pg' ? 5432 : type === 'mysql' || type === 'mysql2' ? 3306 : 5432

  const client = knex({
    client: type,
    connection: {
      host,
      port: parseInt(port) || defaultPort,
      user,
      password,
      database,
    },
  })

  try {
    let rows = []
    
    if (type === 'pg') {
      const result = await client.raw(`
        SELECT 
          cols.table_schema,
          cols.table_name, 
          cols.column_name, 
          cols.data_type,
          cols.is_nullable,
          EXISTS (
            SELECT 1 FROM information_schema.table_constraints tc 
            JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name 
            WHERE tc.constraint_type = 'PRIMARY KEY' 
              AND tc.table_schema = cols.table_schema
              AND tc.table_name = cols.table_name 
              AND kcu.table_schema = cols.table_schema
              AND kcu.column_name = cols.column_name
          ) as is_primary_key,
          EXISTS (
            SELECT 1 FROM information_schema.table_constraints tc 
            JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name 
            WHERE tc.constraint_type = 'FOREIGN KEY' 
              AND tc.table_schema = cols.table_schema
              AND tc.table_name = cols.table_name 
              AND kcu.table_schema = cols.table_schema
              AND kcu.column_name = cols.column_name
          ) as is_foreign_key
        FROM information_schema.columns cols
        WHERE cols.table_schema NOT IN ('information_schema', 'pg_catalog')
        ORDER BY cols.table_schema, cols.table_name, cols.ordinal_position;
      `)
      rows = result.rows
    } else if (type === 'mysql' || type === 'mysql2') {
      const result = await client.raw(`
        SELECT 
          cols.TABLE_SCHEMA as table_schema,
          cols.TABLE_NAME as table_name, 
          cols.COLUMN_NAME as column_name, 
          cols.DATA_TYPE as data_type,
          cols.IS_NULLABLE as is_nullable,
          EXISTS (
            SELECT 1
            FROM information_schema.TABLE_CONSTRAINTS tc
            JOIN information_schema.KEY_COLUMN_USAGE kcu
              ON tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
              AND tc.TABLE_SCHEMA = kcu.TABLE_SCHEMA
              AND tc.TABLE_NAME = kcu.TABLE_NAME
            WHERE tc.CONSTRAINT_TYPE = 'PRIMARY KEY'
              AND tc.TABLE_SCHEMA = cols.TABLE_SCHEMA
              AND tc.TABLE_NAME = cols.TABLE_NAME
              AND kcu.COLUMN_NAME = cols.COLUMN_NAME
          ) as is_primary_key,
          EXISTS (
            SELECT 1
            FROM information_schema.TABLE_CONSTRAINTS tc
            JOIN information_schema.KEY_COLUMN_USAGE kcu
              ON tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
              AND tc.TABLE_SCHEMA = kcu.TABLE_SCHEMA
              AND tc.TABLE_NAME = kcu.TABLE_NAME
            WHERE tc.CONSTRAINT_TYPE = 'FOREIGN KEY'
              AND tc.TABLE_SCHEMA = cols.TABLE_SCHEMA
              AND tc.TABLE_NAME = cols.TABLE_NAME
              AND kcu.COLUMN_NAME = cols.COLUMN_NAME
          ) as is_foreign_key
        FROM INFORMATION_SCHEMA.COLUMNS cols
        WHERE cols.TABLE_SCHEMA = ?
        ORDER BY cols.TABLE_SCHEMA, cols.TABLE_NAME, cols.ORDINAL_POSITION;
      `, [database])
      rows = result[0]
    } else {
        throw createError({
            statusCode: 400,
            statusMessage: 'Unsupported database type',
        })
    }

    // Process rows into a structured format
    // { [tableName]: { columns: [{ name, type }] } }
    const tables: Record<string, any[]> = {}
    const schemas: Record<string, string[]> = {}
    
    for (const row of rows) {
        const tableName = row.table_name
        const schemaName = row.table_schema || 'public'
        if (!tables[tableName]) {
            tables[tableName] = []
        }
        tables[tableName].push({
            name: row.column_name,
            type: row.data_type,
            nullable: row.is_nullable === 'YES',
            isPrimaryKey: Boolean(row.is_primary_key),
            isForeignKey: Boolean(row.is_foreign_key)
        })

        if (!schemas[schemaName]) schemas[schemaName] = []
        if (!schemas[schemaName].includes(tableName)) schemas[schemaName].push(tableName)
    }

    const tree = {
      database,
      schemas: Object.fromEntries(
        Object.entries(schemas).map(([schemaName, tableNames]) => [
          schemaName,
          { tables: tableNames.sort((a, b) => a.localeCompare(b)) },
        ])
      ),
    }

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
