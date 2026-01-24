import type { Node, Edge } from '@vue-flow/core'

export const generateSQL = (nodes: Node[], edges: Edge[], dbType: 'pg' | 'mysql2' = 'pg'): string => {
  let sql = ''
  
  // Helper to escape identifiers
  const quote = (str: string) => {
    return dbType === 'pg' ? `"${str}"` : `\`${str}\``
  }

  // Generate CREATE TABLE statements
  nodes.filter(n => n.type === 'table').forEach(node => {
    const tableName = node.data.label
    const columns = node.data.columns || []
    
    sql += `CREATE TABLE ${quote(tableName)} (\n`
    
    const colDefs = columns.map((col: any) => {
      let def = `  ${quote(col.name)} ${col.type}`
      if (!col.nullable) {
        def += ' NOT NULL'
      }
      return def
    })

    // Primary Keys
    const pks = columns.filter((c: any) => c.isPrimaryKey).map((c: any) => c.name)
    if (pks.length > 0) {
      colDefs.push(`  PRIMARY KEY (${pks.map(quote).join(', ')})`)
    }

    sql += colDefs.join(',\n')
    sql += `\n);\n\n`
  })

  // Generate Foreign Keys
  if (edges.length > 0) {
    sql += '-- Foreign Keys\n'
    edges.forEach(edge => {
      const sourceNode = nodes.find(n => n.id === edge.source)
      const targetNode = nodes.find(n => n.id === edge.target)
      
      const sourceTable = sourceNode?.data.label
      const targetTable = targetNode?.data.label
      
      // Parse column names from handles
      // handle id format: "columnName-source" or "columnName-target"
      const sourceCol = edge.sourceHandle?.replace(/-source$/, '')
      const targetCol = edge.targetHandle?.replace(/-target$/, '')

      if (sourceTable && targetTable && sourceCol && targetCol) {
        // Assumption: User drags FROM the Foreign Key column TO the Primary Key column.
        // So Source Table contains the Foreign Key.
        sql += `ALTER TABLE ${quote(sourceTable)} ADD FOREIGN KEY (${quote(sourceCol)}) REFERENCES ${quote(targetTable)} (${quote(targetCol)});\n`
      }
    })
  }

  return sql
}
