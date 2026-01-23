<script setup lang="ts">
import { ref, onMounted, computed, markRaw } from 'vue'
import { VueFlow, useVueFlow, type Node, type Edge, type Connection } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import TableNode from '~/components/TableNode.vue'
import ContextMenu from '~/components/ContextMenu.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'vue-sonner'
import { 
  PlusCircle, Database, Plus, CloudUpload, Maximize, Minus, 
  RotateCw, Trash2, LogOut, Link, EyeOff 
} from 'lucide-vue-next'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

const { addNodes, toObject, fromObject, setNodes, setEdges, zoomIn, zoomOut, fitView, viewport, addEdges, removeNodes, removeEdges, findNode } = useVueFlow()
const { user, logout } = useAuth()

// Node Types
const nodeTypes = {
  table: markRaw(TableNode)
}

// State
const dbConfig = ref({
  name: '',
  type: 'pg',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '',
  database: 'postgres'
})

const isConnecting = ref(false)
const tables = ref<Record<string, any[]>>({})
const availableTables = computed(() => Object.keys(tables.value))
const savedConnections = ref<any[]>([])
const currentConnectionId = ref<number | null>(null)
const projectName = ref('')
const isSaveDialogOpen = ref(false)

// Interaction State
const contextMenu = ref({
  visible: false,
  x: 0,
  y: 0,
  items: [] as any[]
})

const connectingState = ref<{
  active: boolean
  sourceTable?: string
  sourceColumn?: string
}>({ active: false })

const cancelConnection = () => {
  connectingState.value = { active: false }
  try {
    toast.dismiss('connecting-toast')
  } catch (e) {}
}

const startConnection = (tableName: string, columnName: string) => {
  connectingState.value = {
    active: true,
    sourceTable: tableName,
    sourceColumn: columnName
  }
  toast.info('Select Target', {
    id: 'connecting-toast',
    description: `Select a column to connect to ${tableName}.${columnName}`,
    duration: Infinity,
    action: { label: 'Cancel', onClick: cancelConnection }
  })
}

const completeConnection = (targetTable: string, targetColumn: string) => {
  if (!connectingState.value.sourceTable || !connectingState.value.sourceColumn) return

  const sourceId = `table-${connectingState.value.sourceTable}`
  const targetId = `table-${targetTable}`
  
  const sourceHandle = `${connectingState.value.sourceColumn}-source`
  const targetHandle = `${targetColumn}-target`

  addEdges([{
    id: `e-${sourceId}-${sourceHandle}-${targetId}-${targetHandle}-${Date.now()}`,
    source: sourceId,
    target: targetId,
    sourceHandle,
    targetHandle,
    type: 'default',
    animated: true,
    style: { stroke: '#b1b1b7', strokeWidth: 2 },
  }])

  toast.success('Connected')
  cancelConnection()
}

const onCollapse = ({ tableName, isCollapsed }: { tableName: string, isCollapsed: boolean }) => {
  const node = findNode(`table-${tableName}`)
  if (node) {
    node.data.isCollapsed = isCollapsed
  }
}

const onToggleHidden = ({ tableName, columnName, isHidden }: { tableName: string, columnName: string, isHidden: boolean }) => {
  const node = findNode(`table-${tableName}`)
  if (node) {
    const col = node.data.columns.find((c: any) => c.name === columnName)
    if (col) {
      col.isHidden = isHidden
    }
  }
}

const onColumnContextMenu = ({ event, column, tableName }: any) => {
  contextMenu.value = {
    visible: true,
    x: event.clientX,
    y: event.clientY,
    items: [
      { 
        label: 'Connect', 
        icon: Link, 
        action: () => startConnection(tableName, column.name) 
      },
      {
        label: column.isHidden ? 'Show Column' : 'Hide Column',
        icon: EyeOff,
        action: () => onToggleHidden({ tableName, columnName: column.name, isHidden: !column.isHidden })
      }
    ]
  }
}

const onColumnDblClick = ({ event, column, tableName }: any) => {
  // Show context menu on double click as requested by user implication
  onColumnContextMenu({ event, column, tableName })
}

const onColumnClick = ({ event, column, tableName }: any) => {
  if (connectingState.value.active) {
    completeConnection(tableName, column.name)
  }
}

// Methods
const fetchConnections = async () => {
  try {
    const { data } = await $fetch('/api/connections')
    savedConnections.value = data || []
  } catch (error) {
    console.error('Failed to fetch connections', error)
  }
}

const selectConnection = (conn: any) => {
  dbConfig.value = { ...conn }
  currentConnectionId.value = conn.id
  connectDB()
}

const connectDB = async () => {
  isConnecting.value = true
  try {
    const { data } = await $fetch('/api/metadata', {
      method: 'POST',
      body: dbConfig.value
    })
    tables.value = data
    toast.success('Database connected')
    
    // Auto-save connection if it's new
    if (!currentConnectionId.value) {
      const saveRes = await $fetch('/api/connections', {
        method: 'POST',
        body: dbConfig.value
      })
      if (saveRes.success) {
        currentConnectionId.value = saveRes.data.id
        fetchConnections()
      }
    }
  } catch (error: any) {
    toast.error('Error', { description: error.message })
  } finally {
    isConnecting.value = false
  }
}

const addTableToCanvas = (tableName: string) => {
  const tableId = `table-${tableName}`
  if (useVueFlow().nodes.value.some(n => n.id === tableId)) {
    toast.info('Info', { description: 'Table already on canvas' })
    return
  }
  
  const columns = tables.value[tableName]
  
  const newNode: Node = {
    id: tableId,
    type: 'table',
    position: { x: Math.random() * 200 + 100, y: Math.random() * 200 + 100 },
    data: { 
      label: tableName,
      columns: columns.map(c => ({
        name: c.name,
        type: c.type,
        isPrimaryKey: c.isPrimaryKey,
        isForeignKey: c.isForeignKey,
        nullable: c.nullable,
        isHidden: false
      })),
      isCollapsed: false,
      onContextMenu: onColumnContextMenu,
      onDblClick: onColumnDblClick,
      onClick: onColumnClick,
      onCollapse: onCollapse,
      onToggleHidden: onToggleHidden
    }
  }
  addNodes([newNode])
}

const onConnect = (params: Connection) => {
   addEdges([params])
 }

const openSaveDialog = () => {
  if (!projectName.value) {
    projectName.value = `Design ${new Date().toLocaleDateString()}`
  }
  isSaveDialogOpen.value = true
}

const saveCanvas = async () => {
  isSaveDialogOpen.value = false
  const flowData = toObject()
  try {
    await $fetch('/api/canvas', {
      method: 'POST',
      body: {
        name: projectName.value,
        data: flowData,
        connectionId: currentConnectionId.value
      }
    })
    toast.success('Saved', { description: 'Canvas and connections saved' })
  } catch (error) {
    toast.error('Error', { description: 'Failed to save' })
  }
}

const clearCanvas = () => {
  setNodes([])
  setEdges([])
  toast.info('Canvas Cleared')
}

const loadCanvas = async () => {
  try {
    const { data } = await $fetch('/api/canvas')
    if (data && data.data) {
      fromObject(data.data)
      if (data.connectionId) {
        currentConnectionId.value = data.connectionId
        const conn = savedConnections.value.find(c => c.id === data.connectionId)
        if (conn) {
          dbConfig.value = { ...conn }
          // Re-connect to get available tables for the sidebar
          await connectDB()
        }
      }
      toast.success('Project Loaded')
    }
  } catch (error) {
    console.error(error)
    toast.warning('Load Error', { description: 'No saved project found' })
  }
}

onMounted(async () => {
  await fetchConnections()
  await loadCanvas()
})
</script>

<template>
  <div class="flex h-full w-full bg-gray-100">
    <!-- Left Sidebar -->
    <div class="w-72 border-r bg-white flex flex-col shrink-0 shadow-sm z-20">
      <!-- Tabs or Sections -->
      <div class="flex-1 overflow-y-auto custom-scrollbar">
        <!-- Connections Section -->
        <div class="p-4 border-b">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider">Connections</h3>
            <Popover>
              <PopoverTrigger as-child>
                <Button variant="ghost" size="icon" class="h-6 w-6">
                  <PlusCircle class="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-72 p-4">
                <div class="space-y-3">
                  <h4 class="font-bold text-sm">New Connection</h4>
                  <Input v-model="dbConfig.name" placeholder="Connection Name" class="h-8" />
                  <Select v-model="dbConfig.type">
                    <SelectTrigger class="h-8">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pg">pg</SelectItem>
                      <SelectItem value="mysql2">mysql2</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input v-model="dbConfig.host" placeholder="Host" class="h-8" />
                  <Input v-model="dbConfig.port" placeholder="Port" type="number" class="h-8" />
                  <Input v-model="dbConfig.user" placeholder="User" class="h-8" />
                  <Input v-model="dbConfig.password" placeholder="Password" type="password" class="h-8" />
                  <Input v-model="dbConfig.database" placeholder="Database" class="h-8" />
                  <Button @click="connectDB" :disabled="isConnecting" class="w-full h-8">
                    {{ isConnecting ? 'Connecting...' : 'Connect & Save' }}
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          <div class="space-y-1">
            <div 
              v-for="conn in savedConnections" 
              :key="conn.id"
              class="p-2 rounded-md text-sm cursor-pointer flex items-center gap-2 transition-colors"
              :class="currentConnectionId === conn.id ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'hover:bg-gray-50 text-gray-600'"
              @click="selectConnection(conn)"
            >
              <Database class="w-4 h-4 opacity-70" />
              <span class="truncate font-medium">{{ conn.name || conn.database }}</span>
            </div>
          </div>
        </div>

        <!-- Tables Section -->
        <div class="p-4">
          <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Tables</h3>
          <div v-if="availableTables.length === 0" class="text-gray-400 text-xs italic py-4 text-center">
            Connect to a database to see tables
          </div>
          <div v-else class="space-y-1">
            <div 
              v-for="table in availableTables" 
              :key="table"
              class="group p-2 bg-white border border-gray-100 rounded-md shadow-sm cursor-pointer hover:border-blue-300 hover:shadow-md transition-all flex justify-between items-center"
              @click="addTableToCanvas(table)"
            >
              <span class="text-sm text-gray-700 truncate font-medium">{{ table }}</span>
              <Plus class="w-3 h-3 text-gray-400 group-hover:text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="p-4 border-t bg-gray-50">
        <Button @click="openSaveDialog" class="w-full bg-black hover:bg-gray-800 text-white">
          <CloudUpload class="mr-2 h-4 w-4" />
          Save Project
        </Button>
      </div>
    </div>

    <!-- Main Canvas -->
    <div class="flex-1 h-full relative overflow-hidden bg-[#f8f9fa]">
      <ContextMenu 
        :visible="contextMenu.visible" 
        :x="contextMenu.x" 
        :y="contextMenu.y" 
        :items="contextMenu.items" 
        @close="contextMenu.visible = false" 
      />

      <Dialog :open="isSaveDialogOpen" @update:open="isSaveDialogOpen = $event">
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Save Project</DialogTitle>
            <DialogDescription>
              Give your database diagram a name.
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="name" class="text-right">
                Name
              </Label>
              <Input
                id="name"
                v-model="projectName"
                class="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button @click="saveCanvas">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <VueFlow 
        :node-types="nodeTypes"
        :default-viewport="{ zoom: 0.8 }"
        :min-zoom="0.2"
        :max-zoom="4"
        @connect="onConnect"
      >
        <Background pattern-color="#e2e8f0" :gap="20" />
        
        <!-- User Controls (Top Right) -->
        <div class="absolute top-4 right-4 flex gap-2 z-10">
          <div class="bg-white p-1 rounded-lg shadow-sm border border-gray-200 flex items-center gap-2 px-3 py-1.5">
             <div class="flex flex-col items-end mr-2">
               <span class="text-xs font-bold text-gray-700">{{ user?.name || user?.email }}</span>
               <span class="text-[10px] text-gray-500">Free Plan</span>
             </div>
             <Button @click="logout" variant="ghost" size="icon" class="h-6 w-6" title="Logout">
               <LogOut class="h-4 w-4" />
             </Button>
          </div>
        </div>

        <!-- Custom Azimutt-style Controls (Bottom Right) -->
        <div class="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
          <div class="flex items-center shadow-sm rounded-md overflow-hidden border border-gray-300 bg-white">
            <Button 
              @click="fitView" 
              variant="ghost" 
              size="icon"
              class="h-8 w-8 rounded-none border-r border-gray-200"
              title="Fit diagram to screen"
            >
              <Maximize class="h-4 w-4" />
            </Button>
            <Button 
              @click="zoomOut" 
              variant="ghost" 
              size="icon"
              class="h-8 w-8 rounded-none border-r border-gray-200"
              title="Zoom out"
            >
              <Minus class="h-4 w-4" />
            </Button>
            <div class="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-50 border-r border-gray-200 min-w-[60px] text-center flex items-center justify-center h-8">
              {{ Math.round((viewport.zoom || 0) * 100) }}%
            </div>
            <Button 
              @click="zoomIn" 
              variant="ghost" 
              size="icon"
              class="h-8 w-8 rounded-none"
              title="Zoom in"
            >
              <Plus class="h-4 w-4" />
            </Button>
          </div>
        </div>

        <!-- Extra Toolbar (Top Left) -->
        <div class="absolute top-4 left-4 flex gap-2 z-10">
          <div class="bg-white p-1 rounded-lg shadow-sm border border-gray-200 flex gap-1 items-center">
             <Button @click="loadCanvas" variant="ghost" size="icon" class="h-6 w-6" title="Reload Project">
               <RotateCw class="h-3.5 w-3.5" />
             </Button>
             <Button @click="clearCanvas" variant="ghost" size="icon" class="h-6 w-6" title="Clear Canvas">
               <Trash2 class="h-3.5 w-3.5" />
             </Button>
             <div class="w-px h-4 bg-gray-200 my-auto mx-1"></div>
             <Button @click="openSaveDialog" size="sm" class="h-6 px-2 text-xs bg-black hover:bg-gray-800 text-white">
               <CloudUpload class="mr-1 h-3.5 w-3.5" /> Save
             </Button>
          </div>
        </div>
      </VueFlow>
    </div>
  </div>
</template>

<style>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}

/* Vue Flow overrides for cleaner look */
.vue-flow__node-table {
  padding: 0 !important;
  border: none !important;
  background: transparent !important;
}
.vue-flow__edge-path {
  stroke: #94a3b8;
  stroke-width: 2;
}
.vue-flow__controls {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  border: 1px solid #e2e8f0;
}
</style>
