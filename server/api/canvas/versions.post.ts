import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { canvasId, name, data } = body
  
  if (!canvasId || !data) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
  }
  
  const user = requireUser(event)
  
  // Verify ownership
  const canvas = await prisma.canvas.findUnique({
    where: { id: parseInt(canvasId) }
  })
  
  if (!canvas || canvas.ownerId !== user.id) {
     throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }
  
  // Create Version
  const version = await prisma.canvasVersion.create({
    data: {
      canvasId: parseInt(canvasId),
      name: name || `Version ${new Date().toLocaleString()}`,
      data
    }
  })
  
  // Also update the main canvas data (Requirement: save usually updates current state too)
  // Requirement 1: "Auto update canvas version on save". 
  // Requirement 2: "Auto save ... but not generate version".
  // So "Save" button = Update Canvas + Create Version.
  await prisma.canvas.update({
    where: { id: parseInt(canvasId) },
    data: { data }
  })
  
  return { success: true, data: version }
})
