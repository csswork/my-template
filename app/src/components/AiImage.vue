<template>
  <div class="ai-image-wrap">
    <el-drawer
      class="ai-image-drawer"
      v-model="is_show_ai"
      title="AI Image Drawer"
      direction="rtl"
      size="100%"
    >
      <el-container class="drawer-container">
        <el-header>
          <global-header title="返回" :back_func="() => { is_show_ai = false; }" heading="图片生成" icon="Close" />
        </el-header>
        <el-container>
          <el-aside width="420px">
            <div class="col">
              <div class="form-item">
                <h3>图片生成</h3>
                <el-input
                  v-model="data.prompt"
                  :rows="6"
                  type="textarea"
                  placeholder="描述你想生成的图片，如：做一张插画风格的“新年”海报"
                  maxlength="600"
                  show-word-limit
                />
              </div>
              <div class="form-item">
                <h3>模型</h3>
                <el-input
                  v-model="data.prompt"
                  :rows="6"
                  type="textarea"
                  placeholder="描述你想生成的图片，如：做一张插画风格的“新年”海报"
                  maxlength="600"
                  show-word-limit
                />
              </div>
            </div>
          </el-aside>
          <el-main>Main</el-main>
        </el-container>
      </el-container>
    </el-drawer>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import GlobalHeader from './GlobalHeader.vue';

  import ajax from '@/utils/Ajax';
  import event from '@/utils/EventBus';

  const is_show_ai = ref(true);

  const data = ref({
    prompt: '',
    req_key: 'high_aes_general_v21_L',
    model_version: 'general_v2.1_L',
    req_schedule_conf: 'general_v20_9B_pe',
    seed: -1,
    scale: 5,
    ddim_steps: 25,
    width: 512,
    height: 512,
    use_pre_llm: true,
    use_sr: true,
    return_img: true,
  });




  onMounted(() => {
    event.on('open-ai', () => {
      is_show_ai.value = true;
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
  }

      
  .drawer-container {
    height: 100%;

    .ui-aside {
      padding: 0 24px 24px;

      .col {
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: var(--Radius-large);
        background-color: var(--Bg-01);
        height: 100%;
      }

      .form-item {
        margin: 16px;

        & > h3 {
          font-weight: 500;
          margin-bottom: 6px;
          color: var(--Text-primary);
        }
      }
    }
  }
</style>