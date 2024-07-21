import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useBirthdayStore = defineStore('birthday', () => {
  const guesses = ref<Date[]>([getStartingGuess()])

  const guess = computed(() => guesses.value[guesses.value.length - 1])
  const count = computed(() => guesses.value.length)

  const min = ref<Date | null>(null)
  const max = ref<Date | null>(null)

  interface DateRange {
    min: Date
    max: Date
    days: number
    hue?: number
  }
  const ranges = ref<DateRange[]>([])

  // Computed property indicating if we found the birthday (max and min are the same)
  // TODO: This is wrong, it just has to be the same day, not the same time.
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
      updateRanges()
    }

    // Update the guess
    updateGuess(nextGuess)
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
      updateRanges()
    }

    // Update the guess
    updateGuess(nextGuess)
  }

  function addYears(date: Date, years: number) {
    const newDate = new Date(date)
    newDate.setFullYear(newDate.getFullYear() + years)
    return newDate
  }

  function updateRanges() {
    if (max.value && min.value) {
      const days = (max.value.getTime() - min.value.getTime()) / 86400000

      const range = {
        min: min.value,
        max: max.value,
        days: Math.round(days),
        hue: Math.round(Math.random() * 360)
      }
      ranges.value = [...ranges.value, range]
    }
  }

  function updateGuess(newGuess: Date) {
    guesses.value.push(newGuess)
  }

  return { guess, count, min, max, earlier, later, found, ranges }
})
