<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="w-[95vw] max-w-[1400px] h-[85vh] p-0 overflow-hidden" :hide-close="true">
      <div class="h-full flex flex-col">
        <div class="px-4 py-3 border-b border-border flex items-center justify-between gap-4">
          <div class="min-w-0">
            <div class="text-base font-semibold truncate">
              {{ title }}
            </div>
            <div class="text-xs text-muted-foreground truncate">
              只读预览
            </div>
          </div>
          <Button variant="outline" size="sm" @click="$emit('update:open', false)">关闭</Button>
        </div>
        <div class="flex-1 bg-background relative">
          <iframe
            v-if="url"
            :src="url"
            class="w-full h-full"
            frameborder="0"
          />
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'

defineProps<{
  open: boolean
  url: string
  title: string
}>()

defineEmits<{
  (e: 'update:open', value: boolean): void
}>()
</script>
