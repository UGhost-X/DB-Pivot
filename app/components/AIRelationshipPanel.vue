<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Loader2, BrainCircuit, Plus, Check, ArrowRight, Database } from 'lucide-vue-next'
import { BinderDiscovery, type RelationshipCandidate, type Table } from '@/utils/binder'
import type { Node, Edge } from '@vue-flow/core'
import { toast } from 'vue-sonner'

const props = defineProps<{
  nodes: Node[]
  edges: Edge[]
  connectionId?: number | null
}>()

const emit = defineEmits<{
  (e: 'add-edges', edges: any[]): void
  (e: 'close'): void
}>()

const isAnalyzing = ref(false)
const isDeepAnalysis = ref(false)
const threshold = ref([50]) // 0-100
const candidates = ref<RelationshipCandidate[]>([])
const selectedIndices = ref<Set<number>>(new Set())

const thresholdValue = computed(() => (threshold.value[0] ?? 50) / 100)

const runAnalysis = async () => {
  isAnalyzing.value = true
  candidates.value = []
  selectedIndices.value.clear()

  // Simulate async for UI responsiveness
  setTimeout(async () => {
    try {
      const tables: Table[] = props.nodes
        .filter(n => n.type === 'table' && n.data?.columns)
        .map(n => ({
          name: n.data.label,
          columns: n.data.columns
        }))

      const binder = new BinderDiscovery(tables)
      // If deep analysis is enabled, use a lower threshold for initial discovery to catch more candidates
      const initialThreshold = isDeepAnalysis.value ? 0.3 : thresholdValue.value
      let results = binder.discover(initialThreshold)

      // Deep Analysis (Backend)
      if (isDeepAnalysis.value && props.connectionId && results.length > 0) {
        try {
          const data = await $fetch<any>('/api/relationships/discovery', {
            method: 'POST',
            body: {
              connectionId: props.connectionId,
              candidates: results.map(c => ({
                sourceTable: c.sourceTable,
                sourceColumn: c.sourceColumn,
                targetTable: c.targetTable,
                targetColumn: c.targetColumn
              })),
              sampleSize: 100 // Default sample size
            }
          })

          if (data?.success) {
            results = results.map(r => {
              const backendResult = data.results.find((br: any) => 
                br.sourceTable === r.sourceTable && 
                br.sourceColumn === r.sourceColumn && 
                br.targetTable === r.targetTable && 
                br.targetColumn === r.targetColumn
              )
              
              if (backendResult && backendResult.indScore > 0) {
                 const indPercentage = Math.round(backendResult.indScore * 100)
                 return { 
                    ...r, 
                    confidence: Math.max(r.confidence, backendResult.indScore),
                    reason: `${r.reason} | 数据采样匹配: ${indPercentage}%`
                 }
              } else if (backendResult && backendResult.error) {
                 return r
              } else {
                // If no data match, reduce confidence significantly if it was low to begin with
                return { ...r, confidence: r.confidence * 0.5 }
              }
            })
          }
        } catch (err) {
          console.error('Deep analysis failed:', err)
          toast.error('深度分析失败，仅显示架构匹配结果')
        }
      }

      // Filter by final threshold
      results = results.filter(r => r.confidence >= thresholdValue.value)

      // Filter out existing edges
      const existingKeys = new Set(
        props.edges.map(e => {
            const s = props.nodes.find(n => n.id === e.source)?.data?.label
            const t = props.nodes.find(n => n.id === e.target)?.data?.label
            const sh = e.sourceHandle?.replace('-source', '')
            const th = e.targetHandle?.replace('-target', '')
            return `${s}:${sh}-${t}:${th}`
        })
      )

      candidates.value = results.filter(r => {
        const key = `${r.sourceTable}:${r.sourceColumn}-${r.targetTable}:${r.targetColumn}`
        return !existingKeys.has(key)
      })

      if (candidates.value.length === 0) {
        toast.info('未发现新的潜在关系', { description: '尝试降低置信度阈值或检查表结构' })
      } else {
        toast.success(`发现 ${candidates.value.length} 个潜在关系`)
        // Select all high confidence by default
        candidates.value.forEach((c, i) => {
          if (c.confidence >= 0.8) selectedIndices.value.add(i)
        })
      }
    } catch (e) {
      console.error(e)
      toast.error('分析过程中发生错误')
    } finally {
      isAnalyzing.value = false
    }
  }, 500)
}

const toggleSelection = (index: number) => {
  if (selectedIndices.value.has(index)) {
    selectedIndices.value.delete(index)
  } else {
    selectedIndices.value.add(index)
  }
}

const applySelected = () => {
  const edgesToAdd: any[] = []
  
  selectedIndices.value.forEach(index => {
    const candidate = candidates.value[index]
    const sourceNode = props.nodes.find(n => n.data?.label === candidate.sourceTable)
    const targetNode = props.nodes.find(n => n.data?.label === candidate.targetTable)

    if (sourceNode && targetNode) {
      edgesToAdd.push({
        id: `edge-ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        source: sourceNode.id,
        sourceHandle: `${candidate.sourceColumn}-source`,
        target: targetNode.id,
        targetHandle: `${candidate.targetColumn}-target`,
        type: 'default',
        animated: true,
        data: {
          createdBy: 'ai-binder',
          confidence: candidate.confidence
        },
        style: { stroke: '#8b5cf6', strokeWidth: 2 } // Violet color for AI edges
      })
    }
  })

  emit('add-edges', edgesToAdd)
  candidates.value = []
  selectedIndices.value.clear()
}

const getConfidenceColor = (score: number) => {
  if (score >= 0.9) return 'bg-green-500'
  if (score >= 0.7) return 'bg-blue-500'
  return 'bg-yellow-500'
}
</script>

<template>
  <div class="flex flex-col h-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="p-4 border-b border-border">
      <div class="flex items-center justify-between mb-2">
        <h2 class="text-lg font-semibold flex items-center gap-2">
          <BrainCircuit class="w-5 h-5 text-violet-500" />
          AI 关系识别
        </h2>
        <Button variant="ghost" size="icon" @click="$emit('close')">
          <span class="sr-only">Close</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-4 h-4"
          >
            <path d="M18 6 6 18" />
            <path d="M6 6 18 18" />
          </svg>
        </Button>
      </div>
      <p class="text-xs text-muted-foreground mb-4">
        基于 BINDer 算法思想，智能分析表结构与命名规范，发现潜在的数据关联。
      </p>

      <div class="space-y-4">
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span>置信度阈值</span>
            <span class="font-medium">{{ threshold[0] }}%</span>
          </div>
          <Slider v-model="threshold" :max="100" :step="1" />
        </div>

        <div class="flex items-center space-x-2" v-if="connectionId">
          <Switch id="deep-analysis" :checked="isDeepAnalysis" @update:checked="isDeepAnalysis = $event" />
          <Label htmlFor="deep-analysis" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1">
            <Database class="w-3 h-3" />
            深度数据分析 (Beta)
          </Label>
        </div>
        
        <Button class="w-full bg-violet-600 hover:bg-violet-700 text-white" @click="runAnalysis" :disabled="isAnalyzing">
          <Loader2 v-if="isAnalyzing" class="w-4 h-4 mr-2 animate-spin" />
          {{ isAnalyzing ? '正在分析...' : '开始识别' }}
        </Button>
      </div>
    </div>

    <ScrollArea class="flex-1 p-4">
      <div v-if="candidates.length === 0 && !isAnalyzing" class="text-center text-muted-foreground py-8">
        <div class="mb-2">暂无分析结果</div>
        <div class="text-xs">点击上方按钮开始分析当前画布中的表</div>
      </div>

      <div v-else class="space-y-3">
        <div 
          v-for="(candidate, index) in candidates" 
          :key="index"
          class="p-3 border rounded-lg transition-colors cursor-pointer hover:bg-muted/50"
          :class="{ 'border-violet-500 bg-violet-50/10': selectedIndices.has(index) }"
          @click="toggleSelection(index)"
        >
          <div class="flex items-start justify-between mb-2">
            <div class="flex items-center gap-2">
               <div :class="['w-2 h-2 rounded-full', getConfidenceColor(candidate.confidence)]"></div>
               <span class="text-sm font-medium">{{ Math.round(candidate.confidence * 100) }}% 置信度</span>
            </div>
            <div v-if="selectedIndices.has(index)" class="text-violet-500">
              <Check class="w-4 h-4" />
            </div>
          </div>
          
          <div class="flex items-center gap-2 text-sm mb-2">
            <div class="bg-muted px-2 py-1 rounded text-xs font-mono">{{ candidate.sourceTable }}.{{ candidate.sourceColumn }}</div>
            <ArrowRight class="w-3 h-3 text-muted-foreground" />
            <div class="bg-muted px-2 py-1 rounded text-xs font-mono">{{ candidate.targetTable }}.{{ candidate.targetColumn }}</div>
          </div>
          
          <div class="text-xs text-muted-foreground">
            {{ candidate.reason }}
          </div>
        </div>
      </div>
    </ScrollArea>

    <div class="p-4 border-t border-border bg-background">
      <Button class="w-full" :disabled="selectedIndices.size === 0" @click="applySelected">
        <Plus class="w-4 h-4 mr-2" />
        添加选中关系 ({{ selectedIndices.size }})
      </Button>
    </div>
  </div>
</template>
