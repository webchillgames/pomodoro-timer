<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import {
  generateBreakOptions,
  generateRepeatsOptions,
  generateTimeOptions,
} from './settings.utils'

type Props = {
  data: SettingsData
}

type SettingsData = {
  focusTime: number
  breakTime: number
  repeats: number
}

defineProps<Props>()

const focusTimeOptions = generateTimeOptions()
const breakOptions = generateBreakOptions()
const repeatsOptions = generateRepeatsOptions()

const visibleMenu = ref('')

function changeVisibleMenu(title: string) {
  visibleMenu.value = visibleMenu.value === title ? '' : title
}
</script>

<template>
  <div class="timer-settings">
    <ul>
      <li>
        <button
          type="button"
          @click="changeVisibleMenu('focuse-time')"
          class="timer-settings__opener"
        >
          <span>Focuse</span> <span>{{ data.focusTime }} min</span>
        </button>

        <Transition mode="out-in" name="submenu">
          <div
            v-if="visibleMenu === 'focuse-time'"
            class="timer-settings__submenu"
          >
            <button
              v-for="t in focusTimeOptions"
              :key="t"
              type="button"
              @click="$emit('changeFocusTime', t)"
            >
              {{ t }}
            </button>
          </div>
        </Transition>
      </li>

      <li>
        <button
          type="button"
          @click="changeVisibleMenu('break-time')"
          class="timer-settings__opener"
        >
          <span>Break</span> <span>{{ data.breakTime }} min</span>
        </button>
        <Transition mode="out-in" name="submenu">
          <div
            v-if="visibleMenu === 'break-time'"
            class="timer-settings__submenu"
          >
            <button
              v-for="br in breakOptions"
              :key="br"
              type="button"
              @click="$emit('changeBreakTime', br)"
            >
              {{ br }}
            </button>
          </div>
        </Transition>
      </li>

      <li>
        <button
          type="button"
          @click="changeVisibleMenu('repeats')"
          class="timer-settings__opener"
        >
          <span> Repeats</span> <span>{{ data.repeats }}</span>
        </button>

        <Transition mode="out-in" name="submenu">
          <div
            v-if="visibleMenu === 'repeats'"
            class="timer-settings__submenu timer-settings__submenu--repeats"
          >
            <button
              v-for="r in repeatsOptions"
              :key="r"
              type="button"
              @click="$emit('changeRepeats', r)"
            >
              {{ r }}
            </button>
          </div>
        </Transition>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.submenu-enter-active,
.submenu-leave-active {
  transition: opacity 0.5s ease;
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
}

.timer-settings {
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: var(--step);
    padding: 0;
    margin: 0;
  }

  li {
    position: relative;
    background-color: var(--divider-color);
    border-radius: calc(var(--step) * 3);
    color: #fff;
    transition: all 0.2s;
    display: inline-block;
    vertical-align: center;
    box-shadow: var(--shadow);
    max-width: 300px;
  }

  &__submenu {
    box-shadow: var(--shadow);
    position: absolute;
    display: grid;
    grid-template-columns: 1fr;
    max-height: 100px;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none;
    background-color: rgba(133, 38, 20, 0.5);
    top: calc(100% + var(--step));
    left: 0;
    width: 100%;
    border-radius: 8px;

    button {
      color: #fff;
      padding: var(--step);
      background-color: transparent;
      transition: all 0.2s;

      &:hover {
        background-color: rgba(133, 38, 20, 0.7);
      }
    }
  }

  &__opener {
    color: inherit;
    padding: var(--step) calc(var(--step) * 2);
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: calc(var(--step) * 2);
    align-items: center;
    height: 40px;
    box-sizing: border-box;
  }

  button {
    background-color: transparent;
    border: none;
  }

  @media (max-width: 768px) {
    ul {
      grid-template-columns: 1fr;
      justify-content: center;
      grid-gap: calc(var(--step) * 2);
    }
  }
}
</style>
