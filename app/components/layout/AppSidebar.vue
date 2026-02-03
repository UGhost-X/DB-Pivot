<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useI18n } from '@/composables/useI18n'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  LayoutGrid, 
  Home,
  Languages,
  Settings, 
  LogOut, 
  ChevronsLeft,
  ChevronsRight,
  ChevronRight,
  Database,
  Folder,
  FolderOpen,
  User,
  Moon,
  Sun,
  Eye,
  Trash2,
  Layout
} from 'lucide-vue-next'
import { useDark, useToggle, onClickOutside } from '@vueuse/core'
import ViewPreviewDialog from '@/components/ViewPreviewDialog.vue'
import { toast } from 'vue-sonner'

const props = defineProps<{
  isCollapsed: boolean
}>()

const emit = defineEmits<{
  (e: 'update:isCollapsed', value: boolean): void
  (e: 'open-settings'): void
}>()

const { user, logout } = useAuth()
const router = useRouter()
const { locale, toggleLocale, t } = useI18n()
const isDark = useDark({
  selector: 'body',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
  storageKey: 'db-pivot-theme',
})
const toggleDark = useToggle(isDark)
const isProjectsMenuOpen = ref(false)
const isLoadingProjects = ref(false)
const projects = ref<any[]>([])
const projectCount = computed(() => projects.value.length)
const expandedSavedViews = ref<Record<number, boolean>>({})
const projectSavedViews = ref<Record<number, any[]>>({})
const loadingSavedViews = ref<Record<number, boolean>>({})

// Context Menu State
const contextMenu = ref({
  visible: false,
  x: 0,
  y: 0,
  view: null as any,
  projectId: null as number | null
})
const contextMenuRef = ref(null)

onClickOutside(contextMenuRef, () => {
  contextMenu.value.visible = false
})

const handleContextMenu = (event: MouseEvent, view: any, projectId: number) => {
  contextMenu.value = {
    visible: true,
    x: event.clientX,
    y: event.clientY,
    view,
    projectId
  }
}

const deleteSavedView = async () => {
  const { view, projectId } = contextMenu.value
  if (!view || !projectId) return
  
  contextMenu.value.visible = false
  
  try {
    const { success, error } = await $fetch(`/api/saved-views/${view.id}`, {
      method: 'DELETE'
    })

    if (success) {
      // Remove from list
      if (projectSavedViews.value[projectId]) {
        projectSavedViews.value[projectId] = projectSavedViews.value[projectId].filter(v => v.id !== view.id)
      }
      toast.success('删除成功')
    } else {
      throw new Error(error)
    }
  } catch (e) {
    console.error('Failed to delete view', e)
    toast.error('删除失败')
  }
}

const handlePreviewFromContext = () => {
  const { view, projectId } = contextMenu.value
  if (view && projectId) {
    openViewPreview(view, projectId)
  }
  contextMenu.value.visible = false
}

// Preview State
const isPreviewOpen = ref(false)
const previewUrl = ref('')
const previewTitle = ref('')

const handleProjectClick = (id: number) => {
  router.push({ path: '/', query: { projectId: id } })
}

const toggleSavedViews = async (projectId: number) => {
  const isExpanded = !expandedSavedViews.value[projectId]
  expandedSavedViews.value = { ...expandedSavedViews.value, [projectId]: isExpanded }
  
  if (isExpanded && !projectSavedViews.value[projectId]) {
    await fetchSavedViews(projectId)
  }
}

const fetchSavedViews = async (projectId: number) => {
  if (loadingSavedViews.value[projectId]) return
  loadingSavedViews.value = { ...loadingSavedViews.value, [projectId]: true }
  
  try {
    const { success, data } = await $fetch('/api/saved-views', {
      params: { projectId }
    })
    
    if (success) {
      projectSavedViews.value = { ...projectSavedViews.value, [projectId]: data }
    }
  } catch (e) {
    console.error(e)
    toast.error(t('toast.error'))
  } finally {
    loadingSavedViews.value = { ...loadingSavedViews.value, [projectId]: false }
  }
}

const refreshSavedViews = async (projectId: number) => {
  await fetchSavedViews(projectId)
}

defineExpose({
  refreshSavedViews,
})

const openViewPreview = (view: any, projectId: number) => {
  previewTitle.value = view.name
  const route = router.resolve({ 
    path: '/', 
    query: { 
      viewId: view.id, 
      projectId, 
      preview: '1', 
      embed: '1' 
    } 
  })
  previewUrl.value = route.href
  isPreviewOpen.value = true
}

const toggleCollapse = () => {
  emit('update:isCollapsed', !props.isCollapsed)
  if (props.isCollapsed) {
    isProjectsMenuOpen.value = true
  }
}

const loadProjects = () => {
  fetchProjects()
  isProjectsMenuOpen.value = true
}

const fetchProjects = async () => {
  if (isLoadingProjects.value) return
  isLoadingProjects.value = true
  try {
    const res: any = await $fetch('/api/projects')
    if (res?.success) {
      projects.value = res.data || []
    } else {
      projects.value = []
    }
  } catch {
    projects.value = []
  } finally {
    isLoadingProjects.value = false
  }
}

watch(isProjectsMenuOpen, (open) => {
  if (open) {
    fetchProjects()
  }
})

onMounted(() => {
  fetchProjects()
})
</script>

<template>
  <div 
    class="flex flex-col border-r bg-card transition-all duration-300 ease-in-out h-full z-30"
    :class="[isCollapsed ? 'w-16' : 'w-64']"
  >
    <!-- Header / Logo -->
    <div class="h-14 flex items-center px-4 border-b border-border/40 shrink-0" :class="[isCollapsed ? 'justify-center' : 'justify-between']">
      <div v-if="!isCollapsed" class="flex items-center gap-2 font-bold text-xl truncate text-primary">
        <Database class="h-6 w-6" />
        <span>DB Pivot</span>
      </div>
      <div v-else>
         <Database class="h-6 w-6 text-primary" />
      </div>
      
    </div>

    <!-- Navigation -->
    <div class="flex-1 py-4 flex flex-col gap-2 px-2">
      <TooltipProvider :delay-duration="0">
        <Tooltip>
          <TooltipTrigger as-child>
            <Button 
              variant="ghost" 
              :class="[
                'w-full justify-start gap-3', 
                isCollapsed ? 'justify-center px-0' : 'px-3'
              ]"
              @click="router.push('/projects')"
            >
              <Home class="h-5 w-5" />
              <span v-if="!isCollapsed">{{ t('nav.home') }}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent v-if="isCollapsed" side="right">{{ t('nav.home') }}</TooltipContent>
        </Tooltip>

        <!-- Projects Menu: Collapsed (Dropdown) -->
        <div v-if="isCollapsed" class="flex flex-col items-center">
          <Tooltip>
            <TooltipTrigger as-child>
              <Button 
                variant="ghost" 
                :class="[
                  'w-full justify-start gap-3 relative', 
                  'justify-center px-0'
                ]"
                @click="toggleCollapse"
              >
                <LayoutGrid class="h-5 w-5" />
                <span
                  v-if="projectCount > 0"
                  class="absolute top-0 right-0 h-3.5 min-w-[14px] px-1 rounded-full bg-primary text-primary-foreground text-[9px] font-bold leading-[14px] text-center"
                >
                  {{ projectCount }}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{{ t('nav.projects') }}</TooltipContent>
          </Tooltip>
        </div>

        <!-- Projects Menu: Expanded (Tree View) -->
        <div v-else class="flex flex-col gap-1">
          <Button 
            variant="ghost" 
            class="w-full justify-start gap-3 px-3"
            @click="isProjectsMenuOpen = !isProjectsMenuOpen"
          >
            <LayoutGrid class="h-5 w-5" />
            <span>{{ t('nav.projects') }}</span>
            <span
              v-if="projectCount > 0"
              class="ml-auto h-5 min-w-[20px] px-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold leading-5 text-center"
            >
              {{ projectCount }}
            </span>
            <ChevronRight 
              class="h-4 w-4 text-muted-foreground transition-transform duration-200"
              :class="{ 'rotate-90': isProjectsMenuOpen }"
            />
          </Button>

          <div v-if="isProjectsMenuOpen" class="pl-9 pr-2 space-y-1 animate-in slide-in-from-top-2 fade-in-50 duration-200">
             <div v-if="isLoadingProjects" class="px-2 py-1 text-xs text-muted-foreground">{{ t('projects.loading') }}</div>
             <div v-else-if="projects.length === 0" class="px-2 py-1 text-xs text-muted-foreground">{{ t('projects.empty') }}</div>
             <template v-else>
               <div v-for="p in projects" :key="p.id" class="flex flex-col gap-0.5">
                 <div
                   class="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-muted/50 text-sm text-muted-foreground cursor-pointer transition-colors group"
                   @click="handleProjectClick(p.id)"
                 >
                   <div class="flex items-center gap-2 min-w-0">
                     <Folder class="h-3.5 w-3.5 shrink-0" />
                     <span class="truncate">{{ p.name }}</span>
                   </div>
                 </div>
                 
                 <!-- Saved Views Folder -->
                 <div class="flex flex-col">
                   <div 
                      class="flex items-center gap-2 py-1 px-2 ml-4 rounded-md hover:bg-muted/50 text-xs text-muted-foreground cursor-pointer transition-colors"
                      @click.stop="toggleSavedViews(p.id)"
                   >
                      <FolderOpen v-if="expandedSavedViews[p.id]" class="h-3 w-3 shrink-0" />
                      <Folder v-else class="h-3 w-3 shrink-0" />
                      <span>{{ t('nav.savedViews') }}</span>
                   </div>

                   <!-- Saved Views List -->
                   <div v-if="expandedSavedViews[p.id]" class="ml-8 border-l border-border/40 pl-2 mt-1 space-y-0.5">
                      <div v-if="loadingSavedViews[p.id]" class="text-[10px] text-muted-foreground py-1 px-2">
                        {{ t('projects.loading') }}
                      </div>
                      <div v-else-if="!projectSavedViews[p.id] || projectSavedViews[p.id].length === 0" class="text-[10px] text-muted-foreground py-1 px-2">
                        {{ t('projects.empty') }}
                      </div>
                      <template v-else>
                        <div 
                          v-for="view in projectSavedViews[p.id]" 
                          :key="view.id"
                          class="flex items-center gap-2 py-1 px-2 rounded-md hover:bg-muted/50 text-xs text-muted-foreground cursor-pointer transition-colors truncate"
                          @click.stop="openViewPreview(view, p.id)"
                          @contextmenu.prevent="handleContextMenu($event, view, p.id)"
                          :title="view.name"
                        >
                          <Layout class="h-3 w-3 shrink-0" />
                          <span class="truncate">{{ view.name }}</span>
                        </div>
                      </template>
                   </div>
                 </div>
               </div>
             </template>
          </div>
        </div>
      </TooltipProvider>
    </div>

    <div class="flex justify-center py-2 border-t border-border/40 shrink-0">
      <Button variant="ghost" size="icon" class="h-8 w-8 text-muted-foreground" @click="toggleCollapse">
        <ChevronsLeft v-if="!isCollapsed" class="h-4 w-4" />
        <ChevronsRight v-else class="h-4 w-4" />
      </Button>
    </div>

    <!-- Footer -->
    <div class="p-2 border-t border-border/40 flex flex-col gap-2 shrink-0">
       <DropdownMenu>
         <DropdownMenuTrigger as-child>
           <div 
             class="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer outline-none"
             :class="{'justify-center': isCollapsed}"
           >
              <Avatar class="h-8 w-8">
                <AvatarImage v-if="user?.avatar" :src="user.avatar" />
                <AvatarFallback>{{ user?.name?.charAt(0) || 'U' }}</AvatarFallback>
              </Avatar>
              
              <div v-if="!isCollapsed" class="flex-1 overflow-hidden text-left">
                <div class="text-sm font-medium truncate">{{ user?.name }}</div>
                <div class="text-xs text-muted-foreground truncate">{{ user?.email }}</div>
              </div>
              
              <Settings v-if="!isCollapsed" class="h-4 w-4 text-muted-foreground" />
           </div>
         </DropdownMenuTrigger>
         
         <DropdownMenuContent class="w-56" align="end" :side="isCollapsed ? 'right' : 'top'">
           <DropdownMenuLabel>{{ t('nav.myAccount') }}</DropdownMenuLabel>
           <DropdownMenuSeparator />
           
           <DropdownMenuGroup>
              <DropdownMenuItem @select="emit('open-settings')">
               <User class="mr-2 h-4 w-4" />
               <span>{{ t('nav.profile') }}</span>
             </DropdownMenuItem>
             
            <DropdownMenuItem @select="toggleDark()">
              <ClientOnly>
                <template #fallback>
                  <Moon class="mr-2 h-4 w-4" />
                  <span>Theme</span>
                </template>
                <Sun v-if="isDark" class="mr-2 h-4 w-4" />
                <Moon v-else class="mr-2 h-4 w-4" />
                <span>{{ isDark ? t('nav.themeLight') : t('nav.themeDark') }}</span>
              </ClientOnly>
            </DropdownMenuItem>

            <DropdownMenuItem @select="toggleLocale()">
              <Languages class="mr-2 h-4 w-4" />
              <span>{{ t('nav.language') }}: {{ locale === 'zh' ? '中文' : 'English' }}</span>
            </DropdownMenuItem>
           </DropdownMenuGroup>
           
           <DropdownMenuSeparator />
           
            <DropdownMenuItem class="text-destructive focus:text-destructive" @select="logout">
             <LogOut class="mr-2 h-4 w-4" />
             <span>{{ t('nav.logout') }}</span>
           </DropdownMenuItem>
         </DropdownMenuContent>
       </DropdownMenu>
    </div>
  </div>

  <!-- Context Menu -->
  <div
    v-if="contextMenu.visible"
    ref="contextMenuRef"
    class="fixed z-50 min-w-[120px] bg-popover text-popover-foreground border border-border shadow-md rounded-md p-1 overflow-hidden"
    :style="{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }"
  >
    <div 
      class="flex items-center gap-2 px-2 py-1.5 text-xs rounded-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
      @click="handlePreviewFromContext"
    >
      <Eye class="h-3.5 w-3.5" />
      <span>预览</span>
    </div>
    <div 
      class="flex items-center gap-2 px-2 py-1.5 text-xs rounded-sm hover:bg-accent hover:text-accent-foreground cursor-pointer text-destructive focus:text-destructive"
      @click="deleteSavedView"
    >
      <Trash2 class="h-3.5 w-3.5" />
      <span>删除</span>
    </div>
  </div>

  <ViewPreviewDialog
    v-model:open="isPreviewOpen"
    :url="previewUrl"
    :title="previewTitle"
  />
</template>
