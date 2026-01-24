<template>
  <TooltipProvider>
    <div class="h-screen w-screen p-0 m-0 flex flex-col overflow-hidden bg-background">
      <header class="bg-gray-800 text-white p-4 flex justify-between items-center shrink-0">
        <h1 class="text-xl font-bold">DB Pivot</h1>
      </header>
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
</script>

<style>
@import 'vue-sonner/style.css';

body {
  margin: 0;
  overflow: hidden;
}
</style>