<script setup lang="ts"></script>

<template>
  <div class="Login">
    <h1 class="logo">Cao Kai's Blog</h1>
    <div class="content">
      <div class="text">
        <h1>嘿 👋</h1>
        <h2>今天打算写点什么呢？</h2>
        <div class="text-img">
          <p class="alert">
            这是博客的后台管理中心<br />
            在这里你可以轻松编辑和发布文章
          </p>
          <img src="../../assets/imgs/write.svg" alt="" />
        </div>
      </div>
      <div class="form">
        <div class="dlzh">登陆账号</div>
        <form style="display: contents">
          <input type="text" placeholder="请输入你的账号名称或邮箱" autocomplete="username" />
          <input type="password" placeholder="输入你的密码" autocomplete="current-password" />
        </form>
        <p class="qr">扫码登陆</p>
        <button>登录</button>
        <div class="line">我见青山多妩媚</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './style.scss';
</style>
