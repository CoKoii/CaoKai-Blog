<script setup lang="ts">
import { useHead } from '@vueuse/head'
import Menu from '@/components/Admin/Menu/Menu.vue'
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
  <div class="Layout">
    <Menu />
    <div class="main">
      <div class="top">
        <div class="t"></div>
        <div class="b"></div>
      </div>
      <div class="content">
        <h1>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione itaque in deserunt
          voluptatum. Nihil molestiae repellat aspernatur sit, maxime nulla? Distinctio natus
          temporibus sit molestias? Qui itaque aperiam a tenetur.
        </h1>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './style.scss';
</style>
