import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const body = await readBody(event)
  const { id, name, type, host, port, user: dbUser, password, database } = body

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID required' })
  }

  // Check existence and ownership
  const existing = await prisma.connection.findUnique({
    where: { id: parseInt(id) }
  })

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Connection not found' })
  }

  if (existing.ownerId !== user.id) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  const updateData: any = {
    name, type, host, port: parseInt(port), user: dbUser, database
  }
  
  // Only update password if provided
  if (password) {
      updateData.password = password
  }

  try {
    const connection = await prisma.connection.update({
      where: { id: parseInt(id) },
      data: updateData
    })
    return { success: true, data: connection }
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to update connection' })
  }
})
