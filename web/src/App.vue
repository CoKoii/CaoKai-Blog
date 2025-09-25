<script setup lang="ts"></script>

<template>
  <div class="App">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped lang="scss">
.App {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .fade-enter-active,
  .fade-leave-active {
    transition:
      opacity 0.2s ease,
      filter 0.2s ease,
      transform 0.2s ease;
  }
  .fade-enter-from {
    opacity: 0;
  }
  .fade-leave-to {
    opacity: 0;
    filter: blur(10px);
    transform: scale(1.2);
  }
}
</style>
