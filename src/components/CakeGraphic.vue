<script setup lang="ts">
import { useBirthdayStore } from '@/stores/birthday'
const store = useBirthdayStore()

import CakeLayer from '@/components/CakeLayer.vue'
</script>

<template>
  <div class="flex flex-col-reverse w-3/4">
    <CakeLayer
      :base="store.ranges[0]"
      :range="range"
      v-for="range in store.ranges"
      :key="range.days"
    />
  </div>
</template>
