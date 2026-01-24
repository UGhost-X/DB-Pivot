<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { Key, Link, MoreHorizontal, EyeOff } from 'lucide-vue-next'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { computed } from 'vue'

const props = defineProps<{
  data: {
    label: string
    columns: Array<{ name: string; type: string; isPrimaryKey?: boolean; isForeignKey?: boolean; nullable?: boolean; isHidden?: boolean }>
    isView?: boolean
    color?: string
    isCollapsed?: boolean
    onContextMenu?: (payload: { event: MouseEvent, column: any, tableName: string }) => void
    onDblClick?: (payload: { event: MouseEvent, column: any, tableName: string }) => void
    onClick?: (payload: { event: MouseEvent, column: any, tableName: string }) => void
    onCollapse?: (payload: { tableName: string, isCollapsed: boolean }) => void
    onToggleHidden?: (payload: { tableName: string, columnName: string, isHidden: boolean }) => void
  }
  selected?: boolean
}>()

const headerColor = props.data.color || (props.data.isView ? '#a855f7' : '#3b82f6')

const visibleColumns = computed(() => props.data.columns.filter(c => !c.isHidden))
const hiddenColumns = computed(() => props.data.columns.filter(c => c.isHidden))

const handleContextMenu = (event: MouseEvent, col: any) => {
  if (props.data.onContextMenu) {
    event.preventDefault()
    event.stopPropagation()
    props.data.onContextMenu({ event, column: col, tableName: props.data.label })
  }
}

const handleDblClick = (event: MouseEvent, col: any) => {
  if (props.data.onDblClick) {
    event.preventDefault()
    event.stopPropagation()
    props.data.onDblClick({ event, column: col, tableName: props.data.label })
  }
}

const handleClick = (event: MouseEvent, col: any) => {
  if (props.data.onClick) {
    event.stopPropagation()
    props.data.onClick({ event, column: col, tableName: props.data.label })
  }
}

const toggleCollapse = () => {
  if (props.data.onCollapse) {
    props.data.onCollapse({ tableName: props.data.label, isCollapsed: !props.data.isCollapsed })
  }
}

const toggleHidden = (colName: string) => {
  if (props.data.onToggleHidden) {
    props.data.onToggleHidden({ tableName: props.data.label, columnName: colName, isHidden: false })
  }
}
</script>

<template>
  <div 
    class="bg-card text-card-foreground rounded-lg shadow-md border border-border min-w-[220px] overflow-hidden text-sm transition-shadow hover:shadow-lg relative"
    :style="{ ring: selected ? `4px solid ${headerColor}80` : 'none' }"
    :class="{ 'ring-4': selected }"
  >
    <!-- Azimutt style color strip and Header -->
    <div 
      class="border-t-8 px-3 py-1.5 border-b border-b-border bg-muted/50 flex items-center justify-between cursor-pointer hover:bg-muted"
      :style="{ borderTopColor: headerColor }"
      @dblclick.stop="toggleCollapse"
    >
      <div class="flex-grow text-center truncate px-1">
        <span 
          class="font-bold text-foreground text-base tracking-tight" 
          :class="{ 'italic underline decoration-dotted': data.isView }"
          :title="data.label"
        >
          {{ data.label }}
        </span>
      </div>
    </div>

    <!-- Columns -->
    <div v-show="!data.isCollapsed" class="py-1">
      <div 
        v-for="col in visibleColumns" 
        :key="col.name" 
        class="h-6 px-2 flex items-center justify-between hover:bg-muted/50 group transition-colors relative cursor-pointer"
        @contextmenu="handleContextMenu($event, col)"
        @dblclick="handleDblClick($event, col)"
        @click="handleClick($event, col)"
      >
        <!-- Handles for each column to allow precise connections -->
        <Handle 
          :id="`${col.name}-target`"
          type="target" 
          :position="Position.Left" 
          class="!opacity-0 group-hover:!opacity-100 !w-2 !h-2 !-left-1 !bg-blue-500 !border-none transition-opacity" 
        />
        <Handle 
          :id="`${col.name}-source`"
          type="source" 
          :position="Position.Right" 
          class="!opacity-0 group-hover:!opacity-100 !w-2 !h-2 !-right-1 !bg-blue-500 !border-none transition-opacity" 
        />
        
        <div class="flex items-center gap-1.5 overflow-hidden flex-1">
          <!-- Icons (Azimutt inspired) -->
          <div class="w-4 flex-shrink-0 flex justify-center items-center">
            <Tooltip v-if="col.isPrimaryKey">
              <TooltipTrigger>
                <Key class="w-3.5 h-3.5 text-yellow-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Primary Key</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip v-else-if="col.isForeignKey">
              <TooltipTrigger>
                <Link class="w-3.5 h-3.5 text-blue-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Foreign Key</p>
              </TooltipContent>
            </Tooltip>
            
            <div v-else class="w-3.5"></div>
          </div>
          
          <!-- Column Name -->
          <span class="truncate text-gray-700 font-medium" :class="{ 'font-bold text-gray-900': col.isPrimaryKey }">
            {{ col.name }}
            <span v-if="col.nullable" class="text-gray-400 font-normal">?</span>
          </span>
        </div>

        <!-- Column Type -->
        <span class="text-[10px] text-gray-400 ml-2 flex-shrink-0 font-mono">
          {{ col.type }}
        </span>

        <Handle 
          :id="`${col.name}-source`"
          type="source" 
          :position="Position.Right" 
          class="!opacity-0 group-hover:!opacity-100 !w-2 !h-2 !-right-1 !bg-blue-500 !border-none transition-opacity" 
        />
      </div>

      <!-- Hidden Columns Indicator -->
      <div v-if="hiddenColumns.length > 0" class="px-2 py-1 bg-gray-50 border-t border-gray-100">
        <Popover>
          <PopoverTrigger as-child>
            <div class="text-xs text-gray-500 italic cursor-pointer hover:text-gray-700 flex items-center gap-1">
              <MoreHorizontal class="w-3 h-3" />
              {{ hiddenColumns.length }} hidden columns
            </div>
          </PopoverTrigger>
          <PopoverContent class="w-56 p-2">
            <div class="max-h-60 overflow-y-auto space-y-1">
              <h4 class="text-xs font-bold text-gray-500 mb-2 px-2">Hidden Columns</h4>
              <div 
                v-for="col in hiddenColumns" 
                :key="col.name"
                class="flex items-center justify-between text-sm px-2 py-1 hover:bg-accent hover:text-accent-foreground rounded cursor-pointer"
                @click="toggleHidden(col.name)"
              >
                <span class="truncate">{{ col.name }}</span>
                <EyeOff class="w-3 h-3 text-muted-foreground" />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>

    <!-- Node-level handles as fallback/general connection points -->
    <Handle 
      type="target" 
      :position="Position.Left" 
      class="!top-4 !w-3 !h-3 !-left-1.5 !bg-gray-300 !border-2 !border-white !opacity-0 hover:!opacity-100" 
    />
    <Handle 
      type="source" 
      :position="Position.Right" 
      class="!top-4 !w-3 !h-3 !-right-1.5 !bg-gray-300 !border-2 !border-white !opacity-0 hover:!opacity-100" 
    />
  </div>
</template>

<style scoped>
.vue-flow__handle {
  z-index: 20;
}
</style>
