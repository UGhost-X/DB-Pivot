import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const body = await readBody(event)
  const { name, config, result, projectId } = body

  if (!name || !config || !result) {
    return { success: false, error: 'Missing required fields' }
  }

  try {
    const savedView = await prisma.savedView.create({
      data: {
        name,
        config,
        result,
        projectId: projectId ? Number(projectId) : null,
        ownerId: user.id
      }
    })
    return { success: true, data: savedView }
  } catch (error) {
    return { success: false, error: String(error) }
  }
})
