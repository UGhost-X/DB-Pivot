import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  try {
    const projects = await prisma.project.findMany({
      where: {
        ownerId: user.id
      },
      orderBy: { updatedAt: 'desc' },
      include: {
        _count: {
          select: {
            connections: true,
            canvases: true
          }
        }
      }
    })
    return { success: true, data: projects }
  } catch (error) {
    return { success: false, error: String(error) }
  }
})
