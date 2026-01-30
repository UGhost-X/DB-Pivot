import prisma from './prisma'

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

type DetectionMethod = typeof DetectionMethod[keyof typeof DetectionMethod]
type TableRelationshipType = typeof TableRelationshipType[keyof typeof TableRelationshipType]

/**
 * Interface for table column metadata
 */
export interface TableColumn {
  name: string
  type: string
  nullable: boolean
  isPrimaryKey: boolean
  isForeignKey: boolean
}

/**
 * Interface for table metadata
 */
export interface TableMetadata {
  name: string
  columns: TableColumn[]
}

/**
 * Interface for detected relationship
 */
export interface DetectedRelationship {
  sourceTable: string
  sourceColumn: string
  targetTable: string
  targetColumn: string
  relationshipType: TableRelationshipType
  detectionMethod: DetectionMethod
  confidence: number
  constraintName?: string
}

/**
 * Pattern matching rule interface
 */
export interface PatternRule {
  sourcePattern: string | RegExp
  targetPattern: string | RegExp
  relationshipType: TableRelationshipType
  priority: number
}

/**
 * Default pattern matching rules for common naming conventions
 */
export const DEFAULT_PATTERN_RULES: PatternRule[] = [
  // One-to-many: user_id -> users.id
  {
    sourcePattern: /^(.*)_id$/,
    targetPattern: /^.*s$/, // Plural table names
    relationshipType: TableRelationshipType.ONE_TO_MANY,
    priority: 10
  },
  
  // Many-to-one: users.id -> user_id
  {
    sourcePattern: /^.*s$/, // Plural table names
    targetPattern: /^(.*)_id$/,
    relationshipType: TableRelationshipType.MANY_TO_ONE,
    priority: 10
  },
  
  // One-to-one: user_profile.user_id -> users.id
  {
    sourcePattern: /^(.*)_profile$/, 
    targetPattern: /^.*s$/, // Plural table names
    relationshipType: TableRelationshipType.ONE_TO_ONE,
    priority: 8
  },
  
  // Many-to-many: user_roles.user_id -> users.id AND user_roles.role_id -> roles.id
  {
    sourcePattern: /^(.*)_(.*)$/, // Junction table pattern
    targetPattern: /^.*s$/, // Plural table names
    relationshipType: TableRelationshipType.MANY_TO_MANY,
    priority: 7
  },
  
  // ID to ID mapping: customer_id -> customers.customer_id
  {
    sourcePattern: /^(.*)_id$/,
    targetPattern: /^.*\..*_id$/, // Same column name in target table
    relationshipType: TableRelationshipType.ONE_TO_MANY,
    priority: 9
  }
]

/**
 * Detect relationships based on foreign key constraints
 */
export function detectForeignKeyRelationships(
  tables: Record<string, TableColumn[]>,
  foreignKeyConstraints: any[] = []
): DetectedRelationship[] {
  const relationships: DetectedRelationship[] = []
  
  for (const constraint of foreignKeyConstraints) {
    const {
      constraint_name,
      table_name,
      column_name,
      foreign_table_name,
      foreign_column_name
    } = constraint
    
    if (tables[table_name] && tables[foreign_table_name]) {
      relationships.push({
        sourceTable: table_name,
        sourceColumn: column_name,
        targetTable: foreign_table_name,
        targetColumn: foreign_column_name,
        relationshipType: TableRelationshipType.MANY_TO_ONE,
        detectionMethod: DetectionMethod.FOREIGN_KEY,
        confidence: 1.0,
        constraintName: constraint_name
      })
    }
  }
  
  return relationships
}

/**
 * Detect relationships based on naming conventions and patterns
 */
export function detectPatternRelationships(
  tables: Record<string, TableColumn[]>
): DetectedRelationship[] {
  const relationships: DetectedRelationship[] = []
  const tableNames = Object.keys(tables)
  
  for (const sourceTableName of tableNames) {
    const sourceColumns = tables[sourceTableName] || []
    
    for (const sourceColumn of sourceColumns) {
      // Skip if column is already a primary key
      if (sourceColumn.isPrimaryKey) continue
      
      for (const rule of DEFAULT_PATTERN_RULES) {
        const sourceMatch = matchPattern(sourceColumn.name, rule.sourcePattern)
        if (!sourceMatch) continue
        
        for (const targetTableName of tableNames) {
          if (sourceTableName === targetTableName) continue
          
          const targetColumns = tables[targetTableName] || []
          const targetPrimaryKey = targetColumns.find(col => col.isPrimaryKey)
          
          if (!targetPrimaryKey) continue
          
          const targetMatch = matchPattern(
            `${targetTableName}.${targetPrimaryKey.name}`,
            rule.targetPattern
          )
          
          if (targetMatch) {
            relationships.push({
              sourceTable: sourceTableName,
              sourceColumn: sourceColumn.name,
              targetTable: targetTableName,
              targetColumn: targetPrimaryKey.name,
              relationshipType: rule.relationshipType,
              detectionMethod: DetectionMethod.PATTERN_MATCHING,
              confidence: calculateConfidence(rule.priority, sourceMatch, targetMatch)
            })
          }
        }
      }
    }
  }
  
  return relationships
}

/**
 * Match a string against a pattern (string or regex)
 */
function matchPattern(value: string, pattern: string | RegExp): any {
  if (typeof pattern === 'string') {
    return value === pattern ? {} : null
  }
  
  const match = value.match(pattern)
  return match ? match.groups || {} : null
}

/**
 * Calculate confidence score based on rule priority and match quality
 */
function calculateConfidence(
  priority: number,
  sourceMatch: any,
  targetMatch: any
): number {
  let confidence = priority / 10 // Base confidence from rule priority
  
  // Increase confidence if both patterns matched well
  if (Object.keys(sourceMatch).length > 0) confidence += 0.1
  if (Object.keys(targetMatch).length > 0) confidence += 0.1
  
  return Math.min(confidence, 1.0)
}

/**
 * Merge and deduplicate relationships
 */
export function mergeRelationships(
  relationships: DetectedRelationship[]
): DetectedRelationship[] {
  const uniqueRelationships = new Map<string, DetectedRelationship>()
  
  for (const rel of relationships) {
    const key = `${rel.sourceTable}.${rel.sourceColumn}-${rel.targetTable}.${rel.targetColumn}`
    
    const existing = uniqueRelationships.get(key)
    if (!existing || rel.confidence > existing.confidence) {
      uniqueRelationships.set(key, rel)
    }
  }
  
  return Array.from(uniqueRelationships.values())
}

/**
 * Main function to detect all types of relationships
 */
export async function detectAllRelationships(
  tables: Record<string, TableColumn[]>,
  foreignKeyConstraints: any[] = []
): Promise<DetectedRelationship[]> {
  const fkRelationships = detectForeignKeyRelationships(tables, foreignKeyConstraints)
  const patternRelationships = detectPatternRelationships(tables)
  
  const allRelationships = [...fkRelationships, ...patternRelationships]
  return mergeRelationships(allRelationships)
}

/**
 * Validate if a relationship makes sense based on data types
 */
export function validateRelationship(
  relationship: DetectedRelationship,
  tables: Record<string, TableColumn[]>
): boolean {
  const sourceColumn = tables[relationship.sourceTable]?.find(
    col => col.name === relationship.sourceColumn
  )
  
  const targetColumn = tables[relationship.targetTable]?.find(
    col => col.name === relationship.targetColumn
  )
  
  if (!sourceColumn || !targetColumn) return false
  
  // Basic type compatibility check
  const sourceType = sourceColumn.type.toLowerCase()
  const targetType = targetColumn.type.toLowerCase()
  
  // Allow some common type mappings
  const compatibleTypes = [
    ['integer', 'int', 'bigint', 'serial'],
    ['varchar', 'text', 'char'],
    ['timestamp', 'datetime', 'date']
  ]
  
  for (const typeGroup of compatibleTypes) {
    if (typeGroup.includes(sourceType) && typeGroup.includes(targetType)) {
      return true
    }
  }
  
  // Allow exact matches
  return sourceType === targetType
}
