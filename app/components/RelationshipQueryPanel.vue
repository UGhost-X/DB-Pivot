<template>
  <div class="p-4 border rounded-lg bg-white shadow-sm">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-900">关系查询</h3>
      <Button variant="ghost" size="sm" @click="collapsePanel">
        <Minus class="h-4 w-4" />
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

      <!-- 字段选择 -->
      <div>
        <Label class="text-sm font-medium text-gray-700 mb-2 block">返回字段</Label>
        <Select v-model="queryConfig.fieldSelection" multiple>
          <SelectTrigger class="w-full">
            <SelectValue placeholder="选择要返回的字段" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem 
              v-for="field in availableFields" 
              :key="field" 
              :value="field"
            >
              {{ field }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <!-- 查询条件 -->
      <div>
        <Label class="text-sm font-medium text-gray-700 mb-2 block">查询条件</Label>
        <Input 
          v-model="queryConfig.whereClause" 
          placeholder="例如: id = 1"
          class="w-full"
        />
      </div>

      <!-- 操作按钮 -->
      <div class="flex space-x-2 pt-2">
        <Button 
          @click="executeQuery" 
          :disabled="!queryConfig.startTable"
          class="flex-1"
        >
          <Activity class="h-4 w-4 mr-2" />
          执行查询
        </Button>
        <Button variant="outline" @click="resetQuery">
          重置
        </Button>
      </div>

      <!-- 查询结果统计 -->
      <div v-if="queryResult" class="pt-4 border-t">
        <div class="text-sm text-gray-600">
          找到 {{ queryResult.totalRelations }} 个关系，
          涉及 {{ queryResult.totalTables }} 个表
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Minus, Activity } from 'lucide-vue-next'

interface QueryConfig {
  startTable: string
  maxDepth: number
  fieldSelection: string[]
  whereClause: string
}

interface QueryResult {
  totalRelations: number
  totalTables: number
  data: any[]
}

const props = defineProps<{
  tablesData: Record<string, any[]>
}>()

const emit = defineEmits<{
  (e: 'executeQuery', config: QueryConfig): void
  (e: 'close'): void
  (e: 'collapse'): void
}>()

const queryConfig = ref<QueryConfig>({
  startTable: '',
  maxDepth: 3,
  fieldSelection: [],
  whereClause: ''
})

const queryResult = ref<QueryResult | null>(null)

const availableTables = computed(() => Object.keys(props.tablesData))

const availableFields = computed(() => {
  if (!queryConfig.value.startTable) return []
  const columns = props.tablesData[queryConfig.value.startTable] || []
  return columns.map(c => c.name)
})

const executeQuery = () => {
  emit('executeQuery', { ...queryConfig.value })
}

const resetQuery = () => {
  queryConfig.value = {
    startTable: '',
    maxDepth: 3,
    fieldSelection: [],
    whereClause: ''
  }
  queryResult.value = null
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