<template>
  <global-wrap :hide_sidebar="true">
    <div class="login-page">
      <Login />
    </div>
  </global-wrap>
</template>

<script setup>
import GlobalWrap from '../components/GlobalWrap.vue';
import Login from '../components/Login.vue';

</script>

<style lang="scss">
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 60px);
    background-color: var(--Bg-01);

    .login-container {
      width: 420px;
    }
  }
</style>