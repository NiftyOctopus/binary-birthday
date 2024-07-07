import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useBirthdayStore = defineStore('birthday', () => {
  const guess = ref(getStartingGuess())

  const min = ref<Date | null>(null)
  const max = ref<Date | null>(null)

  // Computed property indicating if we found the birthday (max and min are the same)
  const found = computed(
    () => min.value && max.value && min.value.getTime() === max.value.getTime()
  )

  function getStartingGuess() {
    const guess = new Date()

    // Get a random age between 20 and 60
    const age = Math.floor(Math.random() * 41) + 20

    // Set the year to the current year minus the age
    guess.setFullYear(guess.getFullYear() - age)

    // Set the date to the most common birthday
    // Google says it's September 9th
    guess.setMonth(8)
    guess.setDate(9)
    return guess
  }

  function earlier() {
    // Subtract 50 years until we have found the first minimum date
    let nextGuess = addYears(guess.value, -50)

    // If we have found the min
    if (min.value) {
      // Next guess is halfway between current guess and min
      const guessTime = guess.value.getTime()
      const timeRange = guessTime - min.value.getTime()
      nextGuess = new Date(guessTime - timeRange / 2)
    }

    // We can also update the max value since we know it's earlier than the guess
    if (!max.value || guess.value < max.value) {
      max.value = new Date(guess.value)
    }

    // Update the guess
    guess.value = new Date(nextGuess)
  }

  function later() {
    // Add 50 years until we have found the first maximum date
    let nextGuess = addYears(guess.value, 50)

    // If we have found the max
    if (max.value) {
      // Next guess is halfway between current guess and max
      const guessTime = guess.value.getTime()
      const timeRange = max.value.getTime() - guessTime
      nextGuess = new Date(guessTime + timeRange / 2)
    }

    // We can also update the min value since we know it's later than the guess
    if (!min.value || guess.value > min.value) {
      min.value = new Date(guess.value)
    }

    // Update the guess
    guess.value = new Date(nextGuess)
  }

  function addYears(date: Date, years: number) {
    const newDate = new Date(date)
    newDate.setFullYear(newDate.getFullYear() + years)
    return newDate
  }

  return { guess, min, max, earlier, later, found }
})
