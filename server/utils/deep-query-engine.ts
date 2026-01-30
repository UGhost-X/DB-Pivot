import knex from 'knex'
import { LRUCache } from 'lru-cache'
import type { Prisma } from '@prisma/client'
import prisma from './prisma'

// Use the Prisma enums directly since they might not be available as named exports
const TableRelationshipType = {
  ONE_TO_ONE: 'ONE_TO_ONE',
  ONE_TO_MANY: 'ONE_TO_MANY',
  MANY_TO_ONE: 'MANY_TO_ONE',
  MANY_TO_MANY: 'MANY_TO_MANY'
} as const

type TableRelationshipTypeValue = (typeof TableRelationshipType)[keyof typeof TableRelationshipType]

/**
 * Interface for query execution context
 */
interface QueryContext {
  connection: any
  relationships: any[]
  visitedTables: Set<string>
  currentDepth: number
  maxDepth: number
  includeFields?: string[]
  excludeFields?: string[]
}

/**
 * Interface for query result node
 */
export interface QueryResultNode {
  table: string
  data: any[]
  relationships: QueryResultRelationship[]
}

/**
 * Interface for query result relationship
 */
export interface QueryResultRelationship {
  type: TableRelationshipTypeValue
  targetTable: string
  targetData: any[]
}

/**
 * Cache for query results
 */
const queryCache = new LRUCache<string, any>({
  max: 100,
  ttl: 300000 // 5 minutes
})

/**
 * Main function to execute a deep query
 */
export async function executeDeepQuery(
  queryId: number,
  userId: number,
  forceRefresh = false
): Promise<QueryResultNode> {
  // Get query configuration
  const query = await prisma.deepQuery.findFirst({
    where: { id: queryId, ownerId: userId },
    include: { connection: true }
  })
  
  if (!query) {
    throw new Error('Query not found')
  }
  
  // Check cache if enabled
  const cacheKey = `deepquery:${queryId}:${userId}`
  if (query.useCache && !forceRefresh) {
    const cachedResult = queryCache.get(cacheKey)
    if (cachedResult) {
      return cachedResult
    }
  }
  
  // Get relationships for this connection
  const relationships = await prisma.tableRelationship.findMany({
    where: { 
      connectionId: query.connectionId, 
      ownerId: userId,
      isActive: true 
    }
  })
  
  // Create database client
  const dbClient = knex({
    client: query.connection.type,
    connection: {
      host: query.connection.host,
      port: query.connection.port,
      user: query.connection.user,
      password: query.connection.password,
      database: query.connection.database
    }
  })
  
  try {
    const startTime = Date.now()

    // Execute the recursive query
    const context: QueryContext = {
      connection: query.connection,
      relationships,
      visitedTables: new Set(),
      currentDepth: 0,
      maxDepth: query.maxDepth,
      includeFields: query.includeFields as string[],
      excludeFields: query.excludeFields as string[]
    }
    
    const result = await queryTableRecursive(
      dbClient,
      query.startTable,
      query.startCondition || {},
      context
    )
    
    // Update query metadata
    await prisma.deepQuery.update({
      where: { id: queryId },
      data: {
        lastResult: result as unknown as Prisma.InputJsonValue,
        lastExecutedAt: new Date(),
        executionTime: Date.now() - startTime
      }
    })
    
    // Cache the result if enabled
    if (query.useCache) {
      const ttlMs = (query.cacheDuration ?? 300) * 1000
      queryCache.set(cacheKey, result, { ttl: ttlMs })
    }
    
    return result
    
  } finally {
    await dbClient.destroy()
  }
}

/**
 * Recursively query a table and its relationships
 */
async function queryTableRecursive(
  dbClient: any,
  tableName: string,
  conditions: any,
  context: QueryContext
): Promise<QueryResultNode> {
  // Check if we've exceeded max depth or visited this table
  if (context.currentDepth >= context.maxDepth || context.visitedTables.has(tableName)) {
    return {
      table: tableName,
      data: [],
      relationships: []
    }
  }
  
  context.visitedTables.add(tableName)
  context.currentDepth++
  
  try {
    // Build base query
    let query = dbClient(tableName).select(buildFieldSelection(tableName, context))
    
    // Apply conditions
    if (conditions && Object.keys(conditions).length > 0) {
      query = query.where(conditions)
    }
    
    // Execute query
    const data = await query
    
    // Find relationships for this table
    const tableRelationships = context.relationships.filter(
      rel => rel.sourceTable === tableName || rel.targetTable === tableName
    )
    
    // Process relationships recursively
    const relationships: QueryResultRelationship[] = []
    
    for (const rel of tableRelationships) {
      try {
        const isSource = rel.sourceTable === tableName
        const targetTable = isSource ? rel.targetTable : rel.sourceTable
        
        // Build join conditions based on relationship type
        let joinConditions: any[] = []
        
        if (isSource) {
          // Source -> Target relationship
          for (const row of data) {
            const targetConditions = { [rel.targetColumn]: row[rel.sourceColumn] }
            const targetData = await queryTableRecursive(
              dbClient,
              targetTable,
              targetConditions,
              { ...context }
            )
            
            if (targetData.data.length > 0) {
              relationships.push({
                type: rel.relationshipType,
                targetTable,
                targetData: targetData.data
              })
            }
          }
        } else {
          // Target -> Source relationship (reverse)
          for (const row of data) {
            const sourceConditions = { [rel.sourceColumn]: row[rel.targetColumn] }
            const sourceData = await queryTableRecursive(
              dbClient,
              rel.sourceTable,
              sourceConditions,
              { ...context }
            )
            
            if (sourceData.data.length > 0) {
              relationships.push({
                type: getReverseRelationshipType(rel.relationshipType),
                targetTable: rel.sourceTable,
                targetData: sourceData.data
              })
            }
          }
        }
        
      } catch (error) {
        console.warn(`Failed to process relationship ${rel.sourceTable}->${rel.targetTable}:`, error)
        // Continue with other relationships
      }
    }
    
    return {
      table: tableName,
      data,
      relationships
    }
    
  } finally {
    context.visitedTables.delete(tableName)
    context.currentDepth--
  }
}

/**
 * Build field selection with include/exclude filters
 */
function buildFieldSelection(tableName: string, context: QueryContext): string[] {
  // Default to all fields
  let fields = ['*']
  
  // Apply include/exclude filters if specified
  if (context.includeFields && context.includeFields.length > 0) {
    fields = context.includeFields
      .filter(field => field.startsWith(`${tableName}.`))
      .map(field => field.substring(tableName.length + 1))
  }
  
  if (context.excludeFields && context.excludeFields.length > 0) {
    fields = fields.filter(field => 
      !context.excludeFields!.includes(`${tableName}.${field}`)
    )
  }
  
  return fields
}

/**
 * Get reverse relationship type
 */
function getReverseRelationshipType(type: TableRelationshipTypeValue): TableRelationshipTypeValue {
  switch (type) {
    case TableRelationshipType.ONE_TO_MANY:
      return TableRelationshipType.MANY_TO_ONE
    case TableRelationshipType.MANY_TO_ONE:
      return TableRelationshipType.ONE_TO_MANY
    case TableRelationshipType.ONE_TO_ONE:
    case TableRelationshipType.MANY_TO_MANY:
    default:
      return type
  }
}

/**
 * Generate SQL for recursive query (alternative approach for databases that support recursive CTEs)
 */
export async function generateRecursiveSQL(
  queryId: number,
  userId: number
): Promise<string> {
  const query = await prisma.deepQuery.findFirst({
    where: { id: queryId, ownerId: userId },
    include: { connection: { include: { tableRelationships: true } } }
  })
  
  if (!query) {
    throw new Error('Query not found')
  }
  
  const relationships = query.connection.tableRelationships.filter(rel => rel.isActive)
  
  // This is a simplified version for demonstration
  // Actual implementation would vary by database type
  if (query.connection.type === 'pg') {
    return generatePostgreSQLRecursiveQuery(query, relationships)
  } else {
    return generateGenericRecursiveQuery(query, relationships)
  }
}

/**
 * Generate PostgreSQL recursive query using CTEs
 */
function generatePostgreSQLRecursiveQuery(query: any, relationships: any[]): string {
  const baseTable = query.startTable
  const conditions = query.startCondition || {}
  
  let sql = `WITH RECURSIVE deep_query AS (\n`
  sql += `  -- Base case: start table\n`
  sql += `  SELECT 
    '${baseTable}' as source_table,
    NULL::text as relationship_type,
    ${buildPostgreSQLFields(baseTable, query)}\n`
  sql += `  FROM ${baseTable}\n`
  
  if (Object.keys(conditions).length > 0) {
    sql += `  WHERE ${Object.entries(conditions)
      .map(([key, value]) => `${key} = ${typeof value === 'string' ? `'${value}'` : value}`)
      .join(' AND ')}\n`
  }
  
  sql += `  \n  UNION ALL\n\n`
  
  // Add recursive joins for each relationship
  for (const rel of relationships) {
    sql += `  -- Join via ${rel.sourceTable}.${rel.sourceColumn} -> ${rel.targetTable}.${rel.targetColumn}\n`
    sql += `  SELECT 
    '${rel.targetTable}' as source_table,
    '${rel.relationshipType}' as relationship_type,
    ${buildPostgreSQLFields(rel.targetTable, query)}\n`
    sql += `  FROM deep_query dq\n`
    sql += `  JOIN ${rel.targetTable} ON ${rel.targetTable}.${rel.targetColumn} = dq.${rel.sourceColumn}\n`
    sql += `  WHERE dq.source_table = '${rel.sourceTable}'\n\n`
  }
  
  sql += `)\n`
  sql += `SELECT * FROM deep_query;`
  
  return sql
}

/**
 * Build PostgreSQL field selection
 */
function buildPostgreSQLFields(tableName: string, query: any): string {
  const fields = ['*'] // Simplified for demonstration
  return fields.map(field => `${tableName}.${field}`).join(', ')
}

/**
 * Generate generic recursive query (multiple queries approach)
 */
function generateGenericRecursiveQuery(query: any, relationships: any[]): string {
  // This would generate multiple individual queries for databases without recursive CTE support
  return `-- Deep query for ${query.startTable}\n` +
         `-- Note: This database doesn't support recursive CTEs, use application-level recursion\n` +
         `SELECT * FROM ${query.startTable} WHERE ...;`
}
