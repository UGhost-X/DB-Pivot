import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const body = await readBody(event)
  const { name, type, host, port, user: dbUser, password, database, projectId } = body

  if (!type || !host || !dbUser || !database) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required connection details',
    })
  }

  const defaultPort = type === 'pg' ? 5432 : type === 'mysql' || type === 'mysql2' ? 3306 : 5432
  const parsedPort = typeof port === 'number' ? port : Number.parseInt(String(port ?? ''), 10)

  try {
    const connection = await prisma.connection.create({
      data: {
        name: name || `${database}@${host}`,
        type,
        host,
        port: Number.isFinite(parsedPort) ? parsedPort : defaultPort,
        user: dbUser,
        password,
        database,
        ownerId: user.id,
        projectId: projectId ? parseInt(projectId) : undefined
      },
    })
    return { success: true, data: connection }
  } catch (error) {
    return { success: false, error: String(error) }
  }
})
