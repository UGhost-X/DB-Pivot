import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const id = Number(event.context.params?.id)

  if (!id) {
    return { success: false, error: 'Invalid ID' }
  }

  try {
    // Check ownership
    const existing = await prisma.savedView.findFirst({
      where: { id, ownerId: user.id }
    })

    if (!existing) {
      return { success: false, error: 'View not found or access denied' }
    }

    await prisma.savedView.delete({
      where: { id }
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: String(error) }
  }
})
