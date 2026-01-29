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

    const relationships = await prisma.tableRelationship.findMany({
      where,
      orderBy: [{ confidence: 'desc' }, { createdAt: 'desc' }],
      include: {
        connection: true,
        patternRule: true
      }
    })
    
    return { success: true, data: relationships }
  } catch (error) {
    return { success: false, error: String(error) }
  }
})