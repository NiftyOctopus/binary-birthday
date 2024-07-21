<script setup lang="ts">
import { useBirthdayStore } from '@/stores/birthday'
const store = useBirthdayStore()

import CakeGraphic from '@/components/CakeGraphic.vue'
</script>

<template>
  <main class="absolute inset-0 flex flex-col justify-center items-center gap-5">
    <CakeGraphic />

    <section class="flex items-center gap-5">
      <div>
        <button @click="store.earlier">Earlier</button>
      </div>

      <div class="flex flex-col items-center gap-3">
        <h2 class="text-xl">Is this your birthday?</h2>
        <h1 class="text-3xl">{{ store.guess.toLocaleDateString() }}</h1>

        <!-- <button>That's it!</button> -->

        <div v-if="store.found">
          <p>Congratulations! It's your birthday!</p>
        </div>

        <p>{{ store.count }} Guesses</p>
      </div>

      <div>
        <button @click="store.later">Later</button>
      </div>
    </section>
  </main>
</template>
