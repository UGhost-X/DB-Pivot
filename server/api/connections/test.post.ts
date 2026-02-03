import knex from 'knex'
import prisma from '../../utils/prisma'

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

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { id, config, timeoutMs: timeoutMsRaw } = body
  const timeoutMs = Number(timeoutMsRaw) > 0 ? Number(timeoutMsRaw) : 8000
  
  let dbConfig = config
  
  if (id) {
    // Fetch connection from database
    const user = requireUser(event)
    const existing = await prisma.connection.findUnique({
      where: { id: parseInt(id) }
    })
    
    if (!existing) {
       throw createError({ statusCode: 404, statusMessage: 'Connection not found' })
    }
    
    // Check ownership
    // If we want to allow project members to use connections, we should check project access.
    // For now, let's assume if they can see it (via GET), they can test it.
    // The GET endpoint filters by ownerId currently.
    if (existing.ownerId !== user.id) {
         throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
    }
    
    dbConfig = {
      type: existing.type,
      host: existing.host,
      port: existing.port,
      user: existing.user,
      password: existing.password,
      database: existing.database
    }
  }
  
  if (!dbConfig) {
      throw createError({ statusCode: 400, statusMessage: 'No configuration provided' })
  }
  
  const { type, host, port, user: dbUser, password, database } = dbConfig
  const defaultPort = type === 'pg' ? 5432 : type === 'mysql' || type === 'mysql2' ? 3306 : 5432
  const parsedPort = typeof port === 'number' ? port : Number.parseInt(String(port ?? ''), 10)
  
  const client = knex({
    client: type,
    connection: {
      host,
      port: Number.isFinite(parsedPort) ? parsedPort : defaultPort,
      user: dbUser,
      password,
      database,
      ...(type === 'pg' ? { connectionTimeoutMillis: timeoutMs } : {}),
      ...(type === 'mysql' || type === 'mysql2' ? { connectTimeout: timeoutMs } : {}),
    },
    acquireConnectionTimeout: timeoutMs,
  })
  
  try {
     await withTimeout(client.raw('SELECT 1'), timeoutMs)
     return { success: true }
  } catch (error: any) {
     return { success: false, error: error.message }
  } finally {
     await client.destroy()
  }
})
