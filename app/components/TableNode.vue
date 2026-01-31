<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core'
import { Key as KeyIcon, Link, MoreHorizontal, EyeOff, Hash, Type, Calendar, ToggleLeft, ArrowRight, ArrowLeft } from 'lucide-vue-next'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { computed, ref } from 'vue'
import { useI18n } from '@/composables/useI18n'

const props = defineProps<{
  data: {
    label: string
    columns: Array<{ 
      name: string; 
      type: string; 
      isPrimaryKey?: boolean; 
      isForeignKey?: boolean; 
      nullable?: boolean; 
      isHidden?: boolean;
      highlightType?: 'source' | 'target' | null;
      highlightColor?: string;
      isConnectedSource?: boolean;
      isConnectedTarget?: boolean;
    }>
    isView?: boolean
    color?: string
    isCollapsed?: boolean
    onContextMenu?: (payload: { event: MouseEvent, column: any, tableName: string }) => void
    onDblClick?: (payload: { event: MouseEvent, column: any, tableName: string }) => void
    onClick?: (payload: { event: MouseEvent, column: any, tableName: string }) => void
    onCollapse?: (payload: { tableName: string, isCollapsed: boolean }) => void
    onToggleHidden?: (payload: { tableName: string, columnName: string, isHidden: boolean }) => void
    onHover?: (payload: { tableName: string, columnName: string, isHovering: boolean }) => void
    connectionMode?: 'line' | 'reference';
    locateColumns?: string[];
    connectedReferences?: Record<string, Array<{
      type: 'source' | 'target';
      column: string;
      targetTable?: string;
      targetColumn?: string;
      sourceTable?: string;
      sourceColumn?: string;
      edgeId: string;
      targetNodeId?: string;
    }>>;
    onReferenceClick?: (payload: { targetNodeId: string, targetColumnName?: string }) => void;
  }
  selected?: boolean
}>()

const { t } = useI18n()
const headerColor = computed(() => props.data.color || (props.data.isView ? '#a855f7' : '#22c55e'))

const headerStyle = computed(() => ({
  backgroundColor: `${headerColor.value}30`
}))

const visibleColumns = computed(() => props.data.columns.filter(c => !c.isHidden))
const hiddenColumns = computed(() => props.data.columns.filter(c => c.isHidden))

const openReferencePopoverColumn = ref<string | null>(null)

const closeReferencePopover = () => {
  openReferencePopoverColumn.value = null
}

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
  if (props.data.onHover) {
    props.data.onHover({ tableName: props.data.label, columnName: col.name, isHovering })
  }
}

const getReferences = (colName: string) => {
  if (!props.data.connectedReferences) return []
  return props.data.connectedReferences[colName] || []
}

const handleReferenceClick = (ref: any) => {
  if (props.data.onReferenceClick && ref.targetNodeId) {
    const targetColumnName = ref.type === 'source' ? ref.targetColumn : ref.sourceColumn
    props.data.onReferenceClick({ targetNodeId: ref.targetNodeId, targetColumnName })
  }
  closeReferencePopover()
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
    class="min-w-[240px] text-sm border shadow-sm hover:shadow-xl transition-all duration-300 bg-card text-foreground relative"
    :class="selected ? 'border-blue-400 ring-2 ring-blue-400 shadow-lg shadow-blue-400/20' : 'border-border/40 hover:border-border/80'"
  >
    <div 
        class="px-3 py-2 border-b border-border/40 flex items-center justify-between cursor-pointer rounded-t-lg"
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
        class="h-7 px-3 flex items-center justify-between group transition-colors relative cursor-pointer"
        :class="{
          'hover:bg-muted/40': !col.highlightType && !col.highlightColor,
          'bg-green-100/50 dark:bg-green-900/20 hover:bg-green-100/70 dark:hover:bg-green-900/30': !col.highlightColor && col.highlightType === 'source',
          'bg-red-100/50 dark:bg-red-900/20 hover:bg-red-100/70 dark:hover:bg-red-900/30': !col.highlightColor && col.highlightType === 'target'
        }"
        :style="col.highlightColor ? { backgroundColor: col.highlightColor } : {}"
        @contextmenu="handleContextMenu($event, col)"
        @dblclick="handleDblClick($event, col)"
        @click="handleClick($event, col)"
        @mouseenter="handleHover(col, true)"
        @mouseleave="handleHover(col, false)"
      >
        <div
          v-if="data.connectionMode === 'reference' && data.locateColumns?.includes(col.name)"
          class="locate-ring"
        >
          <svg class="locate-ring__svg" viewBox="0 0 100 20" preserveAspectRatio="none">
            <rect class="locate-ring__rect" x="1" y="1" width="98" height="18" rx="5" ry="5" pathLength="100" />
          </svg>
        </div>
        <div v-if="data.connectionMode !== 'reference'">
            <Handle 
            :id="`${col.name}-target`"
            type="target" 
            :position="Position.Right" 
            class="!w-2 !h-2.5 !-right-[5px] !bg-blue-300 hover:!bg-blue-400 !border-none transition-all !rounded-[1px]" 
            :class="col.isConnectedTarget ? '!opacity-100' : '!opacity-0 group-hover:!opacity-100'"
            />
            <Handle 
            :id="`${col.name}-source`"
            type="source" 
            :position="Position.Right" 
            class="!w-2 !h-2.5 !-right-[5px] !bg-blue-300 hover:!bg-blue-400 !border-none transition-all !rounded-[1px]" 
            :class="col.isConnectedSource ? '!opacity-100' : '!opacity-0 group-hover:!opacity-100'"
            />
        </div>
        
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

        <div 
          v-if="data.connectionMode === 'reference' && getReferences(col.name).length" 
          class="absolute -right-[8px] top-1/2 -translate-y-1/2 z-30"
          @click.stop
        >
           <Popover
            :open="openReferencePopoverColumn === col.name"
            @update:open="(nextOpen) => {
              if (nextOpen) openReferencePopoverColumn = col.name
              else if (openReferencePopoverColumn === col.name) openReferencePopoverColumn = null
            }"
           >
            <PopoverTrigger as-child>
               <div 
                 class="flex items-center justify-center w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full shadow-sm cursor-pointer hover:bg-primary/90 hover:scale-110 transition-all border border-background"
                 :title="`${getReferences(col.name).length} connections`"
               >
                 {{ getReferences(col.name).length }}
               </div>
            </PopoverTrigger>
            <PopoverContent class="w-64 p-0" align="start" side="right">
              <div class="flex flex-col max-h-[300px] overflow-y-auto" @mouseleave="closeReferencePopover">
                 <div class="px-3 py-2 bg-muted/30 border-b border-border/40 text-xs font-semibold text-muted-foreground">
                    {{ col.name }} Connections
                 </div>
                 <div 
                   v-for="ref in getReferences(col.name)" 
                   :key="ref.edgeId"
                   class="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted/50 cursor-pointer border-b border-border/40 last:border-0 transition-colors"
                   @click="handleReferenceClick(ref)"
                 >
                    <div class="shrink-0 text-muted-foreground">
                       <ArrowRight v-if="ref.type === 'source'" class="w-3.5 h-3.5" />
                       <ArrowLeft v-else class="w-3.5 h-3.5" />
                    </div>
                    <div class="flex flex-col min-w-0 flex-1">
                      <div class="font-medium truncate text-foreground text-xs">
                         {{ ref.type === 'source' ? ref.targetTable : ref.sourceTable }}
                      </div>
                      <div class="text-[10px] text-muted-foreground truncate">
                         {{ ref.type === 'source' ? ref.targetColumn : ref.sourceColumn }}
                      </div>
                    </div>
                 </div>
              </div>
            </PopoverContent>
           </Popover>
        </div>
      </div>

      <div v-if="hiddenColumns.length > 0" class="px-3 py-2 bg-muted/30 border-t border-border/40 rounded-b-lg">
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

.locate-ring {
  position: absolute;
  inset: 2px 2px 2px 2px;
  border-radius: 6px;
  pointer-events: none;
  z-index: 10;
}

.locate-ring__svg {
  width: 100%;
  height: 100%;
  display: block;
  filter: drop-shadow(0 0 2px rgba(34, 197, 94, 0.35));
}

.locate-ring__rect {
  fill: none;
  stroke: rgba(34, 197, 94, 0.95);
  stroke-width: 2.3;
  stroke-linecap: round;
  stroke-dasharray: 14 86;
  animation: locateSnake 2.55s linear infinite;
}

@keyframes locateSnake {
  to {
    stroke-dashoffset: -100;
  }
}
</style>
