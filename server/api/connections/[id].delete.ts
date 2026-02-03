import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const id = Number(event.context.params?.id)

  if (!id) {
    return { success: false, error: 'Invalid ID' }
  }

  try {
    const existing = await prisma.connection.findFirst({
      where: { id, ownerId: user.id },
    })

    if (!existing) {
      return { success: false, error: 'Connection not found or access denied' }
    }

    await prisma.$transaction([
      prisma.canvas.updateMany({
        where: { connectionId: id },
        data: { connectionId: null },
      }),
      prisma.connection.delete({
        where: { id },
      }),
    ])

    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
})

