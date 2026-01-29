import prisma from '../utils/prisma'
import { detectAllRelationships } from '../utils/relationship-detection'

// Use the Prisma enums directly since they might not be available as named exports
const DetectionMethod = {
  FOREIGN_KEY: 'FOREIGN_KEY',
  NAMING_CONVENTION: 'NAMING_CONVENTION',
  PATTERN_MATCHING: 'PATTERN_MATCHING',
  MANUAL: 'MANUAL',
  INFERRED: 'INFERRED'
} as const

const TableRelationshipType = {
  ONE_TO_ONE: 'ONE_TO_ONE',
  ONE_TO_MANY: 'ONE_TO_MANY',
  MANY_TO_ONE: 'MANY_TO_ONE',
  MANY_TO_MANY: 'MANY_TO_MANY'
} as const

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const body = await readBody(event)
  
  const { connectionId, detect = true, save = false } = body
  
  if (!connectionId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Connection ID is required'
    })
  }
  
  try {
    // Get the connection
    const connection = await prisma.connection.findFirst({
      where: { id: connectionId, ownerId: user.id }
    })
    
    if (!connection) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Connection not found'
      })
    }
    
    // Get table metadata from the connection
    const metadataResponse = await $fetch('/api/metadata', {
      method: 'POST',
      body: {
        type: connection.type,
        host: connection.host,
        port: connection.port,
        user: connection.user,
        password: connection.password,
        database: connection.database
      }
    })
    
    if (!metadataResponse.success) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch metadata'
      })
    }
    
    const tables = metadataResponse.data
    
    // Detect relationships
    let detectedRelationships: any[] = []
    
    if (detect) {
      detectedRelationships = await detectAllRelationships(tables)
    }
    
    // Get existing relationships
    const existingRelationships = await prisma.tableRelationship.findMany({
      where: { connectionId, ownerId: user.id }
    })
    
    // Save detected relationships if requested
    if (save && detect) {
      for (const rel of detectedRelationships) {
        await prisma.tableRelationship.upsert({
          where: {
            connectionId_sourceTable_sourceColumn_targetTable_targetColumn: {
              connectionId,
              sourceTable: rel.sourceTable,
              sourceColumn: rel.sourceColumn,
              targetTable: rel.targetTable,
              targetColumn: rel.targetColumn
            }
          },
          update: {
            relationshipType: rel.relationshipType,
            detectionMethod: rel.detectionMethod,
            confidence: rel.confidence,
            constraintName: rel.constraintName,
            isActive: true,
            updatedAt: new Date()
          },
          create: {
            sourceTable: rel.sourceTable,
            sourceColumn: rel.sourceColumn,
            targetTable: rel.targetTable,
            targetColumn: rel.targetColumn,
            relationshipType: rel.relationshipType,
            detectionMethod: rel.detectionMethod,
            confidence: rel.confidence,
            constraintName: rel.constraintName,
            connectionId,
            ownerId: user.id,
            isActive: true,
            isCustom: false
          }
        })
      }
    }
    
    return {
      success: true,
      data: {
        detected: detectedRelationships,
        existing: existingRelationships,
        tables: Object.keys(tables)
      }
    }
    
  } catch (error: any) {
    console.error('Relationship detection error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to detect relationships: ${error.message}`
    })
  }
})