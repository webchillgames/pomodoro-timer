<template>
  <div class="settings-view page">
    <div class="settings-view__wrapper wrapper">
      <div class="settings-view__back">
        <router-link to="/"></router-link>
        <span>Settings</span>
      </div>

      <ul>
        <li
          @click="changeVisibleMenu('focuse-time')"
          :class="{ 'menu-is-opened': visibleMenu === 'focuse-time' }"
        >
          <button class="settings-view__opener">
            <span>Focuse time</span>
            <span>{{ focusTime }} min</span>
          </button>

          <Transition mode="out-in" name="submenu">
            <div
              v-if="visibleMenu === 'focuse-time'"
              class="settings-view__menu"
            >
              <button
                v-for="t in focusTimeOptions"
                :key="t"
                type="button"
                @click="changeFocusTime(t)"
              >
                {{ t }}
              </button>
            </div>
          </Transition>
        </li>
        <li
          @click="changeVisibleMenu('break')"
          :class="{ 'menu-is-opened': visibleMenu === 'break' }"
        >
          <button class="settings-view__opener">
            <span>Break time</span>
            <span>{{ breakTime }} min</span>
          </button>
          <Transition mode="out-in" name="submenu">
            <div v-if="visibleMenu === 'break'" class="settings-view__menu">
              <button
                v-for="b in breakOptions"
                :key="b"
                type="button"
                @click="changeBreak(b)"
              >
                {{ b }}
              </button>
            </div>
          </Transition>
        </li>
        <li
          @click="changeVisibleMenu('sections')"
          :class="{ 'menu-is-opened': visibleMenu === 'sections' }"
        >
          <button class="settings-view__opener">
            <span>Sections</span>
            <span>
              {{ sections }}
              interval{{ sections > 1 ? 's' : '' }}
            </span>
          </button>
          <Transition mode="out-in" name="submenu">
            <div
              v-if="visibleMenu === 'sections'"
              class="settings-view__menu settings-view__menu--sections"
            >
              <button
                v-for="s in sectionsOptions"
                :key="s"
                type="button"
                @click="changeSections(s)"
              >
                {{ s }}
              </button>
            </div>
          </Transition>
        </li>
      </ul>

      <div class="controls">
        <router-link to="/">Cancel</router-link>
        <router-link to="/timer">Go to timer</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTimerStore } from '@/stores/timer'
import { ref } from 'vue'
import {
  generateBreakOptions,
  generateSectionsOptions,
  generateTimeOptions,
} from './settings.utils'

const {
  focusTime,
  breakTime,
  sections,
  changeBreak,
  changeFocusTime,
  changeSections,
} = useTimerStore()
const visibleMenu = ref('')

const focusTimeOptions = generateTimeOptions()
const breakOptions = generateBreakOptions()
const sectionsOptions = generateSectionsOptions()

function changeVisibleMenu(title: string) {
  visibleMenu.value = visibleMenu.value === title ? '' : title
}
</script>

<style lang="scss">
.settings-view {
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      background-color: var(--divider-color);
      border-radius: calc(var(--step) * 3);
      color: #fff;
      margin: var(--step) 0;
      overflow: hidden;
      transition: all 0.2s;
    }
  }

  form {
    display: grid;
    grid-template-rows: 1fr max-content;
    grid-gap: calc(var(--step) * 5);
  }

  &__opener {
    position: relative;
    background-color: transparent;
    border: none;
    color: inherit;
    padding: var(--step) calc(var(--step) * 3);
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    box-sizing: border-box;

    &::after {
      mask-repeat: no-repeat;
      mask-position: center;
      mask-image: url('@/assets/angle-left.svg');
      mask-size: 15px auto;
      content: '';
      position: static;
      top: 0;
      right: 0;
      width: 30px;
      height: 100%;
      background-color: #fff;
      transform: rotate(-90deg);
    }
  }

  &__wrapper {
    display: grid;
    grid-template-rows: max-content 1fr;
    grid-gap: calc(var(--step) * 5);
  }

  &__back {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50%;

    a {
      mask-repeat: no-repeat;
      mask-position: center;
      mask-image: url('@/assets/angle-left.svg');
      mask-size: 15px auto;
      width: 30px;
      height: 30px;
      border: none;
      background-color: var(--text-color);
    }
  }

  &__menu {
    display: none;
    transition: all 0.2s;

    button {
      width: 100%;
      color: rgba(#fff, 0.6);
      padding: var(--step) 0;
      margin: 0;
      transition: all 0.2s;
      background-color: transparent;
      border: none;
      display: flex;
      justify-content: center;

      &:hover {
        color: rgba(#fff, 1);
        background-image: linear-gradient(
          to right top,
          rgba(200, 95, 49, 0.2),
          rgba(183, 81, 42, 0.2),
          rgba(166, 66, 34, 0.2),
          rgba(150, 52, 27, 0.2),
          rgba(133, 38, 20, 0.2)
        );
        box-shadow: rgba(255, 255, 255, 0.35) 0px 5px 15px;
      }
    }

    &--sections {
      height: calc(40px * 3);
      overflow-y: scroll;
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none;
    }
  }

  li.menu-is-opened .settings-view__menu {
    display: block;
  }
}

.submenu-enter-active,
.submenu-leave-active {
  transition: opacity 0.5s ease;
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
}
</style>
