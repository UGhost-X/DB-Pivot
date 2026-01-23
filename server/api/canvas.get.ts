import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  try {
    const canvas = await prisma.canvas.findFirst({
      where: {
        ownerId: user.id
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })
    return { success: true, data: canvas }
  } catch (error) {
    return { success: false, error: String(error) }
  }
})
