import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const body = await readBody(event)
  const { name, data, connectionId } = body

  if (!data) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Data is required',
    })
  }

  try {
    const canvas = await prisma.canvas.create({
      data: {
        name: name || 'Untitled Project',
        data,
        connectionId: connectionId ? parseInt(connectionId) : undefined,
        ownerId: user.id
      },
    })
    return { success: true, data: canvas }
  } catch (error) {
    return { success: false, error: String(error) }
  }
})
