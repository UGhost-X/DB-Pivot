import { BloomFilter } from './bloomFilter'

// ----------------------
// 1. 定义基础数据结构
// ----------------------

export interface ColumnProfile {
  sampleValues: any[]
  sampleDistinctRatio?: number
  bloomFilter?: string
}

export interface Column {
  name: string
  type: string
  isPrimaryKey: boolean
  profile?: ColumnProfile // 新增：数据画像
}

export interface Table {
  name: string
  columns: Column[]
}

export interface RelationshipCandidate {
  sourceTable: string
  sourceColumn: string
  targetTable: string
  targetColumn: string
  totalScore: number      // 0-100
  confidence: number      // 0-1.0
  breakdown: {            // 分项得分，便于调试
    nameScore: number
    dataScore: number
    typeScore: number
  }
  reason: string
  sourceProfileSummary?: string
  targetProfileSummary?: string
}

// ----------------------
// 2. 改进后的发现算法
// ----------------------

export class BinderDiscovery {
  private tables: Table[]

  constructor(tables: Table[]) {
    this.tables = tables
  }

  public discover(threshold: number = 60): RelationshipCandidate[] {
    const thresholdPercent = threshold <= 1 ? threshold * 100 : threshold
    const candidates: RelationshipCandidate[] = []

    for (const sourceTable of this.tables) {
      for (const targetTable of this.tables) {
        if (sourceTable.name === targetTable.name) continue

        // 预处理：将表名标准化（去除复数、转小写）
        const targetTableTokens = this.tokenizeTableName(targetTable.name)
        // 例如 users -> [user]

        for (const sourceCol of sourceTable.columns) {
          // 优化：跳过低基数的源字段（例如 status, gender 不太可能是外键）
          // 但有些外键可能基数也很低（如只有几个分类），所以这里仅做轻微过滤或者不做硬性过滤
          // if ((sourceCol.profile?.distinctCount || 0) < 2) continue;

          for (const targetCol of targetTable.columns) {
            
            // 1. 硬过滤：类型兼容性
            if (!this.isTypeCompatible(sourceCol.type, targetCol.type)) continue

            // 2. 计算综合得分
            const scores = this.calculateComplexScore(
              sourceTable.name, sourceCol, 
              targetTable.name, targetCol, 
              targetTableTokens
            )

            if (scores.total >= thresholdPercent) {
              const formatProfile = (p?: ColumnProfile) => {
                if (!p) return '无画像'
                const ratioText = typeof p.sampleDistinctRatio === 'number' ? `, 去重比: ${Math.round(p.sampleDistinctRatio * 100)}%` : ''
                return `样本数: ${p.sampleValues.length}${ratioText}`
              }

              candidates.push({
                sourceTable: sourceTable.name,
                sourceColumn: sourceCol.name,
                targetTable: targetTable.name,
                targetColumn: targetCol.name,
                totalScore: scores.total,
                confidence: scores.total / 100.0,
                breakdown: {
                  nameScore: scores.name,
                  dataScore: scores.data,
                  typeScore: scores.type
                },
                reason: this.generateReason(scores),
                sourceProfileSummary: formatProfile(sourceCol.profile),
                targetProfileSummary: formatProfile(targetCol.profile)
              })
            }
          }
        }
      }
    }

    return candidates.sort((a, b) => b.totalScore - a.totalScore)
  }

  // --- 核心逻辑：多维评分系统 ---

  private calculateComplexScore(
    sTableName: string, sCol: Column,
    tTableName: string, tCol: Column,
    tTableTokens: string[]
  ): { total: number, name: number, data: number, type: number } {
    
    // A. 名称评分（只看 “字段名 ↔ 目标表名/主键特征”，不做 “字段名 ↔ 字段名” 相似度）
    const nameScore = this.evaluateNameSimilarity(sCol.name, tCol, tTableTokens, tTableName);
    
    // B. 数据评分（值包含 / 重叠）- 没有数据画像时不参与打分
    const rawDataScore = this.evaluateDataContent(sCol, tCol);
    
    // C. 类型评分 (作为系数)
    // 已经通过硬过滤，这里给微小的加分
    const typeScore = 1.0; 

    // 加权总分：以值关联为主，表名↔字段为辅
    let total = 0;
    let dataScore = rawDataScore;
    if (sCol.profile && tCol.profile) {
      const sourceIsGenericId = this.isGenericIdentifierName(sCol.name);
      const targetIsGenericId = this.isGenericIdentifierName(tCol.name);
      if (sourceIsGenericId && targetIsGenericId) {
        dataScore = 0;
      }

      const hasTableHint = this.columnHasTargetTableHint(sCol.name, tTableTokens);
      if (!hasTableHint && nameScore < 0.6) {
        dataScore = dataScore * 0.15;
      }

      if (nameScore < 0.3) {
        dataScore = dataScore * 0.1;
      }

      total = (nameScore * 0.4) + (dataScore * 0.6);
      
      if (dataScore > 0.95 && nameScore > 0.6) {
        total = Math.min(1.0, total + 0.05);
      }
    } else {
      total = nameScore * 0.4;
    }

    return { total: Math.round(total * 100), name: nameScore, data: dataScore, type: typeScore };
  }

  // --- 维度 1: 智能名称匹配 ---
  
  private evaluateNameSimilarity(sColName: string, tCol: Column, tTableTokens: string[], tTableName: string): number {
    const sName = sColName.toLowerCase();
    const tName = tCol.name.toLowerCase();
    if (sName === tName) return 0;
    
    const tKeySuffix = this.extractKeySuffix(tName) ?? (tCol.isPrimaryKey ? 'id' : null)
    if (!tKeySuffix) return 0;
    if (this.isGenericIdentifierName(sColName)) return 0;

    // 1. 严格表名匹配 (users -> user_id, user_orders -> user_order_id)
    const normalizedTokens = tTableTokens.length > 0 ? tTableTokens : this.tokenizeTableName(tTableName)
    const tTableNameSimple = normalizedTokens.length > 0 ? normalizedTokens.join('_') : tTableName.toLowerCase().replace(/s$/, '');
    const exactMatch = `${tTableNameSimple}_${tKeySuffix}`;
    const exactMatchNoUnderscore = `${tTableNameSimple}${tKeySuffix}`;

    if (sName === exactMatch || sName === exactMatchNoUnderscore) return 1.0;

    // 2. 表名作为前缀匹配 (users -> user_uuid, user_key)
    if (sName.startsWith(tTableNameSimple + '_') && sName.endsWith(tKeySuffix)) {
      return 0.95;
    }

    // 3. 词根匹配（仅当词根较长时才匹配，避免 'order' 匹配所有含 order 的字段）
    // 例如 targetTable: "customer_orders", sCol: "order_id" -> 不应该匹配
    // targetTable: "orders", sCol: "order_id" -> 应该匹配
    
    const sTokens = this.tokenize(sColName);
    
    // 检查源字段是否包含目标表的所有关键 token（顺序一致）
    // e.g. target: "product_categories" -> [product, category]
    // source: "product_category_id" -> [product, category, id] -> Match
    // source: "category_id" -> [category, id] -> Partial match (weak)

    let matchCount = 0;
    let tokenIndex = 0;
    
    for (const token of tTableTokens) {
      const idx = sTokens.indexOf(token, tokenIndex);
      if (idx !== -1) {
        matchCount++;
        tokenIndex = idx + 1;
      }
    }

    const isFullTokenMatch = matchCount === tTableTokens.length;
    const sHasKey = this.extractKeySuffix(sName) !== null

    if (isFullTokenMatch && sHasKey) {
      return 0.9;
    }
    
    // 4. 弱匹配：目标表名很短（单词），且源字段包含该词
    // e.g. target: "users", source: "creator_id" (no match), "user_creator_id" (match)
    // 防止长表名拆分后的误判，这里只允许单词表名的包含匹配
    if (tTableTokens.length === 1 && tTableTokens[0] && sTokens.includes(tTableTokens[0]!) && sHasKey) {
       // 这是一个中等信号，需要数据支撑
       return 0.6;
    }

    return 0.0;
  }

  // --- 维度 2: 数据内容匹配 (Inclusion Dependency) ---

  private evaluateDataContent(sCol: Column, tCol: Column): number {
    if (!sCol.profile || !tCol.profile) return 0.0;
    if (this.isGenericIdentifierName(sCol.name) && this.isGenericIdentifierName(tCol.name)) return 0.0;

    if (tCol.profile.bloomFilter && sCol.profile.sampleValues.length > 0) {
      try {
        const bf = new BloomFilter(100000, 5, tCol.profile.bloomFilter);
        let matchCount = 0;
        let validSamples = 0;

        for (const val of sCol.profile.sampleValues) {
          if (val === null || val === undefined || val === '') continue;
          validSamples++;
          if (bf.test(String(val))) {
            matchCount++;
          }
        }

        if (validSamples === 0) return 0;
        
        const inclusionRatio = matchCount / validSamples;

        const sName = sCol.name.toLowerCase();
        const sLooksLikeKey = sName.endsWith('id') || sName.endsWith('code') || sName.endsWith('no') || sName.endsWith('uuid') || sName.endsWith('key');
        if (!sLooksLikeKey && validSamples < 10) return inclusionRatio * 0.4;
        if (validSamples < 3) return inclusionRatio * 0.5;

        return inclusionRatio;
      } catch {
      }
    }

    const sSamples = new Set(sCol.profile.sampleValues.map(String));
    const tSamples = new Set(tCol.profile.sampleValues.map(String));

    if (sSamples.size === 0) return 0;
    if (tSamples.size < 5) return 0;

    let matchCount = 0;
    for (const val of sSamples) {
      // 忽略空值
      if (val === '' || val === 'null' || val === 'undefined') continue;
      
      if (tSamples.has(val)) {
        matchCount++;
      }
    }
    
    // 排除空值后的样本总数
    const effectiveTotal = Array.from(sSamples).filter(v => v !== '' && v !== 'null' && v !== 'undefined').length;
    if (effectiveTotal === 0) return 0;

    const inclusionRatio = matchCount / effectiveTotal;

    const sName = sCol.name.toLowerCase();
    const sLooksLikeKey = sName.endsWith('id') || sName.endsWith('code') || sName.endsWith('no') || sName.endsWith('uuid') || sName.endsWith('key');
    if (!sLooksLikeKey && effectiveTotal < 10) return inclusionRatio * 0.4;

    // 惩罚项：如果源列的样本数很少（例如只有1-2个值），即使全匹配，置信度也低
    // 除非源列是 boolean 或者 status
    if (effectiveTotal < 3) return inclusionRatio * 0.5;

    return inclusionRatio;
  }

  // --- 辅助工具 ---

  private tokenize(str: string): string[] {
    return str.toLowerCase()
      .replace(/_/g, ' ') // snake_case
      .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase
      .split(/[^a-z0-9]/)
      .filter(s => s.length > 0)
      .map(s => s.replace(/s$/, '')); // 简单的去复数处理 users->user
  }

  private tokenizeTableName(tableName: string): string[] {
    const tokens = this.tokenize(tableName)
    const stop = new Set(['sys', 'tbl', 'table', 't', 'dim', 'ref', 'biz', 'app', 'base', 'core'])
    const filtered = tokens.filter((t) => t && !stop.has(t))
    return filtered.length > 0 ? filtered : tokens
  }

  private extractKeySuffix(name: string): 'id' | 'code' | 'no' | 'uuid' | 'key' | null {
    const n = String(name).toLowerCase()
    if (/(?:^|_)id$/.test(n)) return 'id'
    if (/(?:^|_)code$/.test(n)) return 'code'
    if (/(?:^|_)no$/.test(n)) return 'no'
    if (/(?:^|_)uuid$/.test(n)) return 'uuid'
    if (/(?:^|_)key$/.test(n)) return 'key'
    return null
  }

  private isGenericIdentifierName(name: string): boolean {
    const n = String(name).toLowerCase()
    return n === 'id' || n === 'uuid' || n === 'code' || n === 'no' || n === 'key'
  }

  private columnHasTargetTableHint(columnName: string, targetTableTokens: string[]): boolean {
    const tokens = this.tokenize(columnName)
    const tokenSet = new Set(tokens.filter((t) => t && t !== 'id' && t !== 'uuid' && t !== 'code' && t !== 'no' && t !== 'key'))
    for (const t of targetTableTokens) {
      if (t && tokenSet.has(t)) return true
    }
    return false
  }

  private isTypeCompatible(typeA: string, typeB: string): boolean {
     const tA = typeA.toLowerCase();
     const tB = typeB.toLowerCase();
     
     // 归一化类型
     const getCategory = (t: string) => {
       if (t.includes('int') || t.includes('number') || t.includes('float') || t.includes('double') || t.includes('decimal') || t.includes('serial')) return 'number';
       if (t.includes('char') || t.includes('text') || t.includes('string') || t.includes('clob')) return 'string';
       if (t.includes('date') || t.includes('time')) return 'time';
       if (t.includes('bool')) return 'boolean';
       if (t.includes('uuid')) return 'uuid';
       return 'other';
     };

     const catA = getCategory(tA);
     const catB = getCategory(tB);

     // 相同大类兼容
     if (catA === catB && catA !== 'other') return true;

     // 特殊兼容：数字和字符串（有时候外键存成字符串）
     if ((catA === 'number' && catB === 'string') || (catA === 'string' && catB === 'number')) {
       // 这是一个弱兼容，可以在评分时降权，但硬过滤时不排除
       return true;
     }

     // 特殊兼容：UUID 和 字符串
     if ((catA === 'uuid' && catB === 'string') || (catA === 'string' && catB === 'uuid')) {
        return true;
     }

     return false;
  }

  private generateReason(scores: { total: number, name: number, data: number }): string {
    const reasons: string[] = [];
    if (scores.name > 0.8) reasons.push("名称高度匹配");
    else if (scores.name > 0.5) reasons.push("名称相似");
    
    if (scores.data > 0.9) reasons.push("数据值包含(IND>90%)");
    else if (scores.data > 0.7) reasons.push("数据值高度重叠");
    else if (scores.data < 0.1) reasons.push("数据重叠极低(风险)");
    
    return `综合得分 ${scores.total}: ${reasons.join(' + ')}`;
  }
}
