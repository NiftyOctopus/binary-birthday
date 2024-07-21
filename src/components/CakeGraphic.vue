<script setup lang="ts">
import { computed } from 'vue'
import { useBirthdayStore } from '@/stores/birthday'
const store = useBirthdayStore()

// Just get the last n elements of the ranges array
const recentRanges = computed(() => store.ranges.slice(-7))

import CakeLayer from '@/components/CakeLayer.vue'
</script>

<template>
  <div class="flex flex-col-reverse w-3/4 gap-1">
    <CakeLayer
      :base="recentRanges[0]"
      :range="range"
      v-for="range in recentRanges"
      :key="range.days"
    />
  </div>
</template>
