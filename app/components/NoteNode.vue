<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { computed, ref, watch } from 'vue'
import { useVueFlow } from '@vue-flow/core'
import { useI18n } from '@/composables/useI18n'

const props = defineProps<{
  id?: string
  data: {
    text?: string
  }
  selected?: boolean
}>()

const { updateNodeData } = useVueFlow()
const { t } = useI18n()

const text = ref(props.data.text || '')

watch(
  () => props.data.text,
  (next) => {
    const safe = next || ''
    if (safe !== text.value) text.value = safe
  }
)

const onInput = (event: Event) => {
  const next = (event.target as HTMLTextAreaElement).value
  text.value = next
  if (!props.id) return
  updateNodeData(props.id, { text: next }, { replace: false })
}

const noteStyle = computed(() => ({
  background: [
    'radial-gradient(90% 140% at 50% 0%, rgba(250, 204, 21, 0.24) 0%, transparent 62%)',
    'radial-gradient(110% 160% at 0% 0%, rgba(59, 130, 246, 0.14) 0%, transparent 55%)',
    'radial-gradient(110% 160% at 100% 0%, rgba(236, 72, 153, 0.14) 0%, transparent 55%)',
    'linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--card)) 100%)',
  ].join(', '),
}))
</script>

<template>
  <Card
    class="min-w-[240px] max-w-[320px] overflow-hidden border border-amber-200/60 dark:border-amber-700/35 shadow-sm hover:shadow-lg transition-shadow bg-card text-foreground"
    :class="{ 'ring-2 ring-offset-2 ring-offset-background ring-amber-400/60': selected }"
  >
    <div class="px-3 py-2 border-b border-border/40" :style="noteStyle">
      <div class="text-[12px] font-semibold tracking-tight text-foreground/90">{{ t('note.title') }}</div>
    </div>
    <div class="p-3" :style="noteStyle">
      <textarea
        class="w-full min-h-[120px] resize-none bg-transparent outline-none text-sm leading-5 text-foreground placeholder:text-muted-foreground"
        :value="text"
        :placeholder="t('note.placeholder')"
        @input="onInput"
      />
    </div>
  </Card>
</template>
