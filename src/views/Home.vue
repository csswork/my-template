<template>
  <global-wrap>
    <div class="home-content">
      <div class="home-page">
        <h2>Open AI</h2>
      </div>
    </div>
  </global-wrap>
</template>

<script setup>
import router from '../router';
import GlobalWrap from '../components/GlobalWrap.vue';
</script>

<style lang="scss">
.home-content {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  .home-page {
    h2 {
      margin-bottom: 20px;
    }
  }
}
</style>
