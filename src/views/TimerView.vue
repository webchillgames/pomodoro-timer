<template>
  <div class="page timer-view">
    <div class="timer-view__wrapper wrapper">
      <div>
        <router-link to="/settings">Settings</router-link>
        <span>Timer</span>
      </div>

      <div class="timer-view__timer">
        <div class="timer-view__timer-value">
          {{ formattedTimer }}
        </div>
        <TomatoImg />
      </div>

      <div class="controls">
        <button type="button" @click="toggleTimer">
          <span v-if="status === 'start'">Pаuse</span>
          <span v-else>Start</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TomatoImg from '@/elements/TomatoImg.vue'

import { useTimerStore } from '@/stores/timer'
import { computed, onUnmounted, ref, watchEffect } from 'vue'

const { focusTime } = useTimerStore()

const status = ref('pause')
const timer = ref(focusTime * 60)

let intervalId: number

function toggleTimer() {
  status.value = status.value === 'start' ? 'pause' : 'start'
}

watchEffect(() => (status.value === 'start' ? startTimer() : stopTimer()))

onUnmounted(stopTimer)

function stopTimer() {
  clearInterval(intervalId)
}

function startTimer() {
  intervalId = setInterval(() => {
    timer.value = timer.value - 1

    if (timer.value === 0) {
      stopTimer()
    }
  }, 1000)
}

const formattedTimer = computed(() => {
  const hours = Math.floor(timer.value / 3600)
  const min = Math.floor((timer.value - hours * 3600) / 60)
  const sec = timer.value - hours * 3600 - min * 60

  return `${addZero(hours)}:${addZero(min)}:${addZero(sec)}`
})

function addZero(num: number): string {
  return num.toString().padStart(2, '0')
}
</script>

<style lang="scss">
@import '@/styles/controls.css';

.timer-view {
  &__timer {
    color: #fff;
    font-weight: 700;
    font-size: 40px;
    line-height: 45px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 200px;
    }
  }

  &__timer-value {
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__wrapper {
    display: grid;
    grid-template-rows: max-content 1fr max-content;
  }
}
</style>
