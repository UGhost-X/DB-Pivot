<script setup lang="ts">
import type { AccordionRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { AccordionRoot } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<AccordionRootProps & { class?: HTMLAttributes["class"] }>()
const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <AccordionRoot v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </AccordionRoot>
</template>
