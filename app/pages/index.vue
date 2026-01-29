<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, markRaw, watch, nextTick } from 'vue'
import { VueFlow, useVueFlow, type Node, type Edge, type Connection } from '@vue-flow/core'
import dagre from 'dagre'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import TableNode from '@/components/TableNode.vue'
import NoteNode from '@/components/NoteNode.vue'
import ContextMenu from '@/components/ContextMenu.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import CanvasSidebar from '@/components/layout/CanvasSidebar.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'vue-sonner'
import { 
  Plus, CloudUpload, Maximize, Minus, 
  Trash2, Link, EyeOff, FileCode,
  Loader2, Pencil, Activity,
  History, LayoutGrid, Undo2, Redo2, Hand, MousePointer2, PanelLeftOpen, PanelLeftClose
} from 'lucide-vue-next'
import { generateSQL } from '@/utils/sqlGenerator'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useDebounceFn } from '@vueuse/core'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/composables/useAuth'
import { useI18n } from '@/composables/useI18n'

const { nodes, edges, addNodes, toObject, fromObject, setNodes, setEdges, zoomIn, zoomOut, fitView, viewport, setViewport, addEdges, removeNodes, removeEdges, findNode, onPaneReady, onNodesChange, onEdgesChange, onPaneMouseMove, screenToFlowCoordinate, onPaneClick, onNodeContextMenu, onEdgeContextMenu, onPaneContextMenu, onMoveEnd, onEdgeDoubleClick } = useVueFlow()
const { user, logout } = useAuth()
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const projectId = computed(() => route.query.projectId ? parseInt(String(route.query.projectId)) : null)
const project = ref<any>(null)
const canvasId = ref<number | null>(null)
const isFlowReady = ref(false)
const pendingCanvasData = ref<any>(null)
const isAutoSaving = ref(false)
const lastSaved = ref<Date | null>(null)
const isDraft = ref(false)
const isDraftDirty = ref(false)
const isExitDraftDialogOpen = ref(false)
const pendingNavigation = ref<any>(null)
const allowNavigationOnce = ref(false)
const isRestoringCanvas = ref(false)

// Layout State
const isAppSidebarCollapsed = ref(false)
const isCanvasSidebarOpen = ref(true)
const interactionMode = ref<'pointer' | 'hand'>('pointer')

const historyStack = ref<any[]>([])
const redoStack = ref<any[]>([])
const isApplyingHistory = ref(false)
const canUndo = computed(() => historyStack.value.length > 1)
const canRedo = computed(() => redoStack.value.length > 0)

// Version Control
const isHistoryDialogOpen = ref(false)
const versions = ref<any[]>([])
const isLoadingVersions = ref(false)

// User Settings
const isSettingsDialogOpen = ref(false)
const userForm = ref({
  name: '',
  avatar: ''
})

onPaneReady(() => {
  isFlowReady.value = true
  if (pendingCanvasData.value) {
    isRestoringCanvas.value = true
    fromObject(pendingCanvasData.value)
    hydrateTableNodes()
    applyEdgeDefaults()
    isRestoringCanvas.value = false
    
    // Explicitly restore viewport if present
    if (pendingCanvasData.value.viewport) {
      setViewport(pendingCanvasData.value.viewport)
    } else if (typeof pendingCanvasData.value.zoom !== 'undefined' && pendingCanvasData.value.position) {
      // Backwards compatibility for older saves
      setViewport({ x: pendingCanvasData.value.position[0], y: pendingCanvasData.value.position[1], zoom: pendingCanvasData.value.zoom })
    } else {
      setTimeout(() => fitView(), 100)
    }
    
    pendingCanvasData.value = null
  }
  nextTick(() => resetHistory())

  // Add keyboard listener for delete
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

const handleKeyDown = (e: KeyboardEvent) => {
  if (['Delete', 'Backspace'].includes(e.key)) {
    // Avoid deleting when typing in inputs
    if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return
    
    const selectedNodes = nodes.value.filter(n => n.selected)
    const selectedEdges = edges.value.filter(e => e.selected)
    
    if (selectedNodes.length > 0) {
      removeNodes(selectedNodes.map(n => n.id))
    }
    
    if (selectedEdges.length > 0) {
      removeEdges(selectedEdges.map(e => e.id))
    }
  }
}

onPaneMouseMove((event) => {
  if (connectingState.value.active) {
    const mouseNode = findNode('mouse-node')
    if (mouseNode) {
      const position = screenToFlowCoordinate({ x: event.clientX, y: event.clientY })
      mouseNode.position = position
    }
  }
})

onPaneClick(() => {
  if (connectingState.value.active) {
    cancelConnection()
  }
  // Ensure edges are reset when clicking pane (deselecting)
  nextTick(() => {
    updateEdgeHighlights()
  })
})

// Node Types
const nodeTypes: any = {
  table: markRaw(TableNode as any),
  note: markRaw(NoteNode as any),
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
const metadataTree = ref<any>(null)
// tableSearch is handled in CanvasSidebar now, but we keep the logic for tables filtering if needed elsewhere? 
// Actually CanvasSidebar handles search UI. tables filtering is only for display in sidebar.
// But we need 'tables' populated for addTableToCanvas.

const tableOnCanvasSet = computed(() => {
  const set = new Set<string>()
  nodes.value.forEach((node) => {
    if (node.type === 'table' && node.data?.label) {
      set.add(String(node.data.label))
    }
  })
  return set
})
const addedTableNames = computed(() => Array.from(tableOnCanvasSet.value))
const isTableOnCanvas = (tableName: string) => tableOnCanvasSet.value.has(tableName)
const savedConnections = ref<any[]>([])
const currentConnectionId = ref<number | null>(null)
const connectionStatuses = ref<Record<number, 'success' | 'error' | 'loading'>>({})
const projectName = ref('')
const isSaveDialogOpen = ref(false)
const isConnectionDialogOpen = ref(false)
const editingConnection = ref<any>(null)
const hoveredForeignKey = ref<{ tableName: string; columnName: string } | null>(null)
let isUpdatingEdgeStyles = false

const normalizeEdge = (edge: Edge) => ({
  ...edge,
  type: edge.type || 'default',
  animated: false,
  class: edge.class || 'edge-muted',
  style: {
    ...(edge.style || {}),
    strokeWidth: 2,
  },
})

const applyEdgeDefaults = () => {
  setEdges((edges) => edges.map((edge) => normalizeEdge(edge)))
}

const updateEdgeHighlights = () => {
  if (isUpdatingEdgeStyles) return
  isUpdatingEdgeStyles = true
  const hovered = hoveredForeignKey.value
  const selectedNodeIds = new Set(nodes.value.filter((node) => node.selected).map((node) => node.id))
  setEdges((edges) =>
    edges.map((edge) => {
      const isHoverMatch = hovered
        ? (edge.source === `table-${hovered.tableName}` && edge.sourceHandle === `${hovered.columnName}-source`) ||
          (edge.target === `table-${hovered.tableName}` && edge.targetHandle === `${hovered.columnName}-target`)
        : false
      // Only highlight on hover, not on selection
      const isSelectedMatch = false 
      const nextClass = isHoverMatch || isSelectedMatch ? 'edge-active' : 'edge-muted'
      const currentStrokeWidth =
        typeof edge.style === 'object' && edge.style && 'strokeWidth' in edge.style
          ? (edge.style as any).strokeWidth
          : undefined
      if (edge.class === nextClass && edge.type && currentStrokeWidth === 2) return edge
      return {
        ...edge,
        class: nextClass,
        type: edge.type || 'default',
        animated: false,
        style: {
          ...(edge.style || {}),
          strokeWidth: 2,
        },
      }
    })
  )
  isUpdatingEdgeStyles = false
}

const hydrateTableNodes = () => {
  setNodes((nodes) =>
    nodes.map((node) => {
      if (node.type !== 'table') return node
      return {
        ...node,
        data: {
          ...node.data,
          onContextMenu: onColumnContextMenu,
          onDblClick: onColumnDblClick,
          onClick: onColumnClick,
          onCollapse: onCollapse,
          onToggleHidden: onToggleHidden,
          onHover: onColumnHover,
        },
      }
    })
  )
}

// Watch DB Type to set defaults
watch(() => dbConfig.value.type, (newType) => {
  if (editingConnection.value) return // Don't override if editing
  
  if (newType === 'pg') {
    if (dbConfig.value.port === 3306) dbConfig.value.port = 5432
    if (dbConfig.value.user === 'root') dbConfig.value.user = 'postgres'
    if (dbConfig.value.database === 'mysql') dbConfig.value.database = 'postgres'
  } else if (newType === 'mysql2') {
    if (dbConfig.value.port === 5432) dbConfig.value.port = 3306
    if (dbConfig.value.user === 'postgres') dbConfig.value.user = 'root'
    if (dbConfig.value.database === 'postgres') dbConfig.value.database = 'mysql'
  }
})

const checkConnectionStatus = async (conn: any) => {
  connectionStatuses.value[conn.id] = 'loading'
  try {
    const headers = useRequestHeaders(['cookie'])
    const res: any = await $fetch('/api/connections/test', {
      method: 'POST',
      body: { id: conn.id },
      headers
    })
    if (res.success) {
      connectionStatuses.value[conn.id] = 'success'
    } else {
      connectionStatuses.value[conn.id] = 'error'
    }
  } catch (e) {
    connectionStatuses.value[conn.id] = 'error'
  }
}

// Load Project Data
const loadProject = async () => {
  if (!projectId.value) return
  
  try {
    const headers = useRequestHeaders(['cookie'])
    // 1. Load Connections
    const connRes: any = await $fetch(`/api/connections?projectId=${projectId.value}`, { headers })
    if (connRes.success) {
      savedConnections.value = connRes.data
      // Auto-check connection status
      savedConnections.value.forEach(conn => checkConnectionStatus(conn))
      if (import.meta.client && savedConnections.value.length > 0) {
        const storedConnectionIdRaw = localStorage.getItem(`lastConnectionId:${projectId.value}`)
        const storedConnectionId = storedConnectionIdRaw ? Number(storedConnectionIdRaw) : null

        const stored = storedConnectionId
          ? savedConnections.value.find((c) => c.id === storedConnectionId)
          : undefined
        const existing = currentConnectionId.value
          ? savedConnections.value.find((c) => c.id === currentConnectionId.value)
          : undefined

        const defaultConn = stored || existing || savedConnections.value[0]
        if (defaultConn) {
          if (defaultConn.id !== currentConnectionId.value || !tables.value || Object.keys(tables.value).length === 0) {
            currentConnectionId.value = defaultConn.id
            dbConfig.value = { ...defaultConn }
            await connectDB()
          }
        }
      }
    }

    // 2. Load Canvas
    const canvasRes: any = await $fetch(`/api/canvas?projectId=${projectId.value}`, { headers })
    if (canvasRes.success && canvasRes.data) {
      canvasId.value = canvasRes.data.id // Store canvas ID
      if (canvasRes.data.data) {
        if (isFlowReady.value) {
          isRestoringCanvas.value = true
          fromObject(canvasRes.data.data)
          hydrateTableNodes()
          applyEdgeDefaults()
          isRestoringCanvas.value = false
          nextTick(() => resetHistory())
          // Only fit view if no viewport data is present (backwards compatibility)
          if (!canvasRes.data.data.viewport && typeof canvasRes.data.data.zoom === 'undefined') {
            setTimeout(() => fitView(), 100)
          }
        } else {
          pendingCanvasData.value = canvasRes.data.data
        }
      }
    }
  } catch (error) {
    console.error('Failed to load project data', error)
    toast.error(t('toast.loadProjectFailed'))
  }
}

const resetHistory = () => {
  historyStack.value = [toObject()]
  redoStack.value = []
}

const captureSnapshot = () => {
  if (isRestoringCanvas.value || isApplyingHistory.value) return
  historyStack.value.push(toObject())
  if (historyStack.value.length > 50) {
    historyStack.value.shift()
  }
  redoStack.value = []
}

const scheduleSnapshot = useDebounceFn(() => {
  if (isApplyingHistory.value) return
  captureSnapshot()
}, 200)

const undo = () => {
  if (historyStack.value.length <= 1) return
  const current = historyStack.value.pop()
  if (current) redoStack.value.push(current)
  const previous = historyStack.value[historyStack.value.length - 1]
  if (!previous) return
  isApplyingHistory.value = true
  fromObject(previous)
  hydrateTableNodes()
  applyEdgeDefaults()
  nextTick(() => {
    isApplyingHistory.value = false
  })
}

const redo = () => {
  if (redoStack.value.length === 0) return
  const nextState = redoStack.value.pop()
  if (!nextState) return
  historyStack.value.push(nextState)
  isApplyingHistory.value = true
  fromObject(nextState)
  hydrateTableNodes()
  applyEdgeDefaults()
  nextTick(() => {
    isApplyingHistory.value = false
  })
}

const organizeNodes = () => {
  if (!nodes.value.length) return
  
  const g = new dagre.graphlib.Graph()
  g.setGraph({ rankdir: 'LR', align: 'DL', nodesep: 50, ranksep: 100 })
  g.setDefaultEdgeLabel(() => ({}))

  nodes.value.forEach((node) => {
    const width = node.dimensions?.width || 250
    const height = node.dimensions?.height || 300
    g.setNode(node.id, { width, height })
  })

  edges.value.forEach((edge) => {
    g.setEdge(edge.source, edge.target)
  })

  dagre.layout(g)

  setNodes((current) =>
    current.map((node) => {
      const pos = g.node(node.id)
      if (!pos) return node
      return {
        ...node,
        position: { 
          x: pos.x - (node.dimensions?.width || 250) / 2,
          y: pos.y - (node.dimensions?.height || 300) / 2
        }
      }
    })
  )
  
  nextTick(() => {
    fitView({ padding: 0.2 })
    captureSnapshot()
  })
}

// Auto Save Logic
const autoSave = useDebounceFn(async () => {
  if (!projectId.value) return
  if (isDraft.value) return
  if (isRestoringCanvas.value) return
  
  isAutoSaving.value = true
  try {
    const flowData = toObject()
    const res: any = await $fetch('/api/canvas', {
      method: 'PUT',
      body: {
        id: canvasId.value,
        data: flowData,
        projectId: projectId.value
      }
    })
    if (res.success) {
      canvasId.value = res.data.id
      lastSaved.value = new Date()
    }
  } catch (e) {
    console.error('Auto save failed', e)
  } finally {
    isAutoSaving.value = false
  }
}, 1000)

// Watch for changes to trigger auto-save
onNodesChange((changes) => {
  const hasSelectionChange = changes.some((c) => c.type === 'select')
  if (hasSelectionChange) {
    updateEdgeHighlights()
  }
  const hasStructuralChange = changes.some((c) => c.type !== 'select')
  if (hasStructuralChange) {
    scheduleSnapshot()
  }

  if (isRestoringCanvas.value) return
  if (isDraft.value) {
    isDraftDirty.value = true
    return
  }
  autoSave()
})
onEdgesChange((changes) => {
  const hasStructuralChange = changes.some((c) => c.type !== 'select')
  if (hasStructuralChange) {
    scheduleSnapshot()
  }
  if (isRestoringCanvas.value) return
  if (isDraft.value) {
    isDraftDirty.value = true
    return
  }
  autoSave()
})
onMoveEnd(() => {
  if (isRestoringCanvas.value) return
  if (isDraft.value) {
    // Draft mode might not care about viewport, but let's consistency check
    // Actually viewport changes shouldn't mark draft as dirty usually? 
    // But if we want to save view state in draft, yes.
    // However, user usually cares about content changes for draft.
    // Let's just autoSave if not draft.
    return
  }
  autoSave()
})
// Note: onConnect is a specific event, need to wrap it or watch edges
const onConnect = (params: Connection) => {
  addEdges([params])
  scheduleSnapshot()
  if (isDraft.value) {
    isDraftDirty.value = true
    return
  }
  autoSave()
}

// Save Version (Manual Save)
const saveCanvas = async () => {
  if (!projectId.value) {
    toast.error(t('toast.noProjectSelected'))
    return false
  }
  
  try {
    const flowData = toObject()
    
    // First update current state (Temp version)
    await $fetch('/api/canvas', {
      method: 'PUT',
      body: {
        id: canvasId.value,
        data: flowData,
        projectId: projectId.value
      }
    })

    // Then create version
    await $fetch('/api/canvas/versions', {
      method: 'POST',
      body: {
        canvasId: canvasId.value,
        name: projectName.value || undefined, // Dialog input
        data: flowData
      }
    })
    
    toast.success(t('toast.versionSaved'))
    isSaveDialogOpen.value = false
    lastSaved.value = new Date()
    isDraft.value = false
    isDraftDirty.value = false
    return true
  } catch (error) {
    toast.error(t('toast.saveVersionFailed'))
    return false
  }
}

// Version History
const loadVersions = async () => {
  if (!canvasId.value) return
  isLoadingVersions.value = true
  try {
    const res: any = await $fetch(`/api/canvas/versions?canvasId=${canvasId.value}`)
    if (res.success) {
      versions.value = res.data
    }
  } catch (e) {
    toast.error(t('toast.loadVersionsFailed'))
  } finally {
    isLoadingVersions.value = false
  }
}

const restoreVersion = async (versionId: number) => {
  if (!confirm(t('draft.restoreConfirm'))) return
  
  try {
    const res: any = await $fetch(`/api/canvas/version?id=${versionId}`)
    if (res.success && res.data.data) {
      cancelConnection()
      isRestoringCanvas.value = true
      fromObject(res.data.data)
      hydrateTableNodes()
      applyEdgeDefaults()
      isRestoringCanvas.value = false
      isDraft.value = true
      isDraftDirty.value = false
      toast.success(t('draft.restored'))
      isHistoryDialogOpen.value = false
    }
  } catch (e) {
    toast.error(t('toast.restoreVersionFailed'))
  }
}

const openHistoryDialog = () => {
  loadVersions()
  isHistoryDialogOpen.value = true
}

const tryNavigateAway = (to: any) => {
  if (allowNavigationOnce.value) {
    allowNavigationOnce.value = false
    return true
  }

  if (isDraft.value && isDraftDirty.value) {
    pendingNavigation.value = to
    isExitDraftDialogOpen.value = true
    return false
  }

  return true
}

onBeforeRouteLeave((to: any) => {
  return tryNavigateAway(to)
})

onBeforeRouteUpdate((to: any) => {
  return tryNavigateAway(to)
})

const confirmExitSave = async () => {
  const ok = await saveCanvas()
  if (!ok) return

  isExitDraftDialogOpen.value = false
  isDraft.value = false
  isDraftDirty.value = false
  if (pendingNavigation.value) {
    allowNavigationOnce.value = true
    const to = pendingNavigation.value
    pendingNavigation.value = null
    router.push(to.fullPath)
  }
}

const confirmExitDiscard = () => {
  isExitDraftDialogOpen.value = false
  isDraft.value = false
  isDraftDirty.value = false
  if (pendingNavigation.value) {
    allowNavigationOnce.value = true
    const to = pendingNavigation.value
    pendingNavigation.value = null
    router.push(to.fullPath)
  }
}

const cancelExitPrompt = () => {
  isExitDraftDialogOpen.value = false
  pendingNavigation.value = null
}

// User Profile
const openSettingsDialog = () => {
  if (user.value) {
    userForm.value = {
      name: user.value.name || '',
      avatar: user.value.avatar || ''
    }
  }
  isSettingsDialogOpen.value = true
}

const saveProfile = async () => {
  try {
    const res: any = await $fetch('/api/user/profile', {
      method: 'PUT',
      body: userForm.value
    })
    if (res.success) {
      toast.success(t('toast.profileUpdated'))
      isSettingsDialogOpen.value = false
      location.reload()
    }
  } catch (e) {
    toast.error(t('toast.profileUpdateFailed'))
  }
}

// Watch for projectId changes
watch(() => projectId.value, (newId) => {
  if (newId) {
    loadProject()
    // Persist last opened project
    if (import.meta.client) {
      localStorage.setItem('lastProjectId', String(newId))
    }
  } else if (import.meta.client) {
    // Check local storage for last opened project
    const lastId = localStorage.getItem('lastProjectId')
    if (lastId) {
      router.replace(`/?projectId=${lastId}`)
    } else {
      // Redirect to projects page if no project ID and no history
      router.push('/projects')
    }
  }
}, { immediate: true })

// Interaction State
const contextMenu = ref({
  visible: false,
  x: 0,
  y: 0,
  items: [] as any[]
})

const connectionContextMenu = ref({
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
  
  removeNodes(['mouse-node'])
  removeEdges(['temp-connection-edge'])

  try {
    toast.dismiss('connecting-toast')
  } catch (e) {}
}

const addNoteAtClientPoint = (clientX: number, clientY: number) => {
  const position = screenToFlowCoordinate({ x: clientX, y: clientY })
  const id = `note-${Date.now()}`

  const newNode: Node = {
    id,
    type: 'note',
    position,
    data: {
      text: '',
    },
  }

  addNodes([newNode])
}

onEdgeDoubleClick(({ edge }) => {
  if (edge) {
    edge.selected = true
  }
})

onEdgeContextMenu(({ event, edge }: any) => {
  if (!event || !edge) return
  if (edge.id === 'temp-connection-edge') return
  event.preventDefault()

  connectionContextMenu.value.visible = false
  contextMenu.value = {
    visible: true,
    x: (event as MouseEvent).clientX,
    y: (event as MouseEvent).clientY,
    items: [
      {
        label: t('canvas.context.deleteConnection'),
        icon: Trash2,
        action: () => removeEdges([edge.id]),
      },
    ],
  }
})

onNodeContextMenu(({ event, node }: any) => {
  if (!event || !node) return
  event.preventDefault()

  // Find all selected nodes
  const selectedNodes = nodes.value.filter(n => n.selected)
  const isTargetSelected = node.selected || selectedNodes.some(n => n.id === node.id)
  
  // If we right-click a selected node and there are other selected nodes, we delete all of them
  const nodesToDelete = isTargetSelected && selectedNodes.length > 1 
    ? selectedNodes.map(n => n.id)
    : [node.id]

  connectionContextMenu.value.visible = false
  contextMenu.value = {
    visible: true,
    x: (event as MouseEvent).clientX,
    y: (event as MouseEvent).clientY,
    items: [
      {
        label: nodesToDelete.length > 1 ? t('canvas.context.deleteSelectedNodes') : t('canvas.context.deleteNode'),
        icon: Trash2,
        action: () => removeNodes(nodesToDelete, true),
      },
    ],
  }
})

onPaneContextMenu((event: any) => {
  if (!event) return
  event.preventDefault()

  const selectedNodes = nodes.value.filter(n => n.selected)
  const selectedEdges = edges.value.filter(e => e.selected)

  const items: any[] = []

  if (selectedNodes.length > 0 || selectedEdges.length > 0) {
    items.push({
      label: t('canvas.context.deleteSelection'),
      icon: Trash2,
      action: () => {
        if (selectedNodes.length > 0) {
          removeNodes(selectedNodes.map(n => n.id))
        }
        if (selectedEdges.length > 0) {
          removeEdges(selectedEdges.map(e => e.id))
        }
      },
    })
  }

  items.push({
    label: t('canvas.context.addNote'),
    icon: Pencil,
    action: () => addNoteAtClientPoint((event as MouseEvent).clientX, (event as MouseEvent).clientY),
  })

  connectionContextMenu.value.visible = false
  contextMenu.value = {
    visible: true,
    x: (event as MouseEvent).clientX,
    y: (event as MouseEvent).clientY,
    items,
  }
})

const startConnection = (tableName: string, columnName: string) => {
  if (connectingState.value.active) {
    cancelConnection()
  }
  
  connectingState.value = {
    active: true,
    sourceTable: tableName,
    sourceColumn: columnName
  }

  // Add temporary mouse node and edge
  const mouseNodeId = 'mouse-node'
  const tempEdgeId = 'temp-connection-edge'
  const sourceId = `table-${tableName}`
  const sourceHandle = `${columnName}-source`

  addNodes([{
    id: mouseNodeId,
    type: 'default',
    position: { x: 0, y: 0 },
    style: { opacity: 0, width: '1px', height: '1px', pointerEvents: 'none' },
    data: { label: '' }
  }])

  addEdges([{
    id: tempEdgeId,
    source: sourceId,
    sourceHandle: sourceHandle,
    target: mouseNodeId,
    animated: true,
    style: { stroke: '#b1b1b7', strokeWidth: 2, strokeDasharray: '5,5' },
  }])

  toast.info(t('toast.selectTargetTitle'), {
    id: 'connecting-toast',
    description: t('toast.selectTargetDesc', { target: `${tableName}.${columnName}` }),
    duration: Infinity,
    action: { label: t('draft.cancel'), onClick: cancelConnection }
  })
}

const completeConnection = (targetTable: string, targetColumn: string) => {
  if (!connectingState.value.sourceTable || !connectingState.value.sourceColumn) return

  // Prevent connecting to the same table
  if (connectingState.value.sourceTable === targetTable) {
    toast.error(t('toast.connectSameTableDenied'))
    return
  }

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

  toast.success(t('toast.connected'))
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
        label: t('canvas.context.connect'), 
        icon: Link, 
        action: () => startConnection(tableName, column.name) 
      },
      {
        label: column.isHidden ? t('canvas.context.showColumn') : t('canvas.context.hideColumn'),
        icon: EyeOff,
        action: () => onToggleHidden({ tableName, columnName: column.name, isHidden: !column.isHidden })
      }
    ]
  }
}

const onColumnDblClick = ({ event, column, tableName }: any) => {
  startConnection(tableName, column.name)
}

const onColumnClick = ({ event, column, tableName }: any) => {
  if (connectingState.value.active) {
    event.stopPropagation()
    completeConnection(tableName, column.name)
  }
}


const openAddConnectionDialog = () => {
  editingConnection.value = null
  dbConfig.value = {
    name: '',
    type: 'pg',
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '',
    database: 'postgres'
  }
  isConnectionDialogOpen.value = true
}

const openEditConnectionDialog = (conn: any) => {
  editingConnection.value = conn
  dbConfig.value = { ...conn }
  isConnectionDialogOpen.value = true
}

const onConnectionContextMenu = ({ event, conn }: { event: MouseEvent, conn: any }) => {
  connectionContextMenu.value = {
    visible: true,
    x: event.clientX,
    y: event.clientY,
    items: [
      {
        label: t('canvas.connectionMenu.test'),
        icon: Activity,
        action: () => {
          checkConnectionStatus(conn)
          toast.info(t('toast.testingConnection'))
        }
      },
      {
        label: t('canvas.connectionMenu.edit'),
        icon: Pencil,
        action: () => openEditConnectionDialog(conn)
      }
    ]
  }
}

const saveConnectionDetails = async () => {
  isConnecting.value = true
  try {
    const headers = useRequestHeaders(['cookie'])
    // Test connection first
    const testRes: any = await $fetch('/api/connections/test', {
      method: 'POST',
      body: { config: dbConfig.value },
      headers
    })

    if (!testRes.success) {
      toast.error(t('toast.connectionTestFailed'), { description: testRes.error })
      isConnecting.value = false
      return
    }

    let res: any;
    if (editingConnection.value) {
       // Update
       res = await $fetch('/api/connections', {
         method: 'PUT',
         body: { ...dbConfig.value, id: editingConnection.value.id },
         headers
       })
    } else {
       // Create
       res = await $fetch('/api/connections', {
         method: 'POST',
         body: { ...dbConfig.value, projectId: projectId.value },
         headers
       })
    }

    if (res.success) {
      toast.success(editingConnection.value ? t('toast.connectionUpdated') : t('toast.connectionSaved'))
      isConnectionDialogOpen.value = false
      loadProject() // Reload list
    } else {
      toast.error(t('toast.saveConnectionFailed'))
    }
  } catch (error: any) {
    toast.error(t('toast.error'), { description: error.message })
  } finally {
    isConnecting.value = false
  }
}

const selectConnection = (conn: any) => {
  if (currentConnectionId.value === conn.id) return
  dbConfig.value = { ...conn }
  currentConnectionId.value = conn.id
  if (import.meta.client && projectId.value) {
    localStorage.setItem(`lastConnectionId:${projectId.value}`, String(conn.id))
  }
  connectDB()
}

const connectDB = async () => {
  isConnecting.value = true
  try {
    const res: any = await $fetch('/api/metadata', {
      method: 'POST',
      body: dbConfig.value
    })
    tables.value = res.data
    metadataTree.value = res.tree || null
    toast.success(t('toast.databaseConnected'))
    
    // Auto-save connection if it's new
    if (!currentConnectionId.value) {
      const saveRes: any = await $fetch('/api/connections', {
        method: 'POST',
        body: { ...dbConfig.value, projectId: projectId.value }
      })
      if (saveRes.success) {
        currentConnectionId.value = saveRes.data.id
        loadProject()
      }
    }
  } catch (error: any) {
    toast.error(t('toast.error'), { description: error.message })
  } finally {
    isConnecting.value = false
  }
}

const onColumnHover = ({ tableName, columnName, isHovering }: { tableName: string, columnName: string, isHovering: boolean }) => {
  if (isHovering) {
    hoveredForeignKey.value = { tableName, columnName }
  } else {
    if (hoveredForeignKey.value?.tableName === tableName && hoveredForeignKey.value?.columnName === columnName) {
      hoveredForeignKey.value = null
    }
  }
  updateEdgeHighlights()
}

const addTableToCanvas = (tableName: string) => {
  const tableId = `table-${tableName}`
  if (nodes.value.some(n => n.id === tableId)) {
    toast.info(t('toast.info'), { description: t('toast.tableAlreadyOnCanvas') })
    return
  }
  
  const columns = tables.value[tableName] || []
  
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
      onToggleHidden: onToggleHidden,
      onHover: onColumnHover
    }
  }
  addNodes([newNode])
}

const loadCanvas = async () => {
  await loadProject()
}

const clearCanvas = () => {
  removeNodes(nodes.value)
  removeEdges(useVueFlow().edges.value)
}

const openSaveDialog = () => {
  isSaveDialogOpen.value = true
}

// SQL Export
const isSqlDialogOpen = ref(false)
const generatedSql = ref('')

const exportSql = () => {
  const edges = useVueFlow().edges.value
  // Use the type from dbConfig if set, otherwise default to pg
  const type = (dbConfig.value.type as 'pg' | 'mysql2') || 'pg'
  generatedSql.value = generateSQL(nodes.value, edges, type)
  isSqlDialogOpen.value = true
}

const copySql = () => {
  navigator.clipboard.writeText(generatedSql.value)
  toast.success(t('toast.sqlCopied'))
}

const onBeforeUnload = (event: BeforeUnloadEvent) => {
  if (isDraft.value && isDraftDirty.value) {
    event.preventDefault()
    event.returnValue = ''
    return ''
  }
}

onMounted(async () => {
  if (import.meta.client) {
    window.addEventListener('beforeunload', onBeforeUnload)
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('beforeunload', onBeforeUnload)
  }
})
</script>

<template>
  <div class="flex h-screen w-full bg-background text-foreground overflow-hidden">
    <!-- Column 1: App Sidebar (Navigation & User) -->
    <AppSidebar 
      v-model:isCollapsed="isAppSidebarCollapsed"
      @open-settings="openSettingsDialog"
    />

    <!-- Column 2: Canvas Sidebar (Connections & Tables) -->
    <CanvasSidebar
      :isOpen="isCanvasSidebarOpen"
      :savedConnections="savedConnections"
      :connectionStatuses="connectionStatuses"
      :currentConnectionId="currentConnectionId"
      :availableTables="availableTables"
      :metadataTree="metadataTree"
      :isTableOnCanvas="isTableOnCanvas"
      :addedTables="addedTableNames"
      :tablesData="tables"
      @close="isCanvasSidebarOpen = false"
      @add-connection="openAddConnectionDialog"
      @select-connection="selectConnection"
      @connection-context-menu="onConnectionContextMenu"
      @add-table="addTableToCanvas"
    />

    <!-- Column 3: Main Canvas Area -->
    <div class="flex-1 h-full relative overflow-hidden bg-background">
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
            <DialogTitle>{{ t('saveProject.title') }}</DialogTitle>
            <DialogDescription>
              {{ t('saveProject.description') }}
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="name" class="text-right">
                {{ t('saveProject.field.name') }}
              </Label>
              <Input
                id="name"
                v-model="projectName"
                class="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button @click="saveCanvas">{{ t('saveProject.action.save') }}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog :open="isSqlDialogOpen" @update:open="isSqlDialogOpen = $event">
        <DialogContent class="sm:max-w-[600px] max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{{ t('sqlExport.title') }}</DialogTitle>
            <DialogDescription>
              {{ t('sqlExport.description') }}
            </DialogDescription>
          </DialogHeader>
          <div class="flex-1 overflow-auto py-4">
            <pre class="bg-muted p-4 rounded-md text-xs font-mono whitespace-pre-wrap text-foreground">{{ generatedSql }}</pre>
          </div>
          <DialogFooter>
            <Button variant="outline" @click="isSqlDialogOpen = false">{{ t('common.close') }}</Button>
            <Button @click="copySql">{{ t('common.copy') }}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <!-- Connection Dialog -->
      <Dialog :open="isConnectionDialogOpen" @update:open="isConnectionDialogOpen = $event">
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{{ editingConnection ? t('connectionDialog.editTitle') : t('connectionDialog.addTitle') }}</DialogTitle>
            <DialogDescription>
              {{ editingConnection ? t('connectionDialog.editDescription') : t('connectionDialog.addDescription') }}
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4 py-4">
            <div class="grid gap-4">
               <!-- Basic Details -->
               <div class="grid grid-cols-4 items-center gap-4">
                  <Label class="text-right">{{ t('connectionDialog.field.name') }}</Label>
                  <Input v-model="dbConfig.name" class="col-span-3" :placeholder="t('connectionDialog.placeholder.name')" />
               </div>
               <div class="grid grid-cols-4 items-center gap-4">
                  <Label class="text-right">{{ t('connectionDialog.field.type') }}</Label>
                  <Select v-model="dbConfig.type">
                     <SelectTrigger class="col-span-3">
                       <SelectValue :placeholder="t('connectionDialog.placeholder.type')" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="pg">
                         <div class="flex items-center gap-2">
                           <div class="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-[8px] text-white font-bold">P</div>
                           PostgreSQL
                         </div>
                       </SelectItem>
                       <SelectItem value="mysql2">
                         <div class="flex items-center gap-2">
                           <div class="w-4 h-4 bg-orange-600 rounded-full flex items-center justify-center text-[8px] text-white font-bold">M</div>
                           MySQL
                         </div>
                       </SelectItem>
                     </SelectContent>
                   </Select>
               </div>
               <div class="grid grid-cols-4 items-center gap-4">
                  <Label class="text-right">{{ t('connectionDialog.field.host') }}</Label>
                  <Input v-model="dbConfig.host" class="col-span-3" />
               </div>
               <div class="grid grid-cols-4 items-center gap-4">
                  <Label class="text-right">{{ t('connectionDialog.field.port') }}</Label>
                  <Input v-model="dbConfig.port" type="number" class="col-span-3" />
               </div>
               <div class="grid grid-cols-4 items-center gap-4">
                  <Label class="text-right">{{ t('connectionDialog.field.user') }}</Label>
                  <Input v-model="dbConfig.user" class="col-span-3" />
               </div>
               <div class="grid grid-cols-4 items-center gap-4">
                  <Label class="text-right">{{ t('connectionDialog.field.password') }}</Label>
                  <Input v-model="dbConfig.password" type="password" class="col-span-3" :placeholder="editingConnection ? t('connectionDialog.placeholder.passwordUnchanged') : ''" />
               </div>
               <div class="grid grid-cols-4 items-center gap-4">
                  <Label class="text-right">{{ t('connectionDialog.field.database') }}</Label>
                  <Input v-model="dbConfig.database" class="col-span-3" />
               </div>
            </div>
          </div>
          <DialogFooter>
            <Button @click="saveConnectionDetails" :disabled="isConnecting">
               <Loader2 v-if="isConnecting" class="w-4 h-4 mr-2 animate-spin" />
               {{ editingConnection ? t('connectionDialog.action.update') : t('connectionDialog.action.save') }}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <!-- Version History Dialog -->
      <Dialog :open="isHistoryDialogOpen" @update:open="isHistoryDialogOpen = $event">
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Version History</DialogTitle>
            <DialogDescription>
              Restore previous versions of your canvas.
            </DialogDescription>
          </DialogHeader>
          <div class="py-4 max-h-[60vh] overflow-y-auto">
             <div v-if="isLoadingVersions" class="flex justify-center p-4">
               <Loader2 class="w-6 h-6 animate-spin text-muted-foreground" />
             </div>
             <div v-else-if="versions.length === 0" class="text-center text-muted-foreground py-4">
               No versions saved yet.
             </div>
             <div v-else class="space-y-2">
               <div 
                 v-for="version in versions" 
                 :key="version.id"
                 class="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50"
               >
                 <div>
                   <div class="font-medium text-sm">{{ version.name }}</div>
                   <div class="text-xs text-muted-foreground">{{ new Date(version.createdAt).toLocaleString() }}</div>
                 </div>
                 <Button size="sm" variant="outline" @click="restoreVersion(version.id)">
                   Restore
                 </Button>
               </div>
             </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog :open="isExitDraftDialogOpen" @update:open="($event) => { if (!$event) cancelExitPrompt() }">
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{{ t('draft.exitTitle') }}</DialogTitle>
            <DialogDescription>
              {{ t('draft.exitDescription') }}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" @click="cancelExitPrompt">{{ t('draft.cancel') }}</Button>
            <Button variant="outline" @click="confirmExitDiscard">{{ t('draft.discardAndExit') }}</Button>
            <Button @click="confirmExitSave">{{ t('draft.saveAndExit') }}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <!-- User Settings Dialog -->
      <Dialog :open="isSettingsDialogOpen" @update:open="isSettingsDialogOpen = $event">
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{{ t('userSettings.title') }}</DialogTitle>
            <DialogDescription>
              {{ t('userSettings.description') }}
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4 py-4">
            <div class="flex justify-center mb-4">
               <Avatar class="w-20 h-20">
                 <AvatarImage v-if="userForm.avatar" :src="userForm.avatar" />
                 <AvatarFallback>{{ userForm.name?.charAt(0) || 'U' }}</AvatarFallback>
               </Avatar>
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label class="text-right">{{ t('userSettings.field.name') }}</Label>
              <Input v-model="userForm.name" class="col-span-3" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label class="text-right">{{ t('userSettings.field.avatarUrl') }}</Label>
              <Input v-model="userForm.avatar" class="col-span-3" placeholder="https://..." />
            </div>
          </div>
          <DialogFooter>
            <Button @click="saveProfile">{{ t('userSettings.action.save') }}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <ContextMenu 
        :visible="connectionContextMenu.visible"
        :x="connectionContextMenu.x"
        :y="connectionContextMenu.y"
        :items="connectionContextMenu.items"
        @close="connectionContextMenu.visible = false"
      />
      
      <VueFlow 
        :node-types="nodeTypes"
        :default-viewport="{ zoom: 0.8 }"
        :min-zoom="0.2"
        :max-zoom="4"
        :nodes-draggable="true"
        :nodes-connectable="interactionMode === 'pointer'"
        :elements-selectable="true"
        :pan-on-drag="interactionMode === 'hand'"
        :selection-on-drag="interactionMode === 'pointer'"
        :selection-key-code="interactionMode === 'pointer' ? true : 'Shift'"
        @connect="onConnect"
      >
        <Background pattern-color="hsl(var(--border))" :gap="20" :size="1" />
        
        <!-- Canvas Toolbar (Left) -->
        <div class="absolute left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3 p-1 bg-background/90 backdrop-blur-md border border-border rounded-full shadow-2xl">
          <div class="flex flex-col items-center gap-2">
            <div class="flex flex-col items-center gap-2 p-1 rounded-full bg-muted/40">
              <Button
                variant="ghost"
                size="icon"
                class="rounded-full h-9 w-9"
                :class="{ 'bg-background text-foreground': interactionMode === 'pointer' }"
                :title="t('canvas.pointerMode')"
                @click="interactionMode = 'pointer'"
              >
                <MousePointer2 class="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                class="rounded-full h-9 w-9"
                :class="{ 'bg-background text-foreground': interactionMode === 'hand' }"
                :title="t('canvas.handMode')"
                @click="interactionMode = 'hand'"
              >
                <Hand class="h-4 w-4" />
              </Button>
            </div>

            <div class="h-px w-6 bg-border/70 my-1"></div>

            <Button @click="organizeNodes" variant="ghost" size="icon" class="rounded-full h-10 w-10 hover:bg-muted" :title="t('canvas.organize')">
              <LayoutGrid class="h-4 w-4" />
            </Button>
            <Button @click="clearCanvas" variant="ghost" size="icon" class="rounded-full h-10 w-10 hover:bg-muted" :title="t('canvas.clear')">
              <Trash2 class="h-4 w-4" />
            </Button>
            <Button @click="exportSql" variant="ghost" size="icon" class="rounded-full h-10 w-10 hover:bg-muted" :title="t('canvas.exportSql')">
              <FileCode class="h-4 w-4" />
            </Button>
          </div>

          <Button 
            @click="isCanvasSidebarOpen = !isCanvasSidebarOpen" 
            variant="ghost" 
            size="icon" 
            class="rounded-full h-10 w-10 hover:bg-muted"
            :class="{ 'text-primary': isCanvasSidebarOpen }"
            :title="t('canvas.toggleSidebar')"
          >
            <PanelLeftClose v-if="isCanvasSidebarOpen" class="h-4 w-4" />
            <PanelLeftOpen v-else class="h-4 w-4" />
          </Button>
        </div>

        <div class="absolute left-24 bottom-6 z-50 flex items-center gap-2 bg-background/90 backdrop-blur-md border border-border rounded-full shadow-2xl p-1">
          <Button @click="undo" variant="ghost" size="icon" class="rounded-full h-9 w-9 hover:bg-muted" :title="t('canvas.undo')" :disabled="!canUndo">
            <Undo2 class="h-4 w-4" />
          </Button>
          <Button @click="redo" variant="ghost" size="icon" class="rounded-full h-9 w-9 hover:bg-muted" :title="t('canvas.redo')" :disabled="!canRedo">
            <Redo2 class="h-4 w-4" />
          </Button>
        </div>

        <!-- Version + Save + Zoom (Top Right) -->
        <div class="absolute top-6 right-6 z-50 flex items-center gap-2">
          <Button @click="openHistoryDialog" variant="outline" class="h-10 px-3 bg-background/90 backdrop-blur-md border-border shadow-lg hover:bg-muted" :title="t('canvas.versions')">
            <History class="h-4 w-4 mr-2" />
            {{ t('canvas.versions') }}
          </Button>

          <Button @click="openSaveDialog" variant="default" class="h-10 px-4 bg-primary/95 backdrop-blur-md shadow-lg hover:shadow-primary/25 transition-shadow">
            <CloudUpload class="mr-2 h-4 w-4" /> {{ t('canvas.save') }}
          </Button>
        </div>

        <!-- Zoom Controls (Bottom Right) -->
        <div class="absolute bottom-6 right-6 z-50">
          <div class="flex items-center shadow-lg rounded-md overflow-hidden border border-border bg-background/90 backdrop-blur">
            <Button 
              @click="fitView" 
              variant="ghost" 
              size="icon"
              class="h-10 w-10 rounded-none border-r border-border hover:bg-muted"
              :title="t('canvas.zoomFit')"
            >
              <Maximize class="h-4 w-4" />
            </Button>
            <Button 
              @click="zoomOut" 
              variant="ghost" 
              size="icon"
              class="h-10 w-10 rounded-none border-r border-border hover:bg-muted"
              :title="t('canvas.zoomOut')"
            >
              <Minus class="h-4 w-4" />
            </Button>
            <div class="px-3 py-1 text-xs font-medium text-foreground min-w-[60px] text-center flex items-center justify-center h-10">
              {{ Math.round((viewport.zoom || 0) * 100) }}%
            </div>
            <Button 
              @click="zoomIn" 
              variant="ghost" 
              size="icon"
              class="h-10 w-10 rounded-none hover:bg-muted"
              :title="t('canvas.zoomIn')"
            >
              <Plus class="h-4 w-4" />
            </Button>
          </div>
        </div>
      </VueFlow>
    </div>
  </div>
</template>

<style>
/* Vue Flow overrides for cleaner look */
.vue-flow__node-table {
  padding: 0 !important;
  border: none !important;
  background: transparent !important;
}

.vue-flow__edge-path {
  stroke: hsl(var(--muted-foreground));
  stroke-width: 2;
  transition: stroke 0.3s ease, stroke-width 0.3s ease;
}

.vue-flow__edge.edge-active .vue-flow__edge-path,
.vue-flow__edge.selected .vue-flow__edge-path {
  stroke: hsl(var(--edge)) !important;
  stroke-width: 2.5;
  filter: drop-shadow(0 0 4px hsl(var(--edge) / 0.8));
}

.vue-flow__edge.edge-muted .vue-flow__edge-path {
  stroke: hsl(var(--border));
  opacity: 0.6;
}

.vue-flow__controls {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.45);
  border: 1px solid hsl(var(--border));
  background: hsl(var(--popover));
}

/* Selection Box Styling */
.vue-flow__selection {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.5);
  border-radius: 4px;
}

.vue-flow__selection-pane {
  z-index: 5;
}

/* Scrollbar override if needed, but ScrollArea handles it mostly */
</style>
