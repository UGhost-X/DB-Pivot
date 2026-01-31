import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const id = Number(event.context.params?.id)

  if (!id) {
    return { success: false, error: 'Invalid ID' }
  }

  try {
    const savedView = await prisma.savedView.findFirst({
      where: { id, ownerId: user.id }
    })

    if (!savedView) {
      return { success: false, error: 'View not found' }
    }

    return { success: true, data: savedView }
  } catch (error) {
    return { success: false, error: String(error) }
  }
})
