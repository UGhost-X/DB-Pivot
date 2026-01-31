import prisma from '../../utils/prisma'

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

    const savedViews = await prisma.savedView.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })
    return { success: true, data: savedViews }
  } catch (error) {
    return { success: false, error: String(error) }
  }
})
