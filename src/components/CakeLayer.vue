<script setup lang="ts">
import { defineProps, computed } from 'vue'

interface DateRange {
  min: Date
  max: Date
  days: number
  hue?: number
}

const props = defineProps({
  base: {
    type: Object as () => DateRange,
    required: true
  },
  range: {
    type: Object as () => DateRange,
    required: true
  }
})

const offset = computed(() => {
  const ms = props.range.min.getTime() - props.base.min.getTime()

  const days = ms / 86400000
  return (days / props.base.days) * 100
})

const width = computed(() => {
  return (props.range.days / props.base.days) * 100
})

const color = computed(() => {
  const hue = props.range.hue ?? 0
  return `hsl(${hue}, 70%, 60%)`
})
</script>

<template>
  <div class="flex" style="height: 1em">
    <div :style="{ width: offset + '%' }" class="bg-none"></div>
    <div :style="{ width: width + '%', backgroundColor: color }" class="rounded"></div>
  </div>
</template>
