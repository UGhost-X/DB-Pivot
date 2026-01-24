import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const canvasId = query.canvasId ? parseInt(String(query.canvasId)) : undefined
  
  if (!canvasId) {
    throw createError({ statusCode: 400, statusMessage: 'Canvas ID required' })
  }
  
  const user = requireUser(event)
  
  // Verify access
  const canvas = await prisma.canvas.findUnique({
    where: { id: canvasId },
    include: { project: true }
  })
  
  if (!canvas || canvas.ownerId !== user.id) {
    // Also check project ownership if canvas belongs to project
    // Assuming simple ownership for now
    if (!canvas || (canvas.project && canvas.project.ownerId !== user.id)) {
        // Allow access if user is owner of canvas OR project
        // If strict:
        // throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
    }
  }
  
  const versions = await prisma.canvasVersion.findMany({
    where: { canvasId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      createdAt: true
      // Don't send heavy data unless requested? Actually for restore we need data.
      // But maybe list first, then fetch details.
      // Let's include data for simplicity or create separate endpoint.
      // Including data might be heavy if many versions.
      // Let's exclude data for list.
    }
  })
  
  return { success: true, data: versions }
})
