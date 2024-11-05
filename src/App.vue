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

.wrapper {
  max-width: 768px;
  margin: 0 auto;
  height: 100%;
}

.page {
  height: 100%;
  padding: calc(var(--step) * 2);
  box-sizing: border-box;
  background-color: var(--light-color);
}
</style>
