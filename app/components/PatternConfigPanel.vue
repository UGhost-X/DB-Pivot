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
            @click="showAddRuleDialog = true"
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

          <div class="border border-border rounded-md overflow-hidden">
             <!-- Table Header -->
            <div class="grid grid-cols-12 gap-2 px-4 py-2 border-b border-border bg-muted/20 text-xs font-medium text-muted-foreground">
              <div class="col-span-1 flex items-center justify-center">
                <Checkbox 
                  :checked="isAllSelected" 
                  @update:checked="toggleSelectAll" 
                />
              </div>
              <div class="col-span-8">关系详情 (源 -> 目标)</div>
              <div class="col-span-3 text-center">操作</div>
            </div>

            <!-- Relationship List -->
            <div class="max-h-[300px] overflow-y-auto bg-card">
              <div v-if="!detectedEdges || detectedEdges.length === 0" class="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <Link class="h-6 w-6 opacity-50 mb-2" />
                <p class="text-xs">暂无检测到的模式关系</p>
              </div>
              
              <div v-else class="divide-y divide-border">
                <div 
                  v-for="edge in detectedEdges" 
                  :key="edge.id"
                  class="grid grid-cols-12 gap-2 px-4 py-2 text-sm hover:bg-muted/30 transition-colors items-center group"
                  :class="{ 'bg-muted/50': selectedEdgeIds.includes(edge.id) }"
                >
                  <div class="col-span-1 flex items-center justify-center">
                    <Checkbox 
                      :checked="selectedEdgeIds.includes(edge.id)" 
                      @update:checked="(checked) => toggleSelectEdge(edge.id, checked)"
                    />
                  </div>
                  <div class="col-span-8 flex flex-col gap-0.5 overflow-hidden">
                    <div class="truncate font-mono text-xs text-foreground/80 flex items-center" :title="`${edge.sourceNodeLabel}.${edge.sourceHandleLabel}`">
                      <span class="font-semibold text-primary/80 truncate max-w-[80px]">{{ edge.sourceNodeLabel }}</span>
                      <span class="text-muted-foreground">.{{ edge.sourceHandleLabel }}</span>
                    </div>
                    <div class="flex justify-center w-4 rotate-90 text-muted-foreground/50 text-[10px]">↓</div>
                    <div class="truncate font-mono text-xs text-foreground/80 flex items-center" :title="`${edge.targetNodeLabel}.${edge.targetHandleLabel}`">
                      <span class="font-semibold text-primary/80 truncate max-w-[80px]">{{ edge.targetNodeLabel }}</span>
                      <span class="text-muted-foreground">.{{ edge.targetHandleLabel }}</span>
                    </div>
                  </div>
                  <div class="col-span-3 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div class="flex gap-1">
                      <Button variant="ghost" size="icon" class="h-6 w-6" @click.stop="highlightEdge(edge.id)" title="在画布中查看">
                        <Eye class="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" class="h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/10" @click.stop="deleteEdge(edge.id)" title="删除">
                        <Trash2 class="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- 底部操作区域 -->
      <div class="shrink-0 border-t border-border bg-muted/10">
        <!-- 删除工具栏 -->
        <div class="px-4 py-2 border-b border-border flex items-center justify-between bg-muted/5" v-if="selectedEdgeIds.length > 0">
          <span class="text-xs text-muted-foreground">已选择 {{ selectedEdgeIds.length }} 项</span>
          <Button 
            variant="destructive" 
            size="sm" 
            class="h-7 text-xs"
            @click="deleteSelectedEdges"
          >
            <Trash2 class="h-3.5 w-3.5 mr-1.5" />
            删除选中
          </Button>
        </div>

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
import { Minus, Plus, Trash2, Eye, Link, FileCode, Paintbrush, EyeOff } from 'lucide-vue-next'

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
   (e: 'queryEdge', id: string): void
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

const newRule = ref<PatternRule>({
  name: '',
  tablePattern: '',
  sourcePattern: '',
  targetPattern: '',
  relationshipType: 'ONE_TO_MANY',
  priority: 10,
  isActive: true
})

const isAllSelected = computed(() => {
  return props.detectedEdges && props.detectedEdges.length > 0 && selectedEdgeIds.value.length === props.detectedEdges.length
})

const toggleSelectAll = (checked: boolean) => {
  if (checked && props.detectedEdges) {
    selectedEdgeIds.value = props.detectedEdges.map(e => e.id)
  } else {
    selectedEdgeIds.value = []
  }
}

const toggleSelectEdge = (id: string, checked: boolean) => {
  if (checked) {
    selectedEdgeIds.value.push(id)
  } else {
    selectedEdgeIds.value = selectedEdgeIds.value.filter(e => e !== id)
  }
}

const deleteSelectedEdges = () => {
  emit('deleteEdges', selectedEdgeIds.value)
  selectedEdgeIds.value = []
}

const deleteEdge = (id: string) => {
  emit('deleteEdge', id)
  selectedEdgeIds.value = selectedEdgeIds.value.filter(e => e !== id)
}

const highlightEdge = (id: string) => {
   emit('selectEdge', id)
 }
 
 const queryEdge = (id: string) => {
   emit('queryEdge', id)
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