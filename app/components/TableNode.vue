<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { Key as KeyIcon, Link, MoreHorizontal, EyeOff, Hash, Type, Calendar, ToggleLeft } from 'lucide-vue-next'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { computed } from 'vue'
import { useI18n } from '@/composables/useI18n'

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
    onHover?: (payload: { tableName: string, columnName: string, isHovering: boolean }) => void
  }
  selected?: boolean
}>()

const { t } = useI18n()
const headerColor = computed(() => props.data.color || (props.data.isView ? '#a855f7' : '#22c55e'))

const headerStyle = computed(() => ({
  background: `radial-gradient(circle at 50% -20%, ${headerColor.value}30, transparent 70%)`
}))

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

const handleHover = (col: any, isHovering: boolean) => {
  if (!col.isForeignKey) return
  if (props.data.onHover) {
    props.data.onHover({ tableName: props.data.label, columnName: col.name, isHovering })
  }
}

const getTypeIcon = (type: string) => {
  const t = (type || '').toLowerCase()
  if (t.includes('int') || t.includes('float') || t.includes('double') || t.includes('decimal') || t.includes('numeric')) return Hash
  if (t.includes('char') || t.includes('text') || t.includes('string') || t.includes('uuid')) return Type
  if (t.includes('date') || t.includes('time') || t.includes('timestamp')) return Calendar
  if (t.includes('bool')) return ToggleLeft
  
  return Type
}
</script>

<template>
  <Card 
    class="min-w-[240px] overflow-hidden text-sm border shadow-sm hover:shadow-xl transition-all duration-300 bg-card text-foreground relative"
    :class="selected ? 'border-blue-400 ring-2 ring-blue-400 shadow-lg shadow-blue-400/20' : 'border-border/40 hover:border-border/80'"
  >
    <div 
        class="px-3 py-2 border-b border-border/40 flex items-center justify-between cursor-pointer"
        :style="headerStyle"
      >
        <div class="flex-grow text-center truncate px-1">
        <span 
          class="font-semibold text-[13px] tracking-tight text-foreground" 
          :class="{ 'italic underline decoration-dotted': data.isView }"
          :title="data.label"
        >
          {{ data.label }}
        </span>
      </div>
    </div>

    <div v-show="!data.isCollapsed" class="py-1">
      <div 
        v-for="col in visibleColumns" 
        :key="col.name" 
        class="h-7 px-3 flex items-center justify-between hover:bg-muted/40 group transition-colors relative cursor-pointer"
        @contextmenu="handleContextMenu($event, col)"
        @dblclick="handleDblClick($event, col)"
        @click="handleClick($event, col)"
        @mouseenter="handleHover(col, true)"
        @mouseleave="handleHover(col, false)"
      >
        <Handle 
          :id="`${col.name}-target`"
          type="target" 
          :position="Position.Left" 
          class="!opacity-0 group-hover:!opacity-100 !w-2 !h-2 !-left-1 !bg-primary !border-none transition-opacity" 
        />
        <Handle 
          :id="`${col.name}-source`"
          type="source" 
          :position="Position.Right" 
          class="!opacity-0 group-hover:!opacity-100 !w-2 !h-2 !-right-1 !bg-primary !border-none transition-opacity" 
        />
        
        <div class="flex items-center gap-1.5 overflow-hidden flex-1">
          <div class="w-4 flex-shrink-0 flex justify-center items-center">
            <Tooltip v-if="col.isPrimaryKey">
              <TooltipTrigger>
                <KeyIcon class="w-3.5 h-3.5 text-yellow-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{{ t('table.primaryKey') }}</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip v-else-if="col.isForeignKey">
              <TooltipTrigger>
                <Link class="w-3.5 h-3.5 text-blue-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{{ t('table.foreignKey') }}</p>
              </TooltipContent>
            </Tooltip>
            
            <div v-else class="flex justify-center items-center w-full h-full">
              <component :is="getTypeIcon(col.type)" class="w-3 h-3 text-muted-foreground/70" />
            </div>
          </div>
          
          <span class="truncate text-foreground font-medium" :class="{ 'font-semibold': col.isPrimaryKey }" :title="col.name">
            {{ col.name }}
            <span v-if="col.nullable" class="text-muted-foreground font-normal">?</span>
          </span>
        </div>
      </div>

      <div v-if="hiddenColumns.length > 0" class="px-3 py-2 bg-muted/30 border-t border-border/40">
        <Popover>
          <PopoverTrigger as-child>
            <div class="text-xs text-muted-foreground italic cursor-pointer hover:text-foreground flex items-center gap-1">
              <MoreHorizontal class="w-3 h-3" />
              {{ hiddenColumns.length }} {{ t('table.hiddenColumns') }}
            </div>
          </PopoverTrigger>
          <PopoverContent class="w-56 p-2">
            <div class="max-h-60 overflow-y-auto space-y-1">
              <div class="text-xs font-bold text-muted-foreground mb-2 px-2">{{ t('table.hiddenColumnsTitle') }}</div>
              <div 
                v-for="col in hiddenColumns" 
                :key="col.name"
                class="flex items-center justify-between text-sm px-2 py-1 hover:bg-muted/60 hover:text-foreground rounded cursor-pointer"
                @click="toggleHidden(col.name)"
              >
                <span class="truncate text-foreground">{{ col.name }}</span>
                <EyeOff class="w-3 h-3 text-muted-foreground" />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>

    <Handle 
      type="target" 
      :position="Position.Left" 
      class="!top-4 !w-3 !h-3 !-left-1.5 !bg-muted !border-2 !border-background !opacity-0 hover:!opacity-100" 
    />
    <Handle 
      type="source" 
      :position="Position.Right" 
      class="!top-4 !w-3 !h-3 !-right-1.5 !bg-muted !border-2 !border-background !opacity-0 hover:!opacity-100" 
    />
  </Card>
</template>

<style scoped>
.vue-flow__handle {
  z-index: 20;
}
</style>
