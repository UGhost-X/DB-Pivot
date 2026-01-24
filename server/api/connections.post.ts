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

  try {
    const connection = await prisma.connection.create({
      data: {
        name: name || `${database}@${host}`,
        type,
        host,
        port: parseInt(port) || 5432,
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
