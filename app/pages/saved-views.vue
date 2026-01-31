<template>
  <div class="container mx-auto py-8">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold">已保存的视图</h1>
      <Button variant="outline" @click="router.push({ path: '/', query: { projectId: route.query.projectId } })">
        <ArrowLeft class="mr-2 h-4 w-4" />
        返回画布
      </Button>
    </div>

    <div v-if="savedViews.length === 0" class="text-center py-12 text-gray-500">
      暂无保存的视图
    </div>

    <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card v-for="view in savedViews" :key="view.id" class="flex flex-col">
        <CardHeader>
          <CardTitle>{{ view.name }}</CardTitle>
          <CardDescription>{{ formatDate(view.createdAt) }}</CardDescription>
        </CardHeader>
        <CardContent class="flex-1 space-y-2">
          <div class="text-sm">
            <span class="font-medium">起始表:</span> {{ view.config.startTable }}
          </div>
          <div class="text-sm">
            <span class="font-medium">查询深度:</span> {{ view.config.maxDepth }}
          </div>
          <div class="text-sm">
            <span class="font-medium">隐藏非关联:</span> {{ view.config.hideUnrelated ? '是' : '否' }}
          </div>
          <div class="text-sm text-gray-500 mt-2">
            包含 {{ view.result.visitedNodeIds.length }} 个表，
            {{ view.result.traversedEdgeIds.length }} 条关系
          </div>
        </CardContent>
        <CardFooter class="flex justify-between">
          <Button variant="destructive" size="sm" @click="openDeleteConfirm(view.id)">
            <Trash2 class="h-4 w-4 mr-2" />
            删除
          </Button>
          <Button size="sm" @click="openView(view.id)">
            <Eye class="h-4 w-4 mr-2" />
            查看
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>

  <Dialog :open="isPreviewOpen" @update:open="isPreviewOpen = $event">
    <DialogContent class="w-[95vw] max-w-[1400px] h-[85vh] p-0 overflow-hidden">
      <div class="h-full flex flex-col">
        <div class="px-4 py-3 border-b border-border flex items-center justify-between gap-4">
          <div class="min-w-0">
            <div class="text-base font-semibold truncate">
              {{ previewTitle || '视图预览' }}
            </div>
            <div class="text-xs text-muted-foreground truncate">
              只读预览（不支持编辑与保存）
            </div>
          </div>
          <Button variant="outline" size="sm" @click="isPreviewOpen = false">关闭</Button>
        </div>
        <div class="flex-1 bg-background">
          <iframe
            v-if="previewUrl"
            :src="previewUrl"
            class="w-full h-full"
            frameborder="0"
          />
        </div>
      </div>
    </DialogContent>
  </Dialog>

  <Dialog :open="isDeleteConfirmOpen" @update:open="isDeleteConfirmOpen = $event">
    <DialogContent class="sm:max-w-[420px]">
      <DialogHeader>
        <DialogTitle>删除视图</DialogTitle>
        <DialogDescription>确定要删除这个视图吗？此操作不可撤销。</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline" @click="isDeleteConfirmOpen = false">取消</Button>
        <Button variant="destructive" :disabled="deleteTargetId == null" @click="confirmDelete">删除</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ArrowLeft, Trash2, Eye } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

const router = useRouter()
const savedViews = ref<any[]>([])
const route = useRoute()
const isPreviewOpen = ref(false)
const previewUrl = ref('')
const previewTitle = ref('')
const isDeleteConfirmOpen = ref(false)
const deleteTargetId = ref<number | null>(null)

const loadViews = async () => {
  try {
    const { success, data, error } = await $fetch('/api/saved-views', {
      params: { projectId: route.query.projectId }
    })
    
    if (success) {
      savedViews.value = data
    } else {
      throw new Error(error)
    }
  } catch (e) {
    console.error('Failed to load views', e)
    toast.error('加载视图失败')
  }
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleString()
}

const deleteView = async (id: number) => {
  try {
    const { success, error } = await $fetch(`/api/saved-views/${id}`, {
      method: 'DELETE'
    })

    if (success) {
      savedViews.value = savedViews.value.filter(v => v.id !== id)
      toast.success('视图已删除')
    } else {
      throw new Error(error)
    }
  } catch (e) {
    console.error('Failed to delete view', e)
    toast.error('删除视图失败')
  }
}

const openDeleteConfirm = (id: number) => {
  deleteTargetId.value = id
  isDeleteConfirmOpen.value = true
}

const confirmDelete = async () => {
  if (deleteTargetId.value == null) return
  const id = deleteTargetId.value
  isDeleteConfirmOpen.value = false
  deleteTargetId.value = null
  await deleteView(id)
}

const openView = (id: number) => {
  const view = savedViews.value.find(v => v.id === id)
  previewTitle.value = view?.name || ''
  previewUrl.value = router.resolve({ path: '/', query: { viewId: id, projectId: route.query.projectId, preview: '1', embed: '1' } }).href
  isPreviewOpen.value = true
}

onMounted(() => {
  loadViews()
})
</script>
