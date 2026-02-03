import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const query = getQuery(event)
  const projectId = query.projectId ? parseInt(String(query.projectId)) : undefined
  const connectionId = query.connectionId ? parseInt(String(query.connectionId)) : undefined

  try {
    const where: any = {
      ownerId: user.id
    }

    if (connectionId) {
      where.connectionId = connectionId
    } else if (projectId) {
      where.projectId = projectId
      // If we are strictly binding to connection, maybe we shouldn't return project-level canvas if we are looking for connection canvas?
      // But the query param decides what we are looking for.
    }

    const canvas = await prisma.canvas.findFirst({
      where,
      orderBy: {
        updatedAt: 'desc'
      }
    })
    return { success: true, data: canvas }
  } catch (error) {
    return { success: false, error: String(error) }
  }
})
