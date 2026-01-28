<template>
  <TooltipProvider>
    <div class="h-screen w-screen p-0 m-0 flex flex-col overflow-hidden bg-background">
      <div class="flex-1 overflow-hidden relative">
        <NuxtPage />
      </div>
      <Toaster />
    </div>
  </TooltipProvider>
</template>

<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useDark } from '@vueuse/core'

useDark({
  selector: 'body',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
  storageKey: 'db-pivot-theme',
})
</script>

<style>
@import 'vue-sonner/style.css';

body {
  margin: 0;
  overflow: hidden;
}
</style>
