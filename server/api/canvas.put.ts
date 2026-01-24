import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const body = await readBody(event)
  const { id, projectId, data } = body

  if (!data) {
    throw createError({ statusCode: 400, statusMessage: 'Data required' })
  }

  let canvasId = id

  if (!canvasId && projectId) {
      // Find canvas by project
      const canvas = await prisma.canvas.findFirst({
          where: { projectId: parseInt(projectId) }
      })
      if (canvas) canvasId = canvas.id
  }

  if (!canvasId) {
      // Fallback to create if not found? 
      // Or throw error? For auto-save, we expect it to exist if we are editing.
      // But maybe first save?
      // Let's create if not exists
       const canvas = await prisma.canvas.create({
          data: {
            name: 'Untitled',
            data,
            ownerId: user.id,
            projectId: projectId ? parseInt(projectId) : undefined
          }
       })
       return { success: true, data: canvas }
  }

  // Verify ownership
  const existing = await prisma.canvas.findUnique({ where: { id: canvasId } })
  if (!existing || existing.ownerId !== user.id) {
       throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  const updated = await prisma.canvas.update({
      where: { id: canvasId },
      data: { data, updatedAt: new Date() }
  })

  return { success: true, data: updated }
})
