<script setup lang="ts">
import { computed } from 'vue'
import { useBirthdayStore } from '@/stores/birthday'
const store = useBirthdayStore()

const firstRange = computed(() => store.ranges[0])
const lastRange = computed(() => store.ranges[store.ranges.length - 1])

const offset = computed(() => {
  if (!firstRange.value || !lastRange.value) return 0
  const ms = lastRange.value.min.getTime() - firstRange.value.min.getTime()

  const days = ms / 86400000
  return (days / firstRange.value.days) * 100
})

const width = computed(() => {
  if (!firstRange.value || !lastRange.value) return 100
  const targetWidth = (lastRange.value.days / firstRange.value.days) * 100
  return Math.max(targetWidth, 1)
})

const color = computed(() => {
  const hue = lastRange.value?.hue ?? 200
  return `hsl(${hue}, 70%, 60%)`
})
</script>

<template>
  <div class="flex w-2/3 bg-slate-200 rounded-md" style="height: 1.5em">
    <div :style="{ width: offset + '%' }" class="bg-none"></div>
    <div
      :style="{ width: width + '%', backgroundColor: color }"
      class="rounded-md relative text-xs text-slate-500"
    >
      <div
        class="absolute left-0 -translate-x-full h-full flex flex-col justify-center p-1.5"
        v-if="lastRange"
      >
        {{ lastRange.min.toLocaleDateString() }}
      </div>
      <div
        class="absolute right-0 translate-x-full h-full flex flex-col justify-center p-1.5"
        v-if="lastRange"
      >
        {{ lastRange.max.toLocaleDateString() }}
      </div>
    </div>
  </div>
</template>
