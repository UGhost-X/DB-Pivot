import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const body = await readBody(event)
  
  const {
    name,
    description,
    startTable,
    startCondition,
    maxDepth = 5,
    includeFields,
    excludeFields,
    connectionId,
    useCache = true,
    cacheDuration = 300
  } = body
  
  if (!name || !startTable || !connectionId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name, startTable, and connectionId are required'
    })
  }
  
  try {
    const query = await prisma.deepQuery.create({
      data: {
        name,
        description,
        startTable,
        startCondition,
        maxDepth,
        includeFields,
        excludeFields,
        connectionId: parseInt(connectionId),
        useCache,
        cacheDuration,
        ownerId: user.id
      }
    })
    
    return { success: true, data: query }
  } catch (error: any) {
    console.error('Deep query creation error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to create deep query: ${error.message}`
    })
  }
})