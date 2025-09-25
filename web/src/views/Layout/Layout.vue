<script setup lang="ts">
import { useHead } from '@vueuse/head'
useHead({
  title: '后台管理系统',
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
  <div class="Layout"></div>
</template>

<style scoped lang="scss"></style>
