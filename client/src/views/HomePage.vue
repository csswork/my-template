<template>
  <global-wrap>
    <div class="home-page">

    </div>
  </global-wrap>
</template>

<script setup>
import GlobalWrap from '../components/GlobalWrap.vue';
import event from '../utils/EventBus';
import ajax from '../utils/Ajax';


</script>

<style lang="scss">
  .home-page {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    
    h2 {
      margin-bottom: 20px;
      cursor: pointer;
    }
  }
</style>
