import knex from 'knex'
import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { id, config } = body
  
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
  
  const client = knex({
    client: type,
    connection: {
      host,
      port: parseInt(port) || 5432,
      user: dbUser,
      password,
      database,
    },
    acquireConnectionTimeout: 5000,
  })
  
  try {
     await client.raw('SELECT 1')
     return { success: true }
  } catch (error: any) {
     return { success: false, error: error.message }
  } finally {
     await client.destroy()
  }
})
