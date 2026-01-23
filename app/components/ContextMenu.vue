<template>
  <div v-if="visible" class="fixed inset-0 z-40" @click="close" @contextmenu.prevent="close"></div>
  <div 
    v-if="visible" 
    class="fixed z-50 min-w-[160px] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 zoom-in-95"
    :style="{ top: `${y}px`, left: `${x}px` }"
  >
    <div 
      v-for="item in items" 
      :key="item.label"
      class="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 gap-2"
      @click="handleAction(item)"
    >
      <component :is="item.icon" v-if="item.icon" class="w-4 h-4" />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  visible: boolean
  x: number
  y: number
  items: Array<{ label: string, action: Function, icon?: any }>
}>()

const emit = defineEmits(['close'])

const close = () => emit('close')

const handleAction = (item: any) => {
  item.action()
  close()
}
</script>
