<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useI18n } from '@/composables/useI18n'
import { useRouter, useRoute } from 'vue-router'
import { 
  Search, 
  PlusCircle, 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  MoreHorizontal, 
  Plus,
  ChevronRight,
  Database,
  Table,
  Key,
  Link,
  Type,
  Hash,
  Calendar,
  ToggleLeft,
  Network,
  Settings,
  Trash2,
  Minus
} from 'lucide-vue-next'
import PgsqlSvg from '@/assets/icons/Pgsql.svg?component'
import MysqlSvg from '@/assets/icons/Mysql.svg?component'
import SqliteSvg from '@/assets/icons/sqlite.svg?component'

const props = defineProps<{
  savedConnections: any[]
  connectionStatuses: Record<number, string>
  currentConnectionId: number | null
  availableTables: string[]
  metadataTree?: any
  isTableOnCanvas: (tableName: string) => boolean
  isOpen: boolean
  addedTables?: string[]
  isRelationshipQueryOpen: boolean
  isPatternConfigOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'add-connection'): void
  (e: 'select-connection', conn: any): void
  (e: 'connection-context-menu', payload: { event: MouseEvent, conn: any }): void
  (e: 'add-table', tableName: string): void
  (e: 'remove-table', tableName: string): void
  (e: 'open-relationship-query'): void
  (e: 'open-pattern-config'): void
}>()

const onDragStart = (event: DragEvent, tableName: string) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/json', JSON.stringify({ type: 'table', tableName }))
    event.dataTransfer.effectAllowed = 'copy'
  }
}

const tableSearch = ref('')
const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const expandedConnections = ref<Record<number, boolean>>({})
const expandedNodes = ref<Record<string, boolean>>({})

const getDbIcon = (type: string | undefined | null) => {
  if (type === 'pg') return PgsqlSvg
  if (type === 'mysql' || type === 'mysql2') return MysqlSvg
  if (type === 'sqlite') return SqliteSvg
  return null
}

const filteredTables = computed(() => {
  const query = tableSearch.value.trim().toLowerCase()
  if (!query) return props.availableTables
  return props.availableTables.filter((table) => table.toLowerCase().includes(query))
})

const currentSchemas = computed<Record<string, { tables: string[] }> | null>(() => {
  const schemas = props.metadataTree?.schemas
  if (!schemas || typeof schemas !== 'object') return null
  return schemas
})

const ensureExpanded = (connId: number) => {
  if (expandedConnections.value[connId] === undefined) {
    expandedConnections.value[connId] = connId === props.currentConnectionId
  }
}

const toggleConnection = (connId: number) => {
  ensureExpanded(connId)
  expandedConnections.value[connId] = !expandedConnections.value[connId]
}

const toggleNode = (key: string, defaultValue = true) => {
  const current = isNodeOpen(key, defaultValue)
  expandedNodes.value[key] = !current
}

const isNodeOpen = (key: string, defaultValue = true) => {
  if (expandedNodes.value[key] === undefined) return defaultValue
  return !!expandedNodes.value[key]
}

const filterTableNames = (tableNames: string[]) => {
  const query = tableSearch.value.trim().toLowerCase()
  if (!query) return tableNames
  return tableNames.filter((tName) => tName.toLowerCase().includes(query))
}

const expandedTables = ref<Set<string>>(new Set())
const isAddedOpen = ref(true)
const isUnaddedOpen = ref(true)

const toggleTable = (tableName: string) => {
  if (expandedTables.value.has(tableName)) {
    expandedTables.value.delete(tableName)
  } else {
    expandedTables.value.add(tableName)
  }
}

const getColumnIcon = (column: any) => {
  if (column.isPrimaryKey) return Key
  if (column.isForeignKey) return Link
  
  const type = (column.type || '').toLowerCase()
  if (type.includes('int') || type.includes('float') || type.includes('double') || type.includes('decimal') || type.includes('numeric')) return Hash
  if (type.includes('char') || type.includes('text') || type.includes('string') || type.includes('uuid')) return Type
  if (type.includes('date') || type.includes('time') || type.includes('timestamp')) return Calendar
  if (type.includes('bool')) return ToggleLeft
  
  return Type
}

const getAddedTables = (tables: string[]) => {
  const filtered = filterTableNames(tables || [])
  if (props.addedTables) {
    // console.log('getAddedTables check:', { added: props.addedTables, tables: filtered })
    return filtered.filter(t => props.addedTables!.includes(t))
  }
  return filtered.filter(t => props.isTableOnCanvas(t))
}

const getAvailableTables = (tables: string[]) => {
  const filtered = filterTableNames(tables || [])
  if (props.addedTables) {
    return filtered.filter(t => !props.addedTables!.includes(t))
  }
  return filtered.filter(t => !props.isTableOnCanvas(t))
}
</script>

<template>
  <div 
    class="flex flex-col border-r bg-card transition-all duration-300 ease-in-out h-full relative z-20 shrink-0"
    :class="[isOpen ? 'w-72 opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-full border-r-0 overflow-hidden']"
  >
    <div class="flex flex-col h-full w-72">
      <!-- Header -->
      <div class="p-4 border-b border-border/40 flex items-center justify-between shrink-0">
        <div class="font-semibold text-sm">{{ t('sidebar.explorer') }}</div>
      </div>

      <!-- Search -->
      <div class="p-4 pt-2 border-b border-border/40 shrink-0">
        <div class="relative">
          <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input v-model="tableSearch" :placeholder="t('sidebar.searchTables')" class="pl-9 bg-muted/30 border-border/50" />
        </div>
      </div>

      <!-- Content -->
      <ScrollArea class="flex-1">
        <Accordion type="multiple" class="w-full" :default-value="['connections']">

           <!-- Connections -->
           <AccordionItem value="connections" class="border-b-0">
            <AccordionTrigger class="px-4 py-2 hover:no-underline hover:bg-muted/50 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              <div class="flex items-center justify-between w-full pr-2">
                <span>{{ t('sidebar.connections') }}</span>
                <Button variant="ghost" size="icon" class="h-6 w-6 ml-2" @click.stop="emit('add-connection')">
                  <PlusCircle class="h-4 w-4" />
                </Button>
              </div>
            </AccordionTrigger>
            <AccordionContent class="px-2 pb-2">
              <div class="space-y-1">
                <div 
                  v-for="conn in savedConnections" 
                  :key="conn.id"
                  class="rounded-md transition-colors"
                  @contextmenu.prevent="emit('connection-context-menu', { event: $event, conn })"
                >
                  <div
                    class="p-2 rounded-md text-sm cursor-pointer transition-colors relative group hover:bg-muted/50"
                    :class="currentConnectionId === conn.id ? 'text-foreground' : 'text-muted-foreground'"
                    @click="emit('select-connection', conn); toggleConnection(conn.id)"
                    @vue:mounted="ensureExpanded(conn.id)"
                  >
                    <div class="flex items-center gap-2 min-w-0 pr-6">
                      <ChevronRight
                        class="h-4 w-4 shrink-0 transition-transform duration-200 ease-out"
                        :class="expandedConnections[conn.id] ? 'rotate-90' : ''"
                      />

                      <div
                        class="w-5 h-5 flex items-center justify-center shrink-0 relative"
                      >
                        <component 
                          v-if="getDbIcon(conn.type)" 
                          :is="getDbIcon(conn.type)" 
                          class="w-full h-full"
                        />
                        <Database v-else class="w-4 h-4 text-muted-foreground" />
                        
                        <div class="absolute -bottom-1 -right-1 bg-background rounded-full p-[1px] shadow-sm">
                          <Loader2 v-if="connectionStatuses[conn.id] === 'loading'" class="w-3 h-3 animate-spin text-muted-foreground" />
                          <CheckCircle2 v-else-if="connectionStatuses[conn.id] === 'success'" class="w-3 h-3 text-green-500" />
                          <XCircle v-else-if="connectionStatuses[conn.id] === 'error'" class="w-3 h-3 text-red-500" />
                        </div>
                      </div>
                      
                      <span class="truncate font-medium flex-1">{{ conn.name || conn.database }}</span>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      class="h-6 w-6 opacity-0 group-hover:opacity-100 absolute top-1 right-1"
                      @click.stop="emit('connection-context-menu', { event: $event, conn })"
                    >
                      <MoreHorizontal class="h-3 w-3" />
                    </Button>
                  </div>

                  <Transition
                    enter-active-class="transition-all duration-200 ease-out"
                    enter-from-class="max-h-0 opacity-0"
                    enter-to-class="max-h-[1200px] opacity-100"
                    leave-active-class="transition-all duration-150 ease-in"
                    leave-from-class="max-h-[1200px] opacity-100"
                    leave-to-class="max-h-0 opacity-0"
                  >
                    <div v-show="expandedConnections[conn.id]" class="pl-6 pr-2 pb-1 overflow-hidden">
                       <div v-if="conn.id !== currentConnectionId" class="py-2 px-2 text-sm text-muted-foreground">
                        {{ t('sidebar.connectToSeeTables') }}
                      </div>
                      <div v-else-if="currentSchemas" class="space-y-1">
                        <div
                          v-for="(schema, schemaName) in currentSchemas"
                          :key="schemaName"
                          class="rounded-md"
                        >
                          <div
                            class="flex items-center gap-2 py-1.5 px-2 rounded-md cursor-pointer hover:bg-muted/50 text-sm text-muted-foreground transition-colors"
                            @click="toggleNode(`conn:${conn.id}:schema:${schemaName}`, schemaName === 'public')"
                          >
                            <ChevronRight
                              class="h-3.5 w-3.5 transition-transform duration-200 ease-out"
                              :class="isNodeOpen(`conn:${conn.id}:schema:${schemaName}`, schemaName === 'public') ? 'rotate-90' : ''"
                            />

                            <span class="truncate">{{ schemaName }}</span>
                          </div>

                          <Transition
                            enter-active-class="transition-all duration-200 ease-out"
                            enter-from-class="max-h-0 opacity-0"
                            enter-to-class="max-h-[1200px] opacity-100"
                            leave-active-class="transition-all duration-150 ease-in"
                            leave-from-class="max-h-[1200px] opacity-100"
                            leave-to-class="max-h-0 opacity-0"
                          >
                            <div v-show="isNodeOpen(`conn:${conn.id}:schema:${schemaName}`, schemaName === 'public')" class="pl-5 overflow-hidden">
                              <!-- Added Tables -->
                              <div v-if="getAddedTables(schema.tables).length > 0">
                                <div 
                                  class="px-2 py-1 text-[10px] font-semibold text-muted-foreground flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors"
                                  @click="isAddedOpen = !isAddedOpen"
                                >
                                  <ChevronRight class="w-3 h-3 transition-transform duration-200" :class="{ 'rotate-90': isAddedOpen }" />
                                  {{ t('sidebar.added') }}
                                </div>
                                <div v-show="isAddedOpen">
                                  <div
                                    v-for="tableName in getAddedTables(schema.tables)"
                                    :key="`${schemaName}:${tableName}`"
                                    class="group rounded-md text-sm flex flex-col transition-colors text-muted-foreground"
                                  >
                                    <div 
                                      class="flex items-center justify-between w-full py-1.5 px-2 hover:bg-muted/50 rounded-md transition-colors cursor-pointer"
                                      @click="toggleTable(tableName)"
                                    >
                                      <div class="flex items-center gap-2 overflow-hidden">
                                        <ChevronRight 
                                          class="w-3 h-3 transition-transform duration-200"
                                          :class="{ 'rotate-90': expandedTables.has(tableName) }"
                                        />
                                        <Table class="w-3 h-3 shrink-0" />
                                        <span class="truncate">{{ tableName }}</span>
                                      </div>
                                      
                                      <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                          class="p-1 hover:bg-destructive/10 hover:text-destructive rounded-sm transition-colors"
                                          @click.stop="emit('remove-table', tableName)"
                                          :title="t('canvas.context.deleteNode')"
                                        >
                                          <Minus class="w-3 h-3" />
                                        </button>
                                      </div>
                                    </div>
                                  
                                    <!-- Columns List -->
                                    <div v-if="expandedTables.has(tableName) && props.tablesData?.[tableName]" class="pl-5 mt-1 space-y-0.5 border-l border-border/50 ml-1.5">
                                      <div 
                                        v-for="col in props.tablesData[tableName]" 
                                        :key="col.name"
                                        class="flex items-center gap-2 text-xs py-1 text-muted-foreground relative group/col"
                                      >
                                        <div class="absolute inset-0 bg-muted/50 opacity-0 group-hover/col:opacity-100 transition-opacity rounded-sm pointer-events-none" />
                                        <component :is="getColumnIcon(col)" class="w-3 h-3 shrink-0 opacity-70 relative z-10" />
                                        <span class="truncate relative z-10">{{ col.name }}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <!-- Available Tables -->
                              <div v-if="getAvailableTables(schema.tables).length > 0">
                                <div 
                                  class="px-2 py-1 text-[10px] font-semibold text-muted-foreground flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors"
                                  :class="{'mt-2': getAddedTables(schema.tables).length > 0}"
                                  @click="isUnaddedOpen = !isUnaddedOpen"
                                >
                                  <ChevronRight class="w-3 h-3 transition-transform duration-200" :class="{ 'rotate-90': isUnaddedOpen }" />
                                  {{ t('sidebar.unadded') }}
                                </div>
                                <div v-show="isUnaddedOpen">
                                  <div
                                    v-for="tableName in getAvailableTables(schema.tables)"
                                    :key="`${schemaName}:${tableName}`"
                                    class="group flex flex-col transition-colors rounded-md text-muted-foreground"
                                    draggable="true"
                                    @dragstart="onDragStart($event, tableName)"
                                  >
                                    <div 
                                      class="py-1.5 px-2 flex items-center justify-between cursor-pointer w-full hover:bg-muted/50 rounded-md transition-colors"
                                      @click.stop="toggleTable(tableName)"
                                    >
                                      <div class="flex items-center gap-2 overflow-hidden">
                                        <ChevronRight 
                                          class="w-3 h-3 transition-transform duration-200"
                                          :class="{ 'rotate-90': expandedTables.has(tableName) }"
                                        />
                                        <Table class="w-3 h-3 shrink-0" />
                                        <span class="truncate" :title="tableName">{{ tableName }}</span>
                                      </div>
                                      
                                      <div class="flex items-center" @click.stop="emit('add-table', tableName)">
                                        <Plus class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-125" />
                                      </div>
                                    </div>

                                    <!-- Columns List -->
                                    <div v-if="expandedTables.has(tableName) && props.tablesData?.[tableName]" class="pl-7 pb-1 space-y-0.5 border-l border-border/50 ml-3.5 mb-1">
                                      <div 
                                        v-for="col in props.tablesData[tableName]" 
                                        :key="col.name"
                                        class="flex items-center gap-2 text-xs py-0.5 text-muted-foreground/70 relative group/col"
                                      >
                                        <div class="absolute inset-0 bg-muted/50 opacity-0 group-hover/col:opacity-100 transition-opacity rounded-sm pointer-events-none" />
                                        <component :is="getColumnIcon(col)" class="w-3 h-3 shrink-0 opacity-70 relative z-10" />
                                        <span class="truncate relative z-10" :title="col.name">{{ col.name }}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Transition>
                        </div>
                      </div>
                      <div v-else class="py-2 px-2 text-sm text-muted-foreground">
                        {{ t('sidebar.connectToSeeTables') }}
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

           <!-- Tools -->
           <AccordionItem value="tools" class="border-b-0">
            <AccordionTrigger class="px-4 py-2 hover:no-underline hover:bg-muted/50 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              <span>{{ t('sidebar.tools') }}</span>
            </AccordionTrigger>
            <AccordionContent class="px-2 pb-2 space-y-1">
              <Button 
                variant="ghost" 
                class="w-full justify-start gap-2 h-9 px-2 font-normal text-muted-foreground hover:text-foreground"
                :class="{ 'bg-accent text-foreground': isRelationshipQueryOpen }"
                @click="emit('open-relationship-query')"
              >
                <Search class="h-4 w-4" />
                <span>{{ t('sidebar.relationshipQuery') }}</span>
              </Button>
              <Button 
                variant="ghost" 
                class="w-full justify-start gap-2 h-9 px-2 font-normal text-muted-foreground hover:text-foreground"
                :class="{ 'bg-accent text-foreground': isPatternConfigOpen }"
                @click="emit('open-pattern-config')"
              >
                <Settings class="h-4 w-4" />
                <span>{{ t('sidebar.patternConfig') }}</span>
              </Button>

            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>
    </div>
  </div>
</template>
