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
    <div
      :style="{ width: width + '%', backgroundColor: color }"
      class="rounded relative text-xs text-slate-500"
    >
      <div class="absolute left-0 -translate-x-full h-full flex flex-col justify-center p-1.5">
        {{ props.range.min.toLocaleDateString() }}
      </div>
      <div class="absolute right-0 translate-x-full h-full flex flex-col justify-center p-1.5">
        {{ props.range.max.toLocaleDateString() }}
      </div>
    </div>
  </div>
</template>
