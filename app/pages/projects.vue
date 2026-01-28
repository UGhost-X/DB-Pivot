<template>
  <div class="container mx-auto py-10">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Projects</h1>
      <Dialog v-model:open="isCreateDialogOpen">
        <DialogTrigger as-child>
          <Button>
            <Plus class="w-4 h-4 mr-2" />
            New Project
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Create a new project to organize your database connections and diagrams.
            </DialogDescription>
          </DialogHeader>
          <div class="space-y-4 py-4">
            <div class="space-y-2">
              <Label for="name">Project Name</Label>
              <Input id="name" v-model="newProject.name" placeholder="My Awesome Project" />
            </div>
            <div class="space-y-2">
              <Label for="description">Description</Label>
              <Input id="description" v-model="newProject.description" placeholder="Optional description" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" @click="isCreateDialogOpen = false">Cancel</Button>
            <Button @click="createProject" :disabled="!newProject.name || isLoading">
              {{ isLoading ? 'Creating...' : 'Create' }}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>

    <div v-if="isLoadingProjects" class="flex justify-center py-10">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>

    <div v-else-if="projects.length === 0" class="text-center py-20 border rounded-lg bg-muted/20">
      <h3 class="text-lg font-medium text-muted-foreground">No projects found</h3>
      <p class="text-sm text-muted-foreground mt-2">Create your first project to get started.</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card v-for="project in projects" :key="project.id" class="cursor-pointer hover:shadow-md transition-shadow" @click="openProject(project.id)">
        <CardHeader>
          <CardTitle>{{ project.name }}</CardTitle>
          <CardDescription>{{ project.description || 'No description' }}</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex justify-between text-sm text-muted-foreground">
            <span>{{ project._count?.connections || 0 }} Connections</span>
            <span>{{ project._count?.canvases || 0 }} Canvases</span>
          </div>
        </CardContent>
        <CardFooter class="text-xs text-muted-foreground">
          Updated {{ new Date(project.updatedAt).toLocaleDateString() }}
        </CardFooter>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

const router = useRouter()
const isCreateDialogOpen = ref(false)
const isLoading = ref(false)
const isLoadingProjects = ref(true)
const projects = ref<any[]>([])

const newProject = ref({
  name: '',
  description: ''
})

const fetchProjects = async () => {
  isLoadingProjects.value = true
  try {
    const res: any = await $fetch('/api/projects')
    if (res.success) {
      projects.value = res.data
    }
  } catch (error) {
    toast.error('Failed to load projects')
  } finally {
    isLoadingProjects.value = false
  }
}

const createProject = async () => {
  isLoading.value = true
  try {
    const res: any = await $fetch('/api/projects', {
      method: 'POST',
      body: newProject.value
    })
    
    if (res.success) {
      toast.success('Project created')
      isCreateDialogOpen.value = false
      newProject.value = { name: '', description: '' }
      await fetchProjects()
    }
  } catch (error) {
    toast.error('Failed to create project')
  } finally {
    isLoading.value = false
  }
}

const openProject = (id: number) => {
  router.push(`/?projectId=${id}`)
}

onMounted(() => {
  fetchProjects()
})
</script>
