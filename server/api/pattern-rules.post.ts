import prisma from '../utils/prisma'

// Use the Prisma enums directly since they might not be available as named exports
const TableRelationshipType = {
  ONE_TO_ONE: 'ONE_TO_ONE',
  ONE_TO_MANY: 'ONE_TO_MANY',
  MANY_TO_ONE: 'MANY_TO_ONE',
  MANY_TO_MANY: 'MANY_TO_MANY'
} as const

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const body = await readBody(event)
  
  const {
    name,
    description,
    sourcePattern,
    targetPattern,
    relationshipType,
    priority = 0,
    isEnabled = true,
    minConfidence = 0.7,
    connectionId
  } = body
  
  if (!name || !sourcePattern || !targetPattern || !relationshipType) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name, sourcePattern, targetPattern, and relationshipType are required'
    })
  }
  
  try {
    const rule = await prisma.patternRule.create({
      data: {
        name,
        description,
        sourcePattern,
        targetPattern,
        relationshipType,
        priority,
        isEnabled,
        minConfidence,
        connectionId: connectionId ? parseInt(connectionId) : null,
        ownerId: user.id
      }
    })
    
    return { success: true, data: rule }
  } catch (error: any) {
    console.error('Pattern rule creation error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to create pattern rule: ${error.message}`
    })
  }
})