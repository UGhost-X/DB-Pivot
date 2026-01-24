import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const versionId = query.id ? parseInt(String(query.id)) : undefined
  
  if (!versionId) {
    throw createError({ statusCode: 400, statusMessage: 'Version ID required' })
  }
  
  const user = requireUser(event)
  
  const version = await prisma.canvasVersion.findUnique({
    where: { id: versionId },
    include: { canvas: true }
  })
  
  if (!version) {
      throw createError({ statusCode: 404, statusMessage: 'Version not found' })
  }
  
  if (version.canvas.ownerId !== user.id) {
       throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }
  
  return { success: true, data: version }
})
