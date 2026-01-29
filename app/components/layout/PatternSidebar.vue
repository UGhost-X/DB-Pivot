<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Search, 
  Trash2, 
  Eye, 
  EyeOff, 
  Filter,
  Link,
  Link2Off,
  Settings,
  CheckSquare,
  Square,
  ChevronDown,
  ChevronRight
} from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'

const props = defineProps<{
  isOpen: boolean
  edges: any[]
  nodes: any[]
  patternRules: any[]
  detectionStats: any
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'select-relationship', edgeId: string): void
  (e: 'delete-relationship', edgeId: string): void
  (e: 'delete-relationships', edgeIds: string[]): void
  (e: 'toggle-relationship-visibility', edgeId: string, visible: boolean): void
  (e: 'toggle-relationships-visibility', edgeIds: string[], visible: boolean): void
  (e: 'query-relationship', edgeId: string): void
}>()

const { t } = useI18n()
const searchQuery = ref('')
const selectedRelationships = ref<Set<string>>(new Set())
const expandedSections = ref({
  foreignKey: true,
  patternMatch: true,
  highConfidence: true
})

const filteredEdges = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return props.edges
  
  return props.edges.filter(edge => {
    const sourceNode = props.nodes.find(n => n.id === edge.source)
    const targetNode = props.nodes.find(n => n.id === edge.target)
    
    return (
      (sourceNode?.data?.name || '').toLowerCase().includes(query) ||
      (targetNode?.data?.name || '').toLowerCase().includes(query) ||
      (edge.data?.relationshipType || '').toLowerCase().includes(query) ||
      (edge.data?.description || '').toLowerCase().includes(query)
    )
  })
})

const categorizedRelationships = computed(() => {
  const result = {
    foreignKey: [] as any[],
    patternMatch: [] as any[],
    highConfidence: [] as any[]
  }
  
  filteredEdges.value.forEach(edge => {
    const sourceNode = props.nodes.find(n => n.id === edge.source)
    const targetNode = props.nodes.find(n => n.id === edge.target)
    
    const relationship = {
      ...edge,
      sourceTable: sourceNode?.data?.name || edge.source,
      targetTable: targetNode?.data?.name || edge.target,
      sourceColumn: edge.sourceHandle,
      targetColumn: edge.targetHandle
    }
    
    if (edge.data?.detectionMethod === 'foreignKey') {
      result.foreignKey.push(relationship)
    } else if (edge.data?.detectionMethod === 'patternMatch') {
      result.patternMatch.push(relationship)
    }
    
    if (edge.data?.confidence && edge.data.confidence >= 0.8) {
      result.highConfidence.push(relationship)
    }
  })
  
  return result
})

const toggleSelection = (edgeId: string) => {
  if (selectedRelationships.value.has(edgeId)) {
    selectedRelationships.value.delete(edgeId)
  } else {
    selectedRelationships.value.add(edgeId)
  }
}

const selectAll = () => {
  if (selectedRelationships.value.size === filteredEdges.value.length) {
    selectedRelationships.value.clear()
  } else {
    filteredEdges.value.forEach(edge => {
      selectedRelationships.value.add(edge.id)
    })
  }
}

const handleSelectRelationship = (edgeId: string) => {
  emit('select-relationship', edgeId)
}

const handleDeleteRelationship = (edgeId: string) => {
  emit('delete-relationship', edgeId)
}

const handleDeleteSelected = () => {
  if (selectedRelationships.value.size > 0) {
    emit('delete-relationships', Array.from(selectedRelationships.value))
    selectedRelationships.value.clear()
  }
}

const handleToggleVisibility = (edgeId: string, visible: boolean) => {
  emit('toggle-relationship-visibility', edgeId, visible)
}

const handleToggleSelectedVisibility = (visible: boolean) => {
  if (selectedRelationships.value.size > 0) {
    emit('toggle-relationships-visibility', Array.from(selectedRelationships.value), visible)
  }
}

const handleQueryRelationship = (edgeId: string) => {
  emit('query-relationship', edgeId)
}

const toggleSection = (section: string) => {
  expandedSections.value[section] = !expandedSections.value[section]
}

watch(() => props.edges, () => {
  // Clear selection when edges change
  selectedRelationships.value.clear()
})
</script>

<template>
  <div 
    v-if="isOpen"
    class="fixed right-0 top-0 h-full w-80 bg-background border-l border-border shadow-xl z-40 flex flex-col"
  >
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-border bg-muted/50">
      <div class="flex items-center gap-2">
        <Settings class="h-5 w-5 text-primary" />
        <h2 class="font-semibold text-lg">关系管理</h2>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        @click="$emit('close')"
        class="h-8 w-8"
      >
        <span class="sr-only">关闭</span>
        ×
      </Button>
    </div>

    <!-- Search and Controls -->
    <div class="p-4 space-y-3 border-b border-border">
      <div class="relative">
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          v-model="searchQuery"
          placeholder="搜索关系..."
          class="pl-9"
        />
      </div>
      
      <div class="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          @click="selectAll"
          class="flex-1"
        >
          <CheckSquare v-if="selectedRelationships.size === filteredEdges.length" class="h-4 w-4 mr-1" />
          <Square v-else class="h-4 w-4 mr-1" />
          全选
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          @click="handleDeleteSelected"
          :disabled="selectedRelationships.size === 0"
          class="flex-1"
        >
          <Trash2 class="h-4 w-4 mr-1" />
          删除
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          @click="handleToggleSelectedVisibility(false)"
          :disabled="selectedRelationships.size === 0"
          class="flex-1"
        >
          <EyeOff class="h-4 w-4 mr-1" />
          隐藏
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          @click="handleToggleSelectedVisibility(true)"
          :disabled="selectedRelationships.size === 0"
          class="flex-1"
        >
          <Eye class="h-4 w-4 mr-1" />
          显示
        </Button>
      </div>
      
      <!-- Stats -->
      <div v-if="detectionStats" class="text-sm text-muted-foreground space-y-1">
        <div class="flex justify-between">
          <span>检测到关系:</span>
          <span class="font-medium">{{ detectionStats.total }}</span>
        </div>
        <div class="flex justify-between">
          <span>通过外键:</span>
          <span class="font-medium">{{ detectionStats.byForeignKey }}</span>
        </div>
        <div class="flex justify-between">
          <span>通过模式匹配:</span>
          <span class="font-medium">{{ detectionStats.byPattern }}</span>
        </div>
        <div class="flex justify-between">
          <span>置信度 ≥ 0.8:</span>
          <span class="font-medium">{{ detectionStats.highConfidence }}</span>
        </div>
      </div>
    </div>

    <!-- Relationships List -->
    <ScrollArea class="flex-1">
      <div class="p-4 space-y-4">
        <!-- Foreign Key Relationships -->
        <div>
          <div 
            class="flex items-center justify-between cursor-pointer py-2"
            @click="toggleSection('foreignKey')"
          >
            <div class="flex items-center gap-2">
              <Link class="h-4 w-4 text-blue-500" />
              <span class="font-medium">外键关系</span>
              <Badge variant="secondary">{{ categorizedRelationships.foreignKey.length }}</Badge>
            </div>
            <ChevronDown 
              v-if="expandedSections.foreignKey" 
              class="h-4 w-4 text-muted-foreground" 
            />
            <ChevronRight v-else class="h-4 w-4 text-muted-foreground" />
          </div>
          
          <div v-if="expandedSections.foreignKey" class="space-y-2 ml-6">
            <div 
              v-for="relationship in categorizedRelationships.foreignKey" 
              :key="relationship.id"
              class="p-3 rounded-lg border border-border bg-card hover:bg-accent cursor-pointer group"
              :class="{ 'ring-2 ring-primary': selectedRelationships.has(relationship.id) }"
              @click="handleSelectRelationship(relationship.id)"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <Checkbox 
                      :checked="selectedRelationships.has(relationship.id)" 
                      @click.stop="toggleSelection(relationship.id)"
                    />
                    <div class="text-sm font-medium">
                      {{ relationship.sourceTable }} → {{ relationship.targetTable }}
                    </div>
                  </div>
                  <div class="text-xs text-muted-foreground space-y-1">
                    <div>{{ relationship.sourceColumn }} → {{ relationship.targetColumn }}</div>
                    <div v-if="relationship.data?.description">{{ relationship.data.description }}</div>
                    <div v-if="relationship.data?.confidence" class="flex items-center gap-1">
                      <span>置信度:</span>
                      <Badge 
                        :variant="relationship.data.confidence >= 0.8 ? 'default' : 'secondary'"
                        class="text-xs"
                      >
                        {{ (relationship.data.confidence * 100).toFixed(1) }}%
                      </Badge>
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    @click.stop="handleQueryRelationship(relationship.id)"
                    class="h-6 w-6"
                    title="查询"
                  >
                    <Filter class="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    @click.stop="handleDeleteRelationship(relationship.id)"
                    class="h-6 w-6"
                    title="删除"
                  >
                    <Trash2 class="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    @click.stop="handleToggleVisibility(relationship.id, !relationship.data?.visible)"
                    class="h-6 w-6"
                    :title="relationship.data?.visible === false ? '显示' : '隐藏'"
                  >
                    <EyeOff v-if="relationship.data?.visible !== false" class="h-3 w-3" />
                    <Eye v-else class="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pattern Match Relationships -->
        <div>
          <div 
            class="flex items-center justify-between cursor-pointer py-2"
            @click="toggleSection('patternMatch')"
          >
            <div class="flex items-center gap-2">
              <Settings class="h-4 w-4 text-green-500" />
              <span class="font-medium">模式匹配关系</span>
              <Badge variant="secondary">{{ categorizedRelationships.patternMatch.length }}</Badge>
            </div>
            <ChevronDown 
              v-if="expandedSections.patternMatch" 
              class="h-4 w-4 text-muted-foreground" 
            />
            <ChevronRight v-else class="h-4 w-4 text-muted-foreground" />
          </div>
          
          <div v-if="expandedSections.patternMatch" class="space-y-2 ml-6">
            <div 
              v-for="relationship in categorizedRelationships.patternMatch" 
              :key="relationship.id"
              class="p-3 rounded-lg border border-border bg-card hover:bg-accent cursor-pointer group"
              :class="{ 'ring-2 ring-primary': selectedRelationships.has(relationship.id) }"
              @click="handleSelectRelationship(relationship.id)"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <Checkbox 
                      :checked="selectedRelationships.has(relationship.id)" 
                      @click.stop="toggleSelection(relationship.id)"
                    />
                    <div class="text-sm font-medium">
                      {{ relationship.sourceTable }} → {{ relationship.targetTable }}
                    </div>
                  </div>
                  <div class="text-xs text-muted-foreground space-y-1">
                    <div>{{ relationship.sourceColumn }} → {{ relationship.targetColumn }}</div>
                    <div v-if="relationship.data?.patternRule">规则: {{ relationship.data.patternRule }}</div>
                    <div v-if="relationship.data?.confidence" class="flex items-center gap-1">
                      <span>置信度:</span>
                      <Badge 
                        :variant="relationship.data.confidence >= 0.8 ? 'default' : 'secondary'"
                        class="text-xs"
                      >
                        {{ (relationship.data.confidence * 100).toFixed(1) }}%
                      </Badge>
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    @click.stop="handleQueryRelationship(relationship.id)"
                    class="h-6 w-6"
                    title="查询"
                  >
                    <Filter class="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    @click.stop="handleDeleteRelationship(relationship.id)"
                    class="h-6 w-6"
                    title="删除"
                  >
                    <Trash2 class="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    @click.stop="handleToggleVisibility(relationship.id, !relationship.data?.visible)"
                    class="h-6 w-6"
                    :title="relationship.data?.visible === false ? '显示' : '隐藏'"
                  >
                    <EyeOff v-if="relationship.data?.visible !== false" class="h-3 w-3" />
                    <Eye v-else class="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div 
          v-if="filteredEdges.length === 0" 
          class="text-center py-8 text-muted-foreground"
        >
          <Link2Off class="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p class="text-sm">未检测到关系</p>
          <p class="text-xs mt-1">使用自动检测或手动添加关系</p>
        </div>
      </div>
    </ScrollArea>
  </div>
</template>