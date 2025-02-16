<template>
  <el-container>
    <global-sidebar v-if="!props.hide_sidebar" />
    <el-main class="main-content">
      <global-header  v-if="!props.hide_header" />
      <slot />
    </el-main>
  </el-container>
</template>

<script setup>
  import GlobalSidebar from './GlobalSidebar.vue';
  import GlobalHeader from './GlobalHeader.vue';

  const props = defineProps({
    hide_sidebar: {
      type: Boolean,
      default: false,
    },

    hide_header: {
      type: Boolean,
      default: false,
    },
  });

</script>

<style lang="scss"></style>
