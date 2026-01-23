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

  const client = knex({
    client: type,
    connection: {
      host,
      port: parseInt(port) || 5432,
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
          cols.table_name, 
          cols.column_name, 
          cols.data_type,
          cols.is_nullable,
          EXISTS (
            SELECT 1 FROM information_schema.table_constraints tc 
            JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name 
            WHERE tc.constraint_type = 'PRIMARY KEY' 
              AND tc.table_name = cols.table_name 
              AND kcu.column_name = cols.column_name
          ) as is_primary_key,
          EXISTS (
            SELECT 1 FROM information_schema.table_constraints tc 
            JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name 
            WHERE tc.constraint_type = 'FOREIGN KEY' 
              AND tc.table_name = cols.table_name 
              AND kcu.column_name = cols.column_name
          ) as is_foreign_key
        FROM information_schema.columns cols
        WHERE cols.table_schema = 'public'
        ORDER BY cols.table_name, cols.ordinal_position;
      `)
      rows = result.rows
    } else if (type === 'mysql' || type === 'mysql2') {
      const result = await client.raw(`
        SELECT TABLE_NAME as table_name, COLUMN_NAME as column_name, DATA_TYPE as data_type
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_SCHEMA = ?
        ORDER BY TABLE_NAME, ORDINAL_POSITION;
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
    
    for (const row of rows) {
        const tableName = row.table_name
        if (!tables[tableName]) {
            tables[tableName] = []
        }
        tables[tableName].push({
            name: row.column_name,
            type: row.data_type,
            nullable: row.is_nullable === 'YES',
            isPrimaryKey: row.is_primary_key,
            isForeignKey: row.is_foreign_key
        })
    }

    return { success: true, data: tables }

  } catch (error) {
    console.error('Database connection error:', error)
    throw createError({
        statusCode: 500,
        statusMessage: `Connection failed: ${error.message}`,
    })
  } finally {
    await client.destroy()
  }
})
