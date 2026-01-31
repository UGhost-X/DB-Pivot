<template>
  <div class="p-4 overflow-y-auto h-full">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-900">关系查询</h3>
      <Button variant="ghost" size="sm" @click="collapsePanel">
        <X class="h-4 w-4" />
      </Button>
    </div>
    
    <div class="space-y-4">
      <!-- 起始表选择 -->
      <div>
        <Label class="text-sm font-medium text-gray-700 mb-2 block">起始表</Label>
        <Select v-model="queryConfig.startTable">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="选择起始表" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem 
              v-for="table in availableTables" 
              :key="table" 
              :value="table"
            >
              {{ table }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label class="text-sm font-medium text-gray-700 mb-2 block">终点表</Label>
        <Select v-model="queryConfig.endTable">
          <SelectTrigger class="w-full">
            <SelectValue placeholder="选择终点表（可选）" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem 
              v-for="table in availableTables" 
              :key="table" 
              :value="table"
            >
              {{ table }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <!-- 查询深度 -->
      <div>
        <Label class="text-sm font-medium text-gray-700 mb-2 block">查询深度</Label>
        <div class="flex items-center space-x-2">
          <Input 
            type="number" 
            v-model="queryConfig.maxDepth" 
            min="1" 
            max="10"
            class="w-20"
          />
          <span class="text-sm text-gray-500">层</span>
        </div>
      </div>

      <!-- 选项 -->
      <div class="flex items-center space-x-2">
        <Checkbox
          id="shortest-path"
          :model-value="queryConfig.shortestPath"
          :checked="queryConfig.shortestPath"
          @update:model-value="queryConfig.shortestPath = $event === true"
          @update:checked="queryConfig.shortestPath = $event === true"
        />
        <label
          for="shortest-path"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          最短路径
        </label>
      </div>
      <div class="flex items-center space-x-2">
        <Checkbox
          id="hide-unrelated"
          :model-value="queryConfig.hideUnrelated"
          :checked="queryConfig.hideUnrelated"
          @update:model-value="queryConfig.hideUnrelated = $event === true"
          @update:checked="queryConfig.hideUnrelated = $event === true"
        />
        <label
          for="hide-unrelated"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          隐藏非关联表
        </label>
      </div>

      <!-- 操作按钮 -->
      <div class="flex space-x-2 pt-2">
        <Button 
          @click="executeQuery" 
          :disabled="!queryConfig.startTable || (queryConfig.shortestPath && !queryConfig.endTable)"
          class="flex-1"
        >
          <Activity class="h-4 w-4 mr-2" />
          查询并高亮
        </Button>
        <Button variant="outline" @click="resetQuery">
          重置
        </Button>
      </div>

      <!-- 保存视图 -->
      <div v-if="queryResult" class="pt-4 border-t space-y-2">
        <div class="text-sm text-gray-600">
          找到 {{ queryResult.totalRelations }} 个关系，
          涉及 {{ queryResult.totalTables }} 个表
        </div>
        <div class="flex space-x-2">
          <Input v-model="viewName" placeholder="视图名称" class="flex-1" />
          <Button @click="saveView" :disabled="!viewName">
            保存视图
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { X, Activity } from 'lucide-vue-next'
import type { Node, Edge } from '@vue-flow/core'
import { toast } from 'vue-sonner'

interface QueryConfig {
  startTable: string
  endTable: string
  maxDepth: number
  hideUnrelated: boolean
  shortestPath: boolean
}

interface QueryResult {
  totalRelations: number
  totalTables: number
  visitedNodeIds: string[]
  traversedEdgeIds: string[]
}

const props = defineProps<{
  tablesData: Record<string, any[]>
  nodes: Node[]
  edges: Edge[]
  initialConfig?: QueryConfig
}>()

const route = useRoute()

const emit = defineEmits<{
  (e: 'applyQuery', result: QueryResult & { hideUnrelated: boolean }): void
  (e: 'update:config', config: QueryConfig): void
  (e: 'resetQuery'): void
  (e: 'close'): void
  (e: 'view-saved'): void
}>()

const queryConfig = ref<QueryConfig>({
  startTable: props.initialConfig?.startTable || '',
  endTable: props.initialConfig?.endTable || '',
  maxDepth: props.initialConfig?.maxDepth || 1,
  hideUnrelated: props.initialConfig?.hideUnrelated || false,
  shortestPath: props.initialConfig?.shortestPath || false,
})

watch(() => props.initialConfig, (newConfig) => {
  if (newConfig) {
    queryConfig.value = {
      startTable: newConfig.startTable || '',
      endTable: newConfig.endTable || '',
      maxDepth: newConfig.maxDepth || 1,
      hideUnrelated: newConfig.hideUnrelated || false,
      shortestPath: newConfig.shortestPath || false,
    }
  }
}, { deep: true })

watch(() => queryConfig.value, (newConfig) => {
  // Only emit if it's different from initialConfig to avoid loops
  if (JSON.stringify(newConfig) !== JSON.stringify(props.initialConfig)) {
    emit('update:config', newConfig)
  }
}, { deep: true })

const viewName = ref('')
const queryResult = ref<QueryResult | null>(null)

const availableTables = computed(() => {
  const canvasTableNames = new Set(
    props.nodes
      .filter(n => n.type === 'table' && n.data?.label)
      .map(n => String(n.data.label))
  )
  return Object.keys(props.tablesData).filter(table => canvasTableNames.has(table))
})

watch(availableTables, (newAvailable) => {
  const availableSet = new Set(newAvailable)
  if (queryConfig.value.startTable && !availableSet.has(queryConfig.value.startTable)) {
    queryConfig.value.startTable = ''
  }
  if (queryConfig.value.endTable && !availableSet.has(queryConfig.value.endTable)) {
    queryConfig.value.endTable = ''
  }
}, { deep: true })

const executeQuery = () => {
  if (!queryConfig.value.startTable) return

  const startNodeId = `table-${queryConfig.value.startTable}`
  const startNode = props.nodes.find(n => n.id === startNodeId)
  
  if (!startNode) {
    toast.error('起始表未在画布上找到')
    return
  }

  const isUserHiddenEdge = (e: Edge) => ((e.data as any)?.isHidden ?? false) === true

  const adjacency = new Map<string, Array<{ neighborId: string; edgeId: string }>>()
  const addAdj = (from: string, to: string, edgeId: string) => {
    if (!adjacency.has(from)) adjacency.set(from, [])
    adjacency.get(from)!.push({ neighborId: to, edgeId })
  }

  props.edges.forEach((e) => {
    if (isUserHiddenEdge(e)) return
    if (!e.source || !e.target) return
    addAdj(String(e.source), String(e.target), String(e.id))
    addAdj(String(e.target), String(e.source), String(e.id))
  })

  const visited = new Set<string>()
  const traversedEdges = new Set<string>()

  const endTable = queryConfig.value.endTable?.trim()
  const hasEnd = Boolean(endTable)

  if (queryConfig.value.shortestPath) {
    if (!hasEnd) {
      toast.error('请选择终点表')
      return
    }

    const endNodeId = `table-${endTable}`
    const endNode = props.nodes.find(n => n.id === endNodeId)
    if (!endNode) {
      toast.error('终点表未在画布上找到')
      return
    }

    const bfsDist = (sourceId: string) => {
      const dist = new Map<string, number>()
      const queue: string[] = [sourceId]
      dist.set(sourceId, 0)
      while (queue.length > 0) {
        const id = queue.shift()!
        const d = dist.get(id) ?? 0
        if (d >= queryConfig.value.maxDepth) continue
        const neighbors = adjacency.get(id) || []
        for (const { neighborId } of neighbors) {
          if (dist.has(neighborId)) continue
          dist.set(neighborId, d + 1)
          queue.push(neighborId)
        }
      }
      return dist
    }

    const distFromStart = bfsDist(startNodeId)
    const distToEnd = bfsDist(endNodeId)
    const shortest = distFromStart.get(endNodeId)

    if (typeof shortest !== 'number') {
      toast.error('未找到最短路径')
      return
    }

    props.nodes.forEach((n) => {
      const ds = distFromStart.get(n.id)
      const de = distToEnd.get(n.id)
      if (typeof ds !== 'number' || typeof de !== 'number') return
      if (ds + de === shortest) visited.add(n.id)
    })

    props.edges.forEach((e) => {
      if (isUserHiddenEdge(e)) return
      const s = String(e.source)
      const t = String(e.target)
      const dsS = distFromStart.get(s)
      const dsT = distFromStart.get(t)
      const deS = distToEnd.get(s)
      const deT = distToEnd.get(t)

      const ok =
        (typeof dsS === 'number' && typeof deT === 'number' && dsS + 1 + deT === shortest) ||
        (typeof dsT === 'number' && typeof deS === 'number' && dsT + 1 + deS === shortest)

      if (ok) traversedEdges.add(String(e.id))
    })
  } else if (hasEnd) {
    const endNodeId = `table-${endTable}`
    const endNode = props.nodes.find(n => n.id === endNodeId)
    if (!endNode) {
      toast.error('终点表未在画布上找到')
      return
    }

    const bfsDist = (sourceId: string) => {
      const dist = new Map<string, number>()
      const queue: string[] = [sourceId]
      dist.set(sourceId, 0)
      while (queue.length > 0) {
        const id = queue.shift()!
        const d = dist.get(id) ?? 0
        if (d >= queryConfig.value.maxDepth) continue
        const neighbors = adjacency.get(id) || []
        for (const { neighborId } of neighbors) {
          if (dist.has(neighborId)) continue
          dist.set(neighborId, d + 1)
          queue.push(neighborId)
        }
      }
      return dist
    }

    const distFromStart = bfsDist(startNodeId)
    const distToEnd = bfsDist(endNodeId)

    if (!distFromStart.has(endNodeId)) {
      toast.error('未找到可达路径')
      return
    }

    props.nodes.forEach((n) => {
      const ds = distFromStart.get(n.id)
      const de = distToEnd.get(n.id)
      if (typeof ds !== 'number' || typeof de !== 'number') return
      if (ds + de <= queryConfig.value.maxDepth) visited.add(n.id)
    })

    props.edges.forEach((e) => {
      if (isUserHiddenEdge(e)) return
      const s = String(e.source)
      const t = String(e.target)
      const dsS = distFromStart.get(s)
      const dsT = distFromStart.get(t)
      const deS = distToEnd.get(s)
      const deT = distToEnd.get(t)
      const ok =
        (typeof dsS === 'number' && typeof deT === 'number' && dsS + 1 + deT <= queryConfig.value.maxDepth) ||
        (typeof dsT === 'number' && typeof deS === 'number' && dsT + 1 + deS <= queryConfig.value.maxDepth)
      if (ok) traversedEdges.add(String(e.id))
    })
  } else {
    const queue: { id: string; depth: number }[] = [{ id: startNodeId, depth: 0 }]
    visited.add(startNodeId)

    while (queue.length > 0) {
      const { id, depth } = queue.shift()!
      if (depth >= queryConfig.value.maxDepth) continue

      const neighbors = adjacency.get(id) || []
      for (const { neighborId, edgeId } of neighbors) {
        traversedEdges.add(edgeId)
        if (!visited.has(neighborId)) {
          visited.add(neighborId)
          queue.push({ id: neighborId, depth: depth + 1 })
        }
      }
    }
  }

  queryResult.value = {
    totalRelations: traversedEdges.size,
    totalTables: visited.size,
    visitedNodeIds: Array.from(visited),
    traversedEdgeIds: Array.from(traversedEdges)
  }

  emit('applyQuery', {
    ...queryResult.value,
    hideUnrelated: queryConfig.value.hideUnrelated
  })
}

const resetQuery = () => {
  queryConfig.value = {
    startTable: '',
    endTable: '',
    maxDepth: 1,
    hideUnrelated: false,
    shortestPath: false,
  }
  queryResult.value = null
  viewName.value = ''
  emit('resetQuery')
}

const saveView = async () => {
  if (!viewName.value || !queryResult.value) return

  try {
    const { success, error } = await $fetch('/api/saved-views', {
      method: 'POST',
      body: {
        name: viewName.value,
        config: queryConfig.value,
        result: {
          visitedNodeIds: queryResult.value.visitedNodeIds,
          traversedEdgeIds: queryResult.value.traversedEdgeIds
        },
        projectId: route.query.projectId
      }
    })

    if (!success) throw new Error(error)
    
    toast.success('视图已保存')
    viewName.value = ''
    emit('view-saved') // Notify parent to refresh list if needed
  } catch (e) {
    console.error('Failed to save view', e)
    toast.error('保存视图失败')
  }
}

const collapsePanel = () => {
  emit('close')
}
</script>

<style scoped>
.border-t {
  border-top: 1px solid #e5e7eb;
}
</style>
