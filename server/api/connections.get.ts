import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  try {
    const connections = await prisma.connection.findMany({
      where: {
        ownerId: user.id
      },
      orderBy: { updatedAt: 'desc' }
    })
    return { success: true, data: connections }
  } catch (error) {
    return { success: false, error: String(error) }
  }
})
