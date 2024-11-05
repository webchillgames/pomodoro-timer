<script lang="ts" setup>
import { computed } from 'vue'
import { formatTimerData } from './formatting'
type Props = {
  timer: number
}

const props = defineProps<Props>()

const formattedTimer = computed(() => {
  return formatTimerData(props.timer)
})
</script>

<template>
  <div class="pomodoro-timer">
    <div class="pomodoro-timer__content">
      <p>{{ formattedTimer }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.pomodoro-timer {
  display: flex;
  justify-content: center;

  &__content {
    width: 300px;
    height: 300px;
    background-image: url('@/assets/tomato.png');
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;

    p {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-weight: 700;
      font-size: 40px;
      line-height: 45px;
    }
  }
}
</style>
