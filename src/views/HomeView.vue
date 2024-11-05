<template>
  <div class="home-view page">
    <div class="wrapper grid">
      <div>
        <h1>Pomodoro timer</h1>
        <p>Stay productive</p>
      </div>

      <TomatoImg />

      <router-link :to="{ name: 'settings' }">Add timer</router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TomatoImg from '@/elements/TomatoImg.vue'
</script>

<style lang="scss">
.home-view {
  p,
  h1 {
    margin: 0;
  }

  h1 {
    color: var(--dark-color);
  }

  // img,
  // a {
  //   margin-top: calc(var(--step) * 5);
  // }

  img {
    height: 150px;
    width: auto;
  }

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
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  p {
    text-align: right;
  }
}
</style>
