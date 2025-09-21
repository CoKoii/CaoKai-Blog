<script setup lang="ts"></script>

<template>
  <div class="Login">
    <h1 class="logo">Cao Kai's Blog</h1>
    <div class="form">
      <div class="title">后台管理入口</div>
      <div class="desc">Edit / Publish Articles Online</div>
      <div class="form">
        <div class="account">
          <input type="text" placeholder="请输入用户名" />
        </div>
        <div class="password">
          <input type="password" placeholder="请输入密码" />
        </div>
        <div class="submit">
          <button>登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './style.scss';
</style>
