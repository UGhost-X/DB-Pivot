import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const query = getQuery(event)
  const projectId = query.projectId ? parseInt(String(query.projectId)) : undefined

  try {
    const where: any = {
      ownerId: user.id
    }

    if (projectId) {
      where.projectId = projectId
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
