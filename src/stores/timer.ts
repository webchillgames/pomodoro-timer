import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useTimerStore = defineStore('timer', () => {
  const focusTime = ref(25)
  const breakTime = ref(25)
  const sections = ref(2)

  function changeFocusTime(v: number) {
    focusTime.value = v
  }

  function changeBreak(v: number) {
    breakTime.value = v
  }

  function changeSections(v: number) {
    sections.value = v
  }

  return {
    focusTime,
    breakTime,
    sections,
    changeFocusTime,
    changeBreak,
    changeSections,
  }
})
