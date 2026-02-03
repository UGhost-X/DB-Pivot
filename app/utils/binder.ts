// ----------------------
// 1. 定义基础数据结构
// ----------------------

export interface ColumnProfile {
  distinctCount: number     // 去重后的数量
  totalCount: number        // 总行数
  min?: string | number     // 最小值（用于快速排除范围不匹配）
  max?: string | number     // 最大值
  sampleValues: any[]       // 采样数据（例如前100个或随机100个hash）
}

export interface Column {
  name: string
  type: string
  isPrimaryKey: boolean // 如果没有元数据，可以通过 distinctCount/totalCount ≈ 1 推断
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
  breakdown: {            // 分项得分，便于调试
    nameScore: number
    dataScore: number
    typeScore: number
  }
  reason: string
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
    const candidates: RelationshipCandidate[] = []

    for (const sourceTable of this.tables) {
      for (const targetTable of this.tables) {
        if (sourceTable.name === targetTable.name) continue

        // 预处理：将表名标准化（去除复数、转小写）
        const targetTableTokens = this.tokenize(targetTable.name) 
        // 例如 users -> [user]

        for (const sourceCol of sourceTable.columns) {
          // 优化：跳过低基数的源字段（例如 status, gender 不太可能是外键）
          // if ((sourceCol.profile?.distinctCount || 0) < 5) continue;

          for (const targetCol of targetTable.columns) {
            
            // 1. 硬过滤：类型兼容性
            if (!this.isTypeCompatible(sourceCol.type, targetCol.type)) continue

            // 2. 数据层过滤（如果有画像数据）：目标列必须具有高唯一性
            // 外键通常指向主键，主键必须唯一。如果 targetCol 重复率高，直接忽略。
            if (targetCol.profile && !this.isPotentiallyUnique(targetCol.profile)) {
               continue; 
            }

            // 3. 计算综合得分
            const scores = this.calculateComplexScore(
              sourceTable.name, sourceCol, 
              targetTable.name, targetCol, 
              targetTableTokens
            )

            if (scores.total >= threshold) {
              candidates.push({
                sourceTable: sourceTable.name,
                sourceColumn: sourceCol.name,
                targetTable: targetTable.name,
                targetColumn: targetCol.name,
                totalScore: scores.total,
                breakdown: {
                  nameScore: scores.name,
                  dataScore: scores.data,
                  typeScore: scores.type
                },
                reason: this.generateReason(scores)
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
    
    // A. 名称评分 (权重 40%)
    const nameScore = this.evaluateNameSimilarity(sCol.name, tCol.name, tTableTokens);
    
    // B. 数据评分 (权重 60%) - 如果没有数据画像，这部分会回落
    const dataScore = this.evaluateDataContent(sCol, tCol);
    
    // C. 类型评分 (作为系数)
    // 已经通过硬过滤，这里给微小的加分
    const typeScore = 1.0; 

    // 加权总分
    // 如果有数据画像，数据权重极大；如果没有，名称权重极大
    let total = 0;
    if (sCol.profile && tCol.profile) {
      total = (nameScore * 0.3) + (dataScore * 0.7);
    } else {
      total = nameScore;
    }

    return { total: Math.round(total * 100), name: nameScore, data: dataScore, type: typeScore };
  }

  // --- 维度 1: 智能名称匹配 ---
  
  private evaluateNameSimilarity(sColName: string, tColName: string, tTableTokens: string[]): number {
    const sTokens = this.tokenize(sColName); // user_id -> [user, id]
    const tTokens = this.tokenize(tColName); // id -> [id]

    // 模式 1: 标准外键模式 (user_id -> users.id)
    // 检查：源字段名包含了目标表名的词根 (user)，且源字段名包含 'id'，且目标字段是 'id'
    const containsTableRoot = tTableTokens.some(token => sTokens.includes(token));
    const sHasId = sTokens.includes('id') || sTokens.includes('code') || sTokens.includes('no');
    const tIsId = tTokens.includes('id') || tTokens.includes('code') || tTokens.includes('no');

    if (containsTableRoot && sHasId && tIsId) {
      return 1.0; // 完美匹配
    }

    // 模式 2: 直接同名 (parent_id -> parent_id)
    if (sColName === tColName && !['id', 'name', 'status'].includes(sColName)) {
      return 0.9;
    }

    // 模式 3: 语义关联 (creator_id -> users.id)
    // 这通常很难，除非有词典。这里可以用简单的后缀匹配。
    if (sHasId && tIsId && tTableTokens.length > 0) {
        // 如果源字段叫 creator_id，目标表叫 Users，虽然不匹配，但可能是。
        // 此处通常需要更低的基准分，靠数据评分来拉高。
        return 0.4; 
    }

    // 模式 4: 编辑距离兜底
    return this.calculateStringSimilarity(sColName, tColName) * 0.5; // 权重降低，防止误判
  }

  // --- 维度 2: 数据内容匹配 (Inclusion Dependency) ---

  private evaluateDataContent(sCol: Column, tCol: Column): number {
    if (!sCol.profile || !tCol.profile) return 0.5; // 无数据时给中性分

    // 1. 范围重叠检查 (Range Overlap)
    // 如果源数据的范围完全在目标数据范围之外，肯定不是
    if (sCol.profile.min !== undefined && tCol.profile.min !== undefined) {
      if (sCol.profile.min < tCol.profile.min || sCol.profile.max! > tCol.profile.max!) {
        // 允许少量溢出（脏数据），但如果严重溢出则扣分
        // 这里简化处理：
        // return 0.1; 
      }
    }

    // 2. 采样重叠率 (Jaccard / Inclusion)
    // 这是最核心的：源字段的采样值，有多少能在目标字段的采样值里找到？
    // 注意：如果是大数据，这里应该是 BloomFilter 检测或 SQL 查询的结果。
    // 这里假设 sampleValues 是从数据库随机取出的 Top N。
    const sSamples = new Set(sCol.profile.sampleValues.map(String));
    const tSamples = new Set(tCol.profile.sampleValues.map(String));

    if (sSamples.size === 0) return 0;

    let matchCount = 0;
    for (const val of sSamples) {
      if (tSamples.has(val)) matchCount++;
    }
    
    const inclusionRatio = matchCount / sSamples.size;

    // 如果包含率很高 (例如 > 0.9)，这极大概率是外键
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

  private isPotentiallyUnique(profile: ColumnProfile): boolean {
    // 允许少量重复或空值，但唯一率应很高
    if (profile.totalCount === 0) return false;
    const uniqueness = profile.distinctCount / profile.totalCount;
    return uniqueness > 0.8; // 阈值可调，主键通常是 1.0
  }

  private isTypeCompatible(typeA: string, typeB: string): boolean {
     // (保留你之前的逻辑，或者根据数据库方言调整)
     // 增加：数字类型和数字字符串的宽容匹配
     return true; // 简化展示
  }

  private calculateStringSimilarity(s1: string, s2: string): number {
    // (保留你之前的编辑距离逻辑)
    return 0; // 简化展示
  }

  private generateReason(scores: { total: number, name: number, data: number }): string {
    const reasons: string[] = [];
    if (scores.name > 0.8) reasons.push("命名规范高度匹配");
    if (scores.data > 0.9) reasons.push("数据值完全包含(IND)");
    else if (scores.data > 0.7) reasons.push("数据值高度重叠");
    
    return `综合得分 ${scores.total}: ${reasons.join(' + ')}`;
  }
}
