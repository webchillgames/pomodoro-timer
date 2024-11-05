<template>
  <router-view></router-view>
</template>

<script lang="ts" setup></script>

<style lang="scss">
@import '@/styles/variables.css';

html,
body,
#app {
  height: 100%;
}

html,
body {
  font-family: 'Varela Round', sans-serif;
  font-weight: 400;
  font-style: normal;
  color: var(--text-color);
}
</style>
