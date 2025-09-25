<script setup lang="ts">
import { useHead } from '@vueuse/head'
useHead({
  title: "Cao Kai's Blog - 后台管理系统",
  meta: [
    {
      name: 'description',
      content: 'Cao Kai 的个人博客，分享前端、全栈和 AI 学习笔记。',
    },
    {
      name: 'keywords',
      content: '前端, 全栈, Vue, NestJS, AI, 博客',
    },
  ],
})
</script>

<template>
  <div class="Layout">
    <h1 style="color: black">6666</h1>
    <img v-lazy-img="'https://w.wallhaven.cc/full/8g/wallhaven-8go6ro.png'" height="700" />
    <h1 style="color: black">6666</h1>
  </div>
</template>

<style scoped lang="scss"></style>
