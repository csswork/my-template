<template>
  <global-wrap :hide_sidebar="true">
    <div class="register-page">
      <Register />
    </div>
  </global-wrap>
</template>

<script setup>
  import GlobalWrap from '../components/GlobalWrap.vue';
  import Register from '../components/Register.vue';
</script>

<style lang="scss">
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 60px);
  background-color: var(--Bg-01);

  .register-container {
    width: 480px;
    padding: 24px;
  }
}
</style>