import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const query = getQuery(event)
  const connectionId = query.connectionId ? parseInt(String(query.connectionId)) : undefined

  try {
    const where: any = { ownerId: user.id }
    
    if (connectionId) {
      where.connectionId = connectionId
    }

    const rules = await prisma.patternRule.findMany({
      where,
      orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }],
      include: {
        tableRelationships: true,
        connection: true
      }
    })
    
    return { success: true, data: rules }
  } catch (error) {
    return { success: false, error: String(error) }
  }
})