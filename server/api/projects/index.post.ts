import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const body = await readBody(event)
  const { name, description } = body

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Project name is required',
    })
  }

  try {
    const project = await prisma.project.create({
      data: {
        name,
        description,
        ownerId: user.id
      },
    })
    return { success: true, data: project }
  } catch (error) {
    return { success: false, error: String(error) }
  }
})
