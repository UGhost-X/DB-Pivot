<template>
  <div class="h-full w-[400px] border-l border-border bg-background flex flex-col transition-all duration-300">
    <div class="flex items-center justify-between p-4 border-b border-border shrink-0">
      <h3 class="text-lg font-semibold text-foreground">模式匹配配置与管理</h3>
      <Button variant="ghost" size="sm" @click="collapsePanel">
        <Minus class="h-4 w-4" />
      </Button>
    </div>
    
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- 主内容区域：规则列表 + 关系列表 -->
      <div class="flex-1 overflow-y-auto p-4 space-y-6">
        
        <!-- 模式规则部分 -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <Label class="text-sm font-medium text-muted-foreground">模式规则 ({{ displayRules.length }})</Label>
          </div>
          
          <!-- 添加新规则按钮 -->
          <Button 
            variant="outline" 
            class="w-full justify-start border-dashed" 
            @click="handleAddRuleClick"
          >
            <Plus class="h-4 w-4 mr-2" />
            添加模式规则
          </Button>

          <div class="space-y-2">
            <div 
              v-for="rule in displayRules" 
              :key="rule.id"
              class="p-3 border border-border rounded-md bg-card hover:bg-accent/50 cursor-pointer transition-colors"
              @click="editRule(rule)"
            >
              <div class="flex justify-between items-start mb-2">
                <div class="font-medium text-sm text-foreground truncate pr-2" :title="rule.name">{{ rule.name }}</div>
                <Badge :variant="rule.isActive ? 'default' : 'secondary'" class="shrink-0 text-[10px] px-1.5 h-5">
                  {{ rule.relationshipType === 'ONE_TO_MANY' ? '1:N' : rule.relationshipType === 'MANY_TO_ONE' ? 'N:1' : '1:1' }}
                </Badge>
              </div>
              <div class="space-y-1">
                <div v-if="rule.tablePattern" class="text-xs flex items-center gap-1.5 text-muted-foreground">
                  <span class="w-10 shrink-0">表名:</span>
                  <code class="bg-muted px-1 rounded text-primary">{{ rule.tablePattern }}</code>
                </div>
                <div class="text-xs flex items-center gap-1.5 text-muted-foreground">
                  <span class="w-10 shrink-0">源列:</span>
                  <code class="bg-muted px-1 rounded">{{ rule.sourcePattern }}</code>
                </div>
                <div class="text-xs flex items-center gap-1.5 text-muted-foreground">
                  <span class="w-10 shrink-0">目标:</span>
                  <code class="bg-muted px-1 rounded">{{ rule.targetPattern }}</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 已检测关系部分 -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <Label class="text-sm font-medium text-muted-foreground">已检测关系 ({{ detectedEdges?.length || 0 }})</Label>
          </div>

          <div class="flex items-center gap-2">
            <div class="relative flex-1">
               <Search class="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
               <Input v-model="searchQuery" placeholder="搜索..." class="h-8 pl-8 text-xs" />
            </div>
            <Select v-model="groupBy">
              <SelectTrigger class="h-8 w-[100px] text-xs">
                <SelectValue placeholder="分组" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">不分组</SelectItem>
                <SelectItem value="rule">按规则</SelectItem>
                <SelectItem value="source">按源表</SelectItem>
                <SelectItem value="target">按目标表</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="border border-border rounded-md overflow-hidden">
             <!-- Table Header -->
            <div class="grid grid-cols-12 gap-2 px-4 py-2 border-b border-border bg-muted/20 text-xs font-medium text-muted-foreground">
              <!-- <div class="col-span-1 flex justify-center"></div> -->
              <div class="col-span-8">关系详情 (源 -> 目标)</div>
              <div class="col-span-3 text-center">操作</div>
            </div>

            <!-- Relationship List -->
            <div class="min-h-[200px] max-h-[50vh] overflow-y-auto bg-card">
              <div v-if="!detectedEdges || detectedEdges.length === 0" class="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <Link class="h-6 w-6 opacity-50 mb-2" />
                <p class="text-xs">暂无检测到的模式关系</p>
              </div>
              
              <div v-else class="divide-y divide-border">
                <div v-for="(edges, groupName) in groupedEdges" :key="groupName">
                  <div 
                    v-if="groupBy !== 'none'" 
                    class="px-4 py-1.5 bg-muted/50 text-xs font-medium text-muted-foreground border-b border-border/50 flex items-center justify-between group/header cursor-pointer select-none transition-colors hover:bg-muted/70"
                    @click="toggleGroupSelection(edges)"
                    @dblclick.stop="toggleGroupCollapse(groupName)"
                  >
                    <div class="flex items-center gap-2 overflow-hidden">
                      <Checkbox 
                        :model-value="isGroupSelected(edges)"
                        :checked="isGroupSelected(edges)"
                        @update:model-value="handleGroupCheckboxChange(edges, $event === true)"
                        @update:checked="handleGroupCheckboxChange(edges, $event === true)"
                        @click.stop
                        class="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      >
                        <Minus v-if="isGroupSelected(edges) === 'indeterminate'" class="h-3.5 w-3.5" />
                        <Check v-else class="h-3.5 w-3.5" />
                      </Checkbox>
                      <span class="truncate cursor-pointer select-none">{{ groupName }} ({{ edges.length }})</span>
                    </div>
                    <div class="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        class="h-5 w-5" 
                        @click.stop="handleGroupToggleVisibility(edges)"
                        :title="getGroupVisibilityTitle(edges)"
                      >
                        <EyeOff v-if="isGroupHidden(getTargetEdgesForGroup(edges))" class="h-3 w-3 text-muted-foreground" />
                        <Eye v-else class="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        class="h-5 w-5" 
                        @click.stop="handleGroupLocate(edges)"
                        :title="getGroupLocateTitle(edges)"
                        :class="{ 'text-primary': isGroupLocated(edges) }"
                      >
                        <LocateFixed class="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        class="h-5 w-5 text-destructive hover:text-destructive hover:bg-destructive/10" 
                        @click.stop="handleGroupDelete(edges)"
                        :title="getGroupDeleteTitle(edges)"
                      >
                        <Trash2 class="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                   
                   <!-- Default Rendering (Non-Rule Grouping) -->
                   <template v-if="groupBy !== 'rule' && !isGroupCollapsed(groupName)">
                     <div 
                      v-for="edge in edges" 
                      :key="edge.id"
                      class="grid grid-cols-12 gap-2 px-4 py-2 text-sm hover:bg-muted/30 transition-colors items-center group border-b last:border-0 border-border/40"
                      :class="{ 'bg-muted/50': selectedEdgeIds.includes(edge.id) }"
                    >
                      <div class="col-span-1 flex items-center justify-center">
                        <Checkbox 
                          :model-value="selectedEdgeIds.includes(edge.id)"
                          :checked="selectedEdgeIds.includes(edge.id)"
                          @update:model-value="handleEdgeCheckboxChange(edge.id, $event === true)"
                          @update:checked="handleEdgeCheckboxChange(edge.id, $event === true)"
                          @click.stop
                        />
                      </div>
                      <div class="col-span-8 flex items-center overflow-hidden">
                        <div class="font-mono text-xs text-foreground/80 truncate w-full" :title="`${edge.sourceNodeLabel}.${edge.sourceHandleLabel} -> ${edge.targetNodeLabel}.${edge.targetHandleLabel}`">
                          <span class="font-semibold text-primary/80">{{ edge.sourceNodeLabel }}</span>.<span class="text-muted-foreground">{{ edge.sourceHandleLabel }}</span>
                          <span class="mx-1 text-muted-foreground/50">-></span>
                          <span class="font-semibold text-primary/80">{{ edge.targetNodeLabel }}</span>.<span class="text-muted-foreground">{{ edge.targetHandleLabel }}</span>
                        </div>
                      </div>
                      <div class="col-span-3 flex items-center justify-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          class="h-6 w-6" 
                          @click.stop="toggleEdgeVisibility(edge.id, !edge.isHidden)" 
                          :title="edge.isHidden ? '显示连线' : '隐藏连线'"
                        >
                          <EyeOff v-if="edge.isHidden" class="h-3 w-3 text-muted-foreground" />
                          <Eye v-else class="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          class="h-6 w-6" 
                          @click.stop="highlightEdge(edge.id)" 
                          :title="locatedEdgeIds.includes(edge.id) ? '取消定位' : '定位关系'"
                          :class="{ 'text-primary': locatedEdgeIds.includes(edge.id) }"
                        >
                          <LocateFixed class="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" class="h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/10" @click.stop="deleteEdge(edge.id)" title="删除">
                          <Trash2 class="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                   </template>

                   <!-- Rule Grouping with Sub-groups -->
                   <template v-else-if="!isGroupCollapsed(groupName)">
                    <div v-for="(subGroup, subKey) in getSubGroups(edges)" :key="subKey" class="border-b last:border-0 border-border/40">
                      <!-- Sub-group Header (Table Pair) -->
                      <div 
                        class="px-4 py-1.5 bg-muted/20 flex items-center justify-between group/header select-none transition-colors hover:bg-muted/30"
                        @dblclick="toggleGroupCollapse(`${groupName}-${subKey}`)"
                      >
                        <div class="flex items-center gap-2 overflow-hidden">
                          <div class="font-mono text-xs truncate flex items-center" :title="subKey">
                            <span class="font-semibold text-primary/80">{{ subGroup.sourceTable }}</span>
                            <span class="mx-1 text-muted-foreground/50">-></span>
                            <span class="font-semibold text-primary/80">{{ subGroup.targetTable }}</span>
                          </div>
                          <span class="text-xs text-muted-foreground">({{ subGroup.edges.length }})</span>
                        </div>
                      </div>

                      <!-- Edges List (Simplified) -->
                      <template v-if="!isGroupCollapsed(`${groupName}-${subKey}`)">
                        <div 
                          v-for="edge in subGroup.edges" 
                          :key="edge.id" 
                          class="grid grid-cols-12 gap-2 px-4 py-2 text-sm hover:bg-muted/30 transition-colors items-center group border-t border-border/40 first:border-0"
                          :class="{ 'bg-muted/50': selectedEdgeIds.includes(edge.id) }"
                        >
                          <div class="col-span-1 flex items-center justify-center">
                            <Checkbox 
                              :model-value="selectedEdgeIds.includes(edge.id)"
                              :checked="selectedEdgeIds.includes(edge.id)"
                              @update:model-value="handleEdgeCheckboxChange(edge.id, $event === true)"
                              @update:checked="handleEdgeCheckboxChange(edge.id, $event === true)"
                              @click.stop
                            />
                          </div>
                          <div class="col-span-8 flex items-center overflow-hidden">
                            <div class="font-mono text-xs text-foreground/80 truncate w-full" :title="`${edge.sourceHandleLabel} -> ${edge.targetHandleLabel}`">
                              <span class="text-muted-foreground">{{ edge.sourceHandleLabel }}</span>
                              <span class="mx-1 text-muted-foreground/50">-></span>
                              <span class="text-muted-foreground">{{ edge.targetHandleLabel }}</span>
                            </div>
                          </div>
                          <div class="col-span-3 flex items-center justify-center gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              class="h-6 w-6" 
                              @click.stop="toggleEdgeVisibility(edge.id, !edge.isHidden)" 
                              :title="edge.isHidden ? '显示连线' : '隐藏连线'"
                            >
                              <EyeOff v-if="edge.isHidden" class="h-3 w-3 text-muted-foreground" />
                              <Eye v-else class="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              class="h-6 w-6" 
                              @click.stop="highlightEdge(edge.id)" 
                              :title="locatedEdgeIds.includes(edge.id) ? '取消定位' : '定位关系'"
                              :class="{ 'text-primary': locatedEdgeIds.includes(edge.id) }"
                            >
                              <LocateFixed class="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" class="h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/10" @click.stop="deleteEdge(edge.id)" title="删除">
                              <Trash2 class="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </template>
                    </div>
                   </template>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- 底部操作区域 -->
      <div class="shrink-0 border-t border-border bg-muted/10">
        <!-- 核心操作按钮 -->
        <div class="p-4 flex gap-2">
          <Button 
            @click="$emit('markColumns')" 
            class="flex-1"
            variant="secondary"
          >
            <Paintbrush class="h-4 w-4 mr-2" />
            标记列
          </Button>
          <Button 
            @click="$emit('cancelHighlight')" 
            class="flex-1"
            variant="outline"
          >
            <EyeOff class="h-4 w-4 mr-2" />
            取消标记
          </Button>
          <Button 
            @click="$emit('confirmConnection')" 
            class="flex-1"
          >
            <Link class="h-4 w-4 mr-2" />
            确认连接
          </Button>
        </div>
      </div>
    </div>

    <!-- 添加/编辑规则对话框 -->
    <Dialog v-model:open="showAddRuleDialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{{ editingRule ? '编辑' : '添加' }}模式规则</DialogTitle>
        </DialogHeader>
        
        <div class="space-y-4">
          <div>
            <Label class="text-sm font-medium">规则名称</Label>
            <Input v-model="newRule.name" placeholder="例如: 用户ID关联" />
          </div>
          
          <div>
            <Label class="text-sm font-medium">表名模式 (可选)</Label>
            <Input v-model="newRule.tablePattern" placeholder="正则表达式，例如: ^auth_.*" />
            <p class="text-[10px] text-muted-foreground mt-1">仅匹配符合此规则的表，留空则匹配所有表</p>
          </div>
          
          <div>
            <Label class="text-sm font-medium">列名模式</Label>
            <Input v-model="newRule.sourcePattern" placeholder="正则表达式，例如: ^(.*)_id$" />
          </div>
          
          <div>
            <Label class="text-sm font-medium">目标表模式</Label>
            <Input v-model="newRule.targetPattern" placeholder="正则表达式，例如: ^.*s$" />
          </div>

          <div>
            <Label class="text-sm font-medium">目标列模式 (可选)</Label>
            <Input v-model="newRule.targetColumnPattern" placeholder="正则表达式，留空则默认为主键" />
            <p class="text-[10px] text-muted-foreground mt-1">支持 ${1} 引用源列捕获组</p>
          </div>
          
          <div>
            <Label class="text-sm font-medium">关系类型</Label>
            <Select v-model="newRule.relationshipType">
              <SelectTrigger>
                <SelectValue placeholder="选择关系类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ONE_TO_MANY">一对多</SelectItem>
                <SelectItem value="MANY_TO_ONE">多对一</SelectItem>
                <SelectItem value="ONE_TO_ONE">一对一</SelectItem>
                <SelectItem value="MANY_TO_MANY">多对多</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label class="text-sm font-medium">优先级</Label>
            <Input type="number" v-model="newRule.priority" min="1" max="100" />
          </div>
          
          <div class="flex items-center space-x-2">
            <Checkbox v-model="newRule.isActive" />
            <Label class="text-sm">启用规则</Label>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" @click="showAddRuleDialog = false">取消</Button>
          <Button @click="saveRule">保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Minus, Plus, Trash2, Eye, Link, FileCode, Paintbrush, EyeOff, Search, LocateFixed, Check } from 'lucide-vue-next'

export interface PatternRule {
  id?: number
  name: string
  tablePattern?: string
  sourcePattern: string
  targetPattern: string
  targetColumnPattern?: string
  relationshipType: string
  priority: number
  isActive: boolean
}

export interface DetectedEdge {
  id: string
  sourceNodeLabel: string
  sourceHandleLabel: string
  targetNodeLabel: string
  targetHandleLabel: string
  ruleName?: string
  isHidden?: boolean
}

export interface DetectionResult {
  totalDetected: number
  byForeignKey: number
  byPattern: number
  highConfidence: number
}

const props = defineProps<{
  rules?: PatternRule[]
  detectionResult?: DetectionResult | null
  detectedEdges?: DetectedEdge[]
}>()

const emit = defineEmits<{
  (e: 'addRule', rule: PatternRule): void
  (e: 'editRule', rule: PatternRule): void
  (e: 'autoDetect'): void
  (e: 'markColumns'): void
  (e: 'cancelHighlight'): void
  (e: 'confirmConnection'): void
  (e: 'collapse'): void
  (e: 'close'): void
  (e: 'deleteEdge', id: string): void
  (e: 'deleteEdges', ids: string[]): void
  (e: 'selectEdge', id: string): void
  (e: 'selectEdges', ids: string[]): void
  (e: 'queryEdge', id: string): void
  (e: 'toggleEdgeVisibility', id: string, isHidden: boolean): void
  (e: 'toggleEdgesVisibility', ids: string[], isHidden: boolean): void
}>()

// Use local state for rules if props are not provided (backward compatibility)
const localRules = ref<PatternRule[]>([
  {
    id: 1,
    name: '用户ID关联',
    sourcePattern: '^(.*)_id$',
    targetPattern: '^.*s$',
    relationshipType: 'ONE_TO_MANY',
    priority: 10,
    isActive: true
  }
])

// Watch for prop changes to update local state if needed, or just use props directly
// Better to just use props if available, or fallback to local
const displayRules = ref<PatternRule[]>(props.rules || localRules.value)

watch(() => props.rules, (newRules) => {
  if (newRules) {
    displayRules.value = newRules
  }
}, { immediate: true })

const showAddRuleDialog = ref(false)
const editingRule = ref<PatternRule | null>(null)
const selectedEdgeIds = ref<string[]>([])
const locatedEdgeIds = ref<string[]>([])
const collapsedGroups = ref<Record<string, boolean>>({})

const newRule = ref<PatternRule>({
  name: '',
  tablePattern: '',
  sourcePattern: '',
  targetPattern: '',
  relationshipType: 'ONE_TO_MANY',
  priority: 10,
  isActive: true
})

const searchQuery = ref('')
const groupBy = ref<'none' | 'source' | 'target' | 'rule'>('rule')

const filteredEdges = computed(() => {
  if (!props.detectedEdges) return []
  let result = props.detectedEdges
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(e => 
      e.sourceNodeLabel.toLowerCase().includes(query) || 
      e.targetNodeLabel.toLowerCase().includes(query) ||
      e.sourceHandleLabel.toLowerCase().includes(query) ||
      e.targetHandleLabel.toLowerCase().includes(query)
    )
  }
  
  return result
})

const groupedEdges = computed(() => {
  const edges = filteredEdges.value
  if (groupBy.value === 'none') {
    return { '全部': edges }
  }
  
  const groups: Record<string, DetectedEdge[]> = {}
  edges.forEach(edge => {
    let key = ''
    switch (groupBy.value) {
      case 'source':
        key = edge.sourceNodeLabel
        break
      case 'target':
        key = edge.targetNodeLabel
        break
      case 'rule':
        key = edge.ruleName?.replace(/\s*\([^)]*->[^)]*\)\s*$/, '') || '未分类'
        break
    }
    
    ;(groups[key] ??= []).push(edge)
  })
  return groups
})

const isGroupCollapsed = (groupKey: string) => {
  return !!collapsedGroups.value[groupKey]
}

const toggleGroupCollapse = (groupKey: string) => {
  collapsedGroups.value[groupKey] = !collapsedGroups.value[groupKey]
}

const isGroupSelected = (edges: DetectedEdge[]): boolean | 'indeterminate' => {
  if (!edges || edges.length === 0) return false
  const selectedCount = edges.filter(e => selectedEdgeIds.value.includes(e.id)).length
  if (selectedCount === 0) return false
  if (selectedCount === edges.length) return true
  return 'indeterminate'
}

const handleGroupCheckboxChange = (edges: DetectedEdge[], checked: boolean) => {
  const ids = edges.map(e => e.id)
  if (checked) {
    const set = new Set(selectedEdgeIds.value)
    ids.forEach(id => set.add(id))
    selectedEdgeIds.value = Array.from(set)
  } else {
    selectedEdgeIds.value = selectedEdgeIds.value.filter(id => !ids.includes(id))
  }
}

const toggleGroupSelection = (edges: DetectedEdge[]) => {
  const status = isGroupSelected(edges)
  // If fully selected (true), we want to deselect (false).
  // If not selected (false) or partial (indeterminate), we want to select all (true).
  const newValue = status !== true
  handleGroupCheckboxChange(edges, newValue)
}

const toggleSelectGroup = (edges: DetectedEdge[], checked: boolean | 'indeterminate') => {
  // Deprecated or unused? Keeping for now or removing if not used elsewhere.
  // It was unused in template.
  const ids = edges.map(e => e.id)
  if (checked === true || checked === 'indeterminate') {
    const newIds = ids.filter(id => !selectedEdgeIds.value.includes(id))
    selectedEdgeIds.value = [...selectedEdgeIds.value, ...newIds]
  } else {
    selectedEdgeIds.value = selectedEdgeIds.value.filter(id => !ids.includes(id))
  }
}

const toggleSelectEdge = (id: string, checked: boolean) => {
  if (checked) {
    if (!selectedEdgeIds.value.includes(id)) {
      selectedEdgeIds.value.push(id)
    }
  } else {
    selectedEdgeIds.value = selectedEdgeIds.value.filter(e => e !== id)
  }
}

const handleEdgeCheckboxChange = (id: string, checked: boolean) => {
  toggleSelectEdge(id, checked)
}

const deleteSelectedEdges = () => {
  emit('deleteEdges', selectedEdgeIds.value)
  selectedEdgeIds.value = []
}

const deleteEdge = (id: string) => {
  emit('deleteEdge', id)
  selectedEdgeIds.value = selectedEdgeIds.value.filter(e => e !== id)
}

const getSelectedEdgesInGroup = (edges: DetectedEdge[]) => {
  return edges.filter(e => selectedEdgeIds.value.includes(e.id))
}

const getTargetEdgesForGroup = (edges: DetectedEdge[]) => {
  const selected = getSelectedEdgesInGroup(edges)
  return selected.length > 0 ? selected : edges
}

const handleGroupToggleVisibility = (edges: DetectedEdge[]) => {
  const target = getTargetEdgesForGroup(edges)
  const nextHidden = !isGroupHidden(target)
  emit('toggleEdgesVisibility', target.map(e => e.id), nextHidden)
}

const handleGroupDelete = (edges: DetectedEdge[]) => {
  const target = getTargetEdgesForGroup(edges)
  deleteGroupEdges(target)
}

const handleGroupLocate = (edges: DetectedEdge[]) => {
  const target = getTargetEdgesForGroup(edges)
  if (target.length === 0) return
  const ids = target.map(e => e.id)
  const allLocated = ids.every(id => locatedEdgeIds.value.includes(id))

  if (allLocated) {
    // 取消定位当前分组（或选中行）
    locatedEdgeIds.value = locatedEdgeIds.value.filter(id => !ids.includes(id))
  } else {
    // 合并定位目标
    const set = new Set(locatedEdgeIds.value)
    ids.forEach(id => set.add(id))
    locatedEdgeIds.value = Array.from(set)
  }

  // 将当前所有定位中的边同步给画布
  emit('selectEdges', locatedEdgeIds.value)
}

const getGroupVisibilityTitle = (edges: DetectedEdge[]) => {
  const target = getTargetEdgesForGroup(edges)
  return isGroupHidden(target) ? '显示' : '隐藏'
}

const getGroupDeleteTitle = (edges: DetectedEdge[]) => {
  return getSelectedEdgesInGroup(edges).length > 0 ? '删除选中' : '删除全部'
}

const isGroupLocated = (edges: DetectedEdge[]) => {
  const target = getTargetEdgesForGroup(edges)
  if (target.length === 0) return false
  return target.every(e => locatedEdgeIds.value.includes(e.id))
}

const getGroupLocateTitle = (edges: DetectedEdge[]) => {
  return isGroupLocated(edges) ? '取消定位' : '批量定位'
}

const toggleEdgeVisibility = (id: string, isHidden: boolean) => {
   emit('toggleEdgeVisibility', id, isHidden)
 }

 const toggleGroupVisibility = (edges: DetectedEdge[], isHidden: boolean) => {
   const ids = edges.map(e => e.id)
   emit('toggleEdgesVisibility', ids, isHidden)
 }
 
 const deleteGroupEdges = (edges: DetectedEdge[]) => {
   const ids = edges.map(e => e.id)
   emit('deleteEdges', ids)
   selectedEdgeIds.value = selectedEdgeIds.value.filter(id => !ids.includes(id))
 }

 const queryEdge = (id: string) => {
   emit('queryEdge', id)
 }
 
 const highlightEdge = (id: string) => {
   if (locatedEdgeIds.value.includes(id)) {
     // Cancel locate - remove from located edges
     locatedEdgeIds.value = locatedEdgeIds.value.filter(edgeId => edgeId !== id)
     emit('selectEdge', '') // Clear selection
   } else {
     // Start locate - add to located edges
     locatedEdgeIds.value.push(id)
     emit('selectEdge', id)
   }
 }

 const getSubGroups = (edges: DetectedEdge[]) => {
  if (groupBy.value !== 'rule') return null
  
  const groups: Record<string, { sourceTable: string, targetTable: string, edges: DetectedEdge[] }> = {}
  
  edges.forEach(edge => {
    const key = `${edge.sourceNodeLabel} -> ${edge.targetNodeLabel}`
    if (!groups[key]) {
      groups[key] = {
        sourceTable: edge.sourceNodeLabel,
        targetTable: edge.targetNodeLabel,
        edges: []
      }
    }
    groups[key].edges.push(edge)
  })
  
  return groups
}

const isGroupHidden = (edges: DetectedEdge[]) => {
  return edges.every(e => e.isHidden)
}

const editRule = (rule: PatternRule) => {
  editingRule.value = rule
  newRule.value = { ...rule }
  showAddRuleDialog.value = true
}

const saveRule = () => {
  if (editingRule.value) {
    emit('editRule', newRule.value)
  } else {
    emit('addRule', newRule.value)
  }
  showAddRuleDialog.value = false
  resetNewRule()
}

const autoDetectRelationships = () => {
  emit('autoDetect')
}

const handleAddRuleClick = () => {
  resetNewRule()
  showAddRuleDialog.value = true
}

const resetNewRule = () => {
  newRule.value = {
    name: '',
    tablePattern: '',
    sourcePattern: '',
    targetPattern: '',
    targetColumnPattern: '',
    relationshipType: 'ONE_TO_MANY',
    priority: 10,
    isActive: true
  }
  editingRule.value = null
}

const collapsePanel = () => {
  emit('close')
}
</script>
