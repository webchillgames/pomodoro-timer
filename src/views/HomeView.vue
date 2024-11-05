<script lang="ts" setup>
import { computed, onUnmounted, ref, watchEffect } from 'vue'

import PomodoroTimer from '@/components/PomodoroTimer.vue'
import TimerSettings from '@/components/TimerSettings.vue'

const focusTime = ref(25)
const breakTime = ref(5)
const repeats = ref(2)
const isTimerGoing = ref(false)
const timer = ref(focusTime.value * 60)

const data = computed(() => ({
  focusTime: focusTime.value,
  breakTime: breakTime.value,
  repeats: repeats.value,
}))

let intervalId: number

watchEffect(() => (isTimerGoing.value ? startTimer() : stopTimer()))

function startTimer() {
  intervalId = setInterval(() => {
    timer.value = timer.value - 1

    if (timer.value === 0) {
      stopTimer()
    }
  }, 1000)
}

onUnmounted(stopTimer)

function stopTimer() {
  clearInterval(intervalId)
}
</script>

<template>
  <div class="home-view page">
    <div class="wrapper home-view__wrapper">
      <div class="home-view__title">
        <h1>Pomodoro timer</h1>
        <p>Stay productive</p>
      </div>

      <TimerSettings
        :data="data"
        @changeFocusTime="e => (focusTime = e)"
        @changeBreakTime="e => (breakTime = e)"
        @changeRepeats="e => (repeats = e)"
      />

      <PomodoroTimer :timer="timer" />

      <button
        type="button"
        @click="isTimerGoing = !isTimerGoing"
        class="home-view__control"
      >
        <span>{{ isTimerGoing ? 'Pаuse' : 'Start' }}</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.home-view {
  a {
    text-align: center;
    text-decoration: none;
    border: none;
    color: #fff;
    padding: var(--step);
    border-radius: var(--step);
    width: 100%;
    max-width: 200px;
    background-image: linear-gradient(
      to right top,
      #c85f31,
      #b7512a,
      #a64222,
      #96341b,
      #852614
    );
    box-shadow: var(--shadow);
    display: inline-block;
    vertical-align: baseline;
  }

  &__wrapper {
    display: grid;
    grid-template-rows: repeat(4, max-content);
    grid-gap: calc(var(--step) * 3);
  }

  &__title {
    width: 300px;

    p,
    h1 {
      margin: 0;
    }

    h1 {
      color: var(--dark-color);
    }

    p {
      text-align: right;
    }
  }

  &__control {
    width: 150px;
    justify-self: center;
    border: none;
    color: #fff;
    border-radius: calc(var(--step) * 2);
    padding: var(--step);
    display: flex;
    justify-content: center;
    text-decoration: none;
    background-color: var(--main-color);
    box-shadow: var(--shadow);
  }
}
</style>
