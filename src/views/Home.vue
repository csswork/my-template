<template>
  <global-wrap>
    <div class="home-content">
      <div class="home-page">
        <h2 @click="openAI">Open AI</h2>
      </div>
    </div>
  </global-wrap>
</template>

<script setup>
import router from '../router';
import GlobalWrap from '../components/GlobalWrap.vue';
import event from '../utils/EventBus';

const openAI = () => {
  event.emit('open-ai');
};
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
      cursor: pointer;
    }
  }
}
</style>
