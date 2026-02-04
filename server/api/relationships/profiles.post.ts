import prisma from '../../utils/prisma'
import knex from 'knex'
import { BloomFilter } from '../../utils/bloomFilter'

type ProfileResult = {
  sampleValues: any[]
  sampleDistinctRatio?: number
  strategy?: string
  bloomFilter?: string
}

type ColumnKey = `${string}::${string}`

const asNumber = (value: unknown): number => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0
  if (typeof value === 'bigint') {
    const max = BigInt(Number.MAX_SAFE_INTEGER)
    return Number(value > max ? max : value)
  }
  if (typeof value === 'string') {
    const n = Number(value)
    return Number.isFinite(n) ? n : 0
  }
  return 0
}

const uniqueValues = (arr: any[], limit: number) => {
  const set = new Set<string>()
  const out: any[] = []
  for (const v of arr) {
    if (v === null || v === undefined) continue
    const k = String(v)
    if (set.has(k)) continue
    set.add(k)
    // Ensure value is JSON safe (convert BigInt to string)
    out.push(typeof v === 'bigint' ? v.toString() : v)
    if (out.length >= limit) break
  }
  return out
}

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const body = await readBody(event)
  const {
    connectionId,
    tables,
    sampleSize = 100,
    cacheTtlSeconds = 24 * 60 * 60,
    fullScanMaxRows = 200000,
    persistDistinctRatioThreshold = 0.05,
  } = body || {}

  const parsedConnectionId = Number(connectionId)
  if (!Number.isFinite(parsedConnectionId) || !Array.isArray(tables)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required parameters',
    })
  }

  const connection = await prisma.connection.findFirst({
    where: { id: parsedConnectionId, ownerId: user.id }
  })

  if (!connection) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Connection not found',
    })
  }

  const requested: Array<{ tableName: string; columnName: string }> = []
  for (const t of tables) {
    const tableName = t?.tableName
    const columns = Array.isArray(t?.columns) ? t.columns : []
    if (!tableName || columns.length === 0) continue
    for (const columnName of columns) {
      if (!columnName) continue
      requested.push({ tableName, columnName })
    }
  }

  const profiles: Record<string, Record<string, ProfileResult>> = {}
  if (requested.length === 0) return { success: true, profiles }

  const parsedPersistThreshold = (() => {
    const n = Number(persistDistinctRatioThreshold)
    if (!Number.isFinite(n)) return 0.05
    return Math.min(1, Math.max(0, n))
  })()

  const now = Date.now()
  const cutoff = new Date(now - Math.max(1, Number(cacheTtlSeconds)) * 1000)

  const tableNames = Array.from(new Set(requested.map((r) => r.tableName)))
  const existingProfiles = await prisma.columnProfile.findMany({
    where: {
      connectionId: connection.id,
      tableName: { in: tableNames },
    }
  })

  const existingMap = new Map<ColumnKey, any>()
  for (const p of existingProfiles) {
    existingMap.set(`${p.tableName}::${p.columnName}`, p)
  }

  const missing: Array<{ tableName: string; columnName: string }> = []
  for (const r of requested) {
    const key: ColumnKey = `${r.tableName}::${r.columnName}`
    const cached = existingMap.get(key)
    if (cached && cached.lastUpdated && new Date(cached.lastUpdated) >= cutoff) {
      const cachedSamples = Array.isArray(cached.sampleValues) ? cached.sampleValues : []
      const approxRatio = Number(sampleSize) > 0 ? cachedSamples.length / Number(sampleSize) : 0
      if (approxRatio > 0 && approxRatio < parsedPersistThreshold) {
        missing.push(r)
        continue
      }
      const tableProfiles = profiles[r.tableName] ?? (profiles[r.tableName] = {})
      tableProfiles[r.columnName] = {
        sampleValues: cachedSamples,
        bloomFilter: typeof cached.bloomFilter === 'string' ? cached.bloomFilter : undefined,
        strategy: 'cache',
      }
    } else {
      missing.push(r)
    }
  }

  if (missing.length === 0) return { success: true, profiles }

  const defaultPort =
    connection.type === 'pg'
      ? 5432
      : connection.type === 'mysql' || connection.type === 'mysql2'
        ? 3306
        : 5432

  const dbClient = knex({
    client: connection.type,
    connection: {
      host: connection.host,
      port: connection.port || defaultPort,
      user: connection.user,
      password: connection.password,
      database: connection.database,
    },
  })

  const quoteIdent = (name: string) => {
    if (connection.type === 'pg') return `"${String(name).replace(/"/g, '""')}"`
    return `\`${String(name).replace(/`/g, '``')}\``
  }

  const extractFirstRow = (rawResult: any) => {
    if (connection.type === 'pg') return rawResult?.rows?.[0]
    return rawResult?.[0]?.[0]
  }

  const extractRows = (rawResult: any) => {
    if (connection.type === 'pg') return rawResult?.rows || []
    return rawResult?.[0] || []
  }

  const splitTableRef = (tableRef: string): { schema: string | null; table: string } => {
    const s = String(tableRef)
    const lastDot = s.lastIndexOf('.')
    if (lastDot > 0 && lastDot < s.length - 1) {
      return { schema: s.slice(0, lastDot), table: s.slice(lastDot + 1) }
    }
    return { schema: null, table: s }
  }

  const quoteTableRef = (tableRef: string) => {
    const { schema, table } = splitTableRef(tableRef)
    if (connection.type === 'pg') {
      if (schema) return `${quoteIdent(schema)}.${quoteIdent(table)}`
      return quoteIdent(table)
    }
    if (schema) return `${quoteIdent(schema)}.${quoteIdent(table)}`
    return quoteIdent(table)
  }

  const getRowEstimate = async (tableName: string): Promise<number | null> => {
    try {
      if (connection.type === 'mysql' || connection.type === 'mysql2') {
        const q = `
          SELECT TABLE_ROWS as estimate
          FROM information_schema.TABLES
          WHERE TABLE_SCHEMA = ?
            AND TABLE_NAME = ?
          LIMIT 1
        `
        const { table } = splitTableRef(tableName)
        const raw = await dbClient.raw(q, [connection.database, table])
        const row = extractFirstRow(raw)
        const estimate = row?.estimate
        const n = asNumber(estimate)
        return n > 0 ? n : null
      }

      if (connection.type === 'pg') {
        const { schema, table } = splitTableRef(tableName)
        const q = schema
          ? `
            SELECT c.reltuples::bigint as estimate
            FROM pg_catalog.pg_class c
            JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
            WHERE n.nspname = ?
              AND c.relname = ?
            LIMIT 1
          `
          : `
            SELECT reltuples::bigint as estimate
            FROM pg_class
            WHERE relname = ?
            LIMIT 1
          `

        const raw = schema ? await dbClient.raw(q, [schema, table]) : await dbClient.raw(q, [table])
        const row = extractFirstRow(raw)
        const n = asNumber(row?.estimate)
        return n > 0 ? n : null
      }
    } catch {
      return null
    }
    return null
  }

  const estimateDistinctPg = async (tableName: string, columnName: string, totalEstimate: number | null) => {
    try {
      const { schema, table } = splitTableRef(tableName)
      const q = `
        SELECT n_distinct
        FROM pg_stats
        WHERE tablename = ?
          AND attname = ?
          ${schema ? 'AND schemaname = ?' : ''}
        LIMIT 1
      `
      const bindings = schema ? [table, columnName, schema] : [table, columnName]
      const raw = await dbClient.raw(q, bindings)
      const row = extractFirstRow(raw)
      const nDistinct = Number(row?.n_distinct)
      if (!Number.isFinite(nDistinct)) return null
      if (nDistinct < 0 && typeof totalEstimate === 'number' && totalEstimate > 0) {
        return Math.max(0, Math.round(-nDistinct * totalEstimate))
      }
      return Math.max(0, Math.round(nDistinct))
    } catch {
      return null
    }
  }

  const estimateDistinctMySql = async (tableName: string, columnName: string) => {
    try {
      const { table } = splitTableRef(tableName)
      const q = `
        SELECT MAX(CARDINALITY) as cardinality
        FROM information_schema.STATISTICS
        WHERE TABLE_SCHEMA = ?
          AND TABLE_NAME = ?
          AND COLUMN_NAME = ?
      `
      const raw = await dbClient.raw(q, [connection.database, table, columnName])
      const row = extractFirstRow(raw)
      const n = asNumber(row?.cardinality)
      return n > 0 ? n : null
    } catch {
      return null
    }
  }

  const computeProfile = async (tableName: string, columnName: string, rowEstimate: number | null): Promise<{
    profile: ProfileResult
    persist: { sampleValues: any[]; bloomFilter?: string } | null
  }> => {
    const qt = quoteTableRef(tableName)
    const qc = quoteIdent(columnName)

    const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))
    const formatPct = (n: number) => {
      const v = Math.round(n * 1000) / 1000
      return Number.isFinite(v) ? String(v) : '1'
    }

    const sampleLimitBase = Math.max(50, Number(sampleSize) * 20)
    const suggestedSampleLimit =
      typeof rowEstimate === 'number' && rowEstimate > 0
        ? Math.max(sampleLimitBase, Math.min(Math.round(rowEstimate * 0.005), 10000))
        : sampleLimitBase
    const sampleLimit = Math.min(Math.max(50, suggestedSampleLimit), 10000)
    const isSmall = typeof rowEstimate === 'number' && rowEstimate > 0 && rowEstimate <= Number(fullScanMaxRows)

    if (isSmall) {
      const statsQuery = `
        SELECT
          COUNT(*) as total_count,
          COUNT(DISTINCT ${qc}) as distinct_count,
          SUM(CASE WHEN ${qc} IS NULL THEN 1 ELSE 0 END) as null_count,
          MIN(${qc}) as min_value,
          MAX(${qc}) as max_value
        FROM ${qt}
      `
      const statsRaw = await dbClient.raw(statsQuery)
      const statsRow = extractFirstRow(statsRaw)

      const sampleQuery = `SELECT DISTINCT ${qc} as v FROM ${qt} WHERE ${qc} IS NOT NULL LIMIT ?`
      const sampleRaw = await dbClient.raw(sampleQuery, [sampleSize])
      const sampleRows = extractRows(sampleRaw)

      const totalCount = asNumber(statsRow?.total_count)
      const distinctCount = asNumber(statsRow?.distinct_count)
      const nullCount = asNumber(statsRow?.null_count)
      const sampleValues = sampleRows.map((r: any) => r?.v).filter((v: any) => v !== null && v !== undefined)
      const nonNullTotal = Math.max(0, totalCount - nullCount)
      const sampleDistinctRatio = nonNullTotal > 0 ? clamp(distinctCount / nonNullTotal, 0, 1) : 0
      const uniqueSamples = uniqueValues(sampleValues, Number(sampleSize))
      const shouldPersist = sampleDistinctRatio >= parsedPersistThreshold

      return {
        profile: {
          sampleValues: uniqueSamples,
          sampleDistinctRatio,
          strategy: 'full',
        },
        persist: shouldPersist ? { sampleValues: uniqueSamples } : null
      }
    }

    const seedBase = Math.floor(Math.random() * 2147483647)
    const desiredSampleRows = sampleLimit
    const getSampleClausePg = (pct: number, seed: number) =>
      connection.type === 'pg' ? `TABLESAMPLE SYSTEM (${formatPct(pct)}) REPEATABLE (${seed})` : ''

    let pgPct = 1
    if (connection.type === 'pg') {
      if (typeof rowEstimate === 'number' && rowEstimate > 0) {
        pgPct = clamp((desiredSampleRows / rowEstimate) * 100 * 3, 0.01, 10)
      } else {
        pgPct = 1
      }
    }

    const runSampleStats = async (pct: number) => {
      const sampleStatsQuery = `
        SELECT
          SUM(CASE WHEN v IS NULL THEN 1 ELSE 0 END) as null_count,
          COUNT(*) as sample_count,
          MIN(v) as min_value,
          MAX(v) as max_value
        FROM (
          SELECT ${qc} as v
          FROM ${qt}
          ${getSampleClausePg(pct, seedBase)}
          LIMIT ?
        ) s
      `
      try {
        const raw = await dbClient.raw(sampleStatsQuery, [desiredSampleRows])
        return extractFirstRow(raw)
      } catch {
        const fallbackQuery = `
          SELECT
            SUM(CASE WHEN v IS NULL THEN 1 ELSE 0 END) as null_count,
            COUNT(*) as sample_count,
            MIN(v) as min_value,
            MAX(v) as max_value
          FROM (
            SELECT ${qc} as v
            FROM ${qt}
            LIMIT ?
          ) s
        `
        const raw = await dbClient.raw(fallbackQuery, [desiredSampleRows])
        return extractFirstRow(raw)
      }
    }

    let sampleStatsRow = await runSampleStats(pgPct)
    let sampleNullCount = asNumber(sampleStatsRow?.null_count)
    let sampleCount = Math.max(0, asNumber(sampleStatsRow?.sample_count))
    if (connection.type === 'pg' && sampleCount < Math.min(desiredSampleRows, 200) && pgPct < 10) {
      pgPct = clamp(pgPct * 4, 0.01, 25)
      sampleStatsRow = await runSampleStats(pgPct)
      sampleNullCount = asNumber(sampleStatsRow?.null_count)
      sampleCount = Math.max(0, asNumber(sampleStatsRow?.sample_count))
    }

    const nonNullSampleCount = Math.max(0, sampleCount - sampleNullCount)

    const sampleValuesQuery = `
      SELECT DISTINCT ${qc} as v
      FROM ${qt}
      ${getSampleClausePg(pgPct, seedBase + 1)}
      WHERE ${qc} IS NOT NULL
      LIMIT ?
    `
    let sampleRaw: any
    try {
      sampleRaw = await dbClient.raw(sampleValuesQuery, [Math.max(desiredSampleRows, Number(sampleSize))])
    } catch {
      const fallbackQuery = `
        SELECT DISTINCT ${qc} as v
        FROM ${qt}
        WHERE ${qc} IS NOT NULL
        LIMIT ?
      `
      sampleRaw = await dbClient.raw(fallbackQuery, [Math.max(desiredSampleRows, Number(sampleSize))])
    }
    const sampleRows = extractRows(sampleRaw)
    const sampleValues = uniqueValues(sampleRows.map((r: any) => r?.v), Number(sampleSize))

    const sampleDistinctRatio =
      nonNullSampleCount > 0 ? clamp(sampleValues.length / nonNullSampleCount, 0, 1) : 0
    const shouldPersist = sampleDistinctRatio >= parsedPersistThreshold

    let bloomFilterBase64: string | undefined
    if (shouldPersist && sampleRows.length > 0) {
      const bf = new BloomFilter(100000, 5)
      for (const r of sampleRows) {
        if (r?.v !== null && r?.v !== undefined) {
          bf.add(String(r.v))
        }
      }
      bloomFilterBase64 = bf.export()
    }

    return {
      profile: {
        sampleValues,
        sampleDistinctRatio,
        strategy: 'sample',
        bloomFilter: bloomFilterBase64
      },
      persist: shouldPersist ? { sampleValues, bloomFilter: bloomFilterBase64 } : null
    }
  }

  const estimateCache = new Map<string, number | null>()

  try {
    const chunkSize = 6
    for (let i = 0; i < missing.length; i += chunkSize) {
      const chunk = missing.slice(i, i + chunkSize)
      const results = await Promise.all(chunk.map(async ({ tableName, columnName }) => {
        if (!estimateCache.has(tableName)) {
          estimateCache.set(tableName, await getRowEstimate(tableName))
        }
        const rowEstimate = estimateCache.get(tableName) ?? null
        const { profile, persist } = await computeProfile(tableName, columnName, rowEstimate)

        if (persist) {
          await prisma.columnProfile.upsert({
            where: {
              connectionId_tableName_columnName: {
                connectionId: connection.id,
                tableName,
                columnName,
              }
            },
            create: {
              connectionId: connection.id,
              tableName,
              columnName,
              sampleValues: persist.sampleValues,
              bloomFilter: persist.bloomFilter,
              lastUpdated: new Date(),
            },
            update: {
              sampleValues: persist.sampleValues,
              bloomFilter: persist.bloomFilter,
              lastUpdated: new Date(),
            }
          })
        } else {
          await prisma.columnProfile.deleteMany({
            where: {
              connectionId: connection.id,
              tableName,
              columnName,
            }
          })
        }

        return { tableName, columnName, profile }
      }))

      for (const r of results) {
        const tableProfiles = profiles[r.tableName] ?? (profiles[r.tableName] = {})
        tableProfiles[r.columnName] = r.profile
      }
    }

    return { success: true, profiles }
  } catch (error) {
    console.error('Profile discovery error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error during profile discovery',
    })
  } finally {
    await dbClient.destroy()
  }
})
