<template>
  <el-container>
    <global-sidebar />
    <el-main class="main-content">
      <global-header />
      <slot />
    </el-main>
  </el-container>
</template>

<script setup>
  import GlobalSidebar from './GlobalSidebar.vue';
  import GlobalHeader from './GlobalHeader.vue';

</script>

<style lang="scss"></style>
