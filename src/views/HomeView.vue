<script setup lang="ts">
import { useBirthdayStore } from '@/stores/birthday'
const store = useBirthdayStore()

// import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main class="absolute inset-0 flex justify-center items-center">
    <div>
      <button @click="store.earlier">Earlier</button>
      <p>{{ store.min?.toLocaleDateString() }}</p>
    </div>

    <div class="flex flex-col items-center">
      <h2 class="text-xl">Is this your birthday?</h2>
      <h1 class="text-3xl">{{ store.guess.toLocaleDateString() }}</h1>
      <p>15 Guesses</p>
      <div v-if="store.found">
        <p>Congratulations! It's your birthday!</p>
      </div>
    </div>

    <div>
      <button @click="store.later">Later</button>
      <p>{{ store.max?.toLocaleDateString() }}</p>
    </div>
  </main>
</template>
