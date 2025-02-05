<template>
  <div class="ai-image-wrap">
    <el-drawer
      class="ai-image-drawer"
      v-model="is_show_ai"
      title="AI Image Drawer"
      direction="rtl"
      size="100%"
    >
      <header class="drawer-header">
        <el-button type="info" icon="Back" @click="drawerVisible = false">关闭</el-button>
      </header>
      <div class="drawer-content">
        <!-- Add your drawer content here -->
        <p>This is the drawer content</p>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'

  import ajax from '@/utils/Ajax';
  import { useGlobalStore } from '@/stores/Global';
  import event from '@/utils/EventBus';

  const Global = useGlobalStore();
  const is_show_ai = ref(false);




  onMounted(() => {
    event.on('open-ai', () => {
      drawerVisible.value = true;
    });
  });

</script>

<style lang="scss">
.ai-image-wrap {
  .ai-image-drawer {
    transition: all 0.5s ease !important;
    box-shadow: none;
    // opacity: 0;
    // transform: translateX(30%);

    &.open {
      opacity: 1;
    }

    .ui-drawer__header {
      display: none;
    }


  }

  .ui-drawer-fade {

    &-enter-from,
    &-leave-to {
      .ai-image-drawer.rtl {
        transform: translateX(10%) !important;
        opacity: 0;
      }
    }
  }

  .drawer-header {
    margin: 24px;
  }

      
  .drawer-content {
    margin: 24px;
  }
}
</style>