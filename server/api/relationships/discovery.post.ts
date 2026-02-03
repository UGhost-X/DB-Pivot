import prisma from '../../utils/prisma'
import knex from 'knex'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { connectionId, candidates, sampleSize = 100 } = body

  if (!connectionId || !candidates || !Array.isArray(candidates)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required parameters',
    })
  }

  // 1. Get connection details
  const connection = await prisma.connection.findUnique({
    where: { id: connectionId }
  })

  if (!connection) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Connection not found',
    })
  }

  // 2. Setup Knex client
  const defaultPort =
    connection.type === 'pg' ? 5432 : connection.type === 'mysql' || connection.type === 'mysql2' ? 3306 : 5432

  const client = knex({
    client: connection.type,
    connection: {
      host: connection.host,
      port: connection.port || defaultPort,
      user: connection.user, 
      password: connection.password,
      database: connection.database,
    },
  })

  const results = []

  try {
    // 3. Check each candidate
    // Limit concurrency to avoid overwhelming the DB
    const chunkSize = 5
    for (let i = 0; i < candidates.length; i += chunkSize) {
      const chunk = candidates.slice(i, i + chunkSize)
      
      const chunkResults = await Promise.all(chunk.map(async (candidate) => {
        const { sourceTable, sourceColumn, targetTable, targetColumn } = candidate
        
        try {
          // Query to check inclusion: Count(Distinct Source) and Count(Source Intersect Target)
          // We limit the source sample size for performance
          
          let query = ''
          let bindings = []

          if (connection.type === 'pg') {
            // PostgreSQL
            // Calculate intersection count based on sampled source data
            query = `
              WITH source_sample AS (
                SELECT DISTINCT "${sourceColumn}" as val 
                FROM "${sourceTable}" 
                WHERE "${sourceColumn}" IS NOT NULL 
                LIMIT ?
              )
              SELECT 
                (SELECT COUNT(*) FROM source_sample) as source_count,
                (SELECT COUNT(*) FROM source_sample s 
                 JOIN "${targetTable}" t ON s.val = t."${targetColumn}"
                ) as intersect_count
            `
            bindings = [sampleSize]
          } else if (connection.type === 'mysql' || connection.type === 'mysql2') {
            // MySQL
            query = `
              SELECT 
                (SELECT COUNT(*) FROM (
                  SELECT DISTINCT \`${sourceColumn}\` as val 
                  FROM \`${sourceTable}\` 
                  WHERE \`${sourceColumn}\` IS NOT NULL 
                  LIMIT ?
                ) as source_sample) as source_count,
                (SELECT COUNT(*) FROM (
                  SELECT DISTINCT \`${sourceColumn}\` as val 
                  FROM \`${sourceTable}\` 
                  WHERE \`${sourceColumn}\` IS NOT NULL 
                  LIMIT ?
                ) as s
                 INNER JOIN \`${targetTable}\` t ON s.val = t.\`${targetColumn}\`
                ) as intersect_count
            `
            bindings = [sampleSize, sampleSize]
          } else {
             // SQLite or others (simplified fallback)
             return { ...candidate, score: 0, error: 'Unsupported DB type' }
          }

          const result = await client.raw(query, bindings)
          let sourceCount = 0
          let intersectCount = 0

          if (connection.type === 'pg') {
             sourceCount = parseInt(result.rows[0].source_count)
             intersectCount = parseInt(result.rows[0].intersect_count)
          } else {
             // MySQL returns [[RowDataPacket]]
             sourceCount = result[0][0].source_count
             intersectCount = result[0][0].intersect_count
          }

          const score = sourceCount > 0 ? intersectCount / sourceCount : 0
          
          return {
            ...candidate,
            indScore: score,
            sampleSize: sourceCount
          }

        } catch (err) {
          console.error(`Error checking ${sourceTable}.${sourceColumn} -> ${targetTable}.${targetColumn}:`, err)
          return { ...candidate, indScore: 0, error: String(err) }
        }
      }))
      
      results.push(...chunkResults)
    }

    return { success: true, results }

  } catch (error) {
    console.error('Discovery error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error during discovery',
    })
  } finally {
    await client.destroy()
  }
})
