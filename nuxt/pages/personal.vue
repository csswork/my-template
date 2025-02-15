<template>
  <global-wrap>
    <div class="home-content">
      <div class="home-page">
        <!-- <el-button type="primary" @click="TestApi">Test AI</el-button> -->
        <h2 @click="openAI">Open AI</h2>
      </div>
    </div>
  </global-wrap>
</template>

<script setup>
import GlobalWrap from '../components/GlobalWrap.vue';
import event from '../utils/EventBus';
import ajax from '../utils/Ajax';


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
