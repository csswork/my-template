<template>
  <el-container>
    <global-sidebar />
    <el-main class="main-content">
      <slot />
    </el-main>
  </el-container>
</template>

<script setup>
  import GlobalSidebar from './GlobalSidebar.vue';

</script>

<style lang="scss"></style>
