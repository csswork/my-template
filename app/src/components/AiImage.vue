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
              <el-collapse v-model="active_names">
                <el-collapse-item name="1">
                  <template #title>
                    <h3>模型参数</h3>
                  </template>
                  <div>
                    <el-input
                      v-model="data.prompt"
                      :rows="6"
                      type="textarea"
                      placeholder="描述你想生成的图片，如：做一张插画风格的“新年”海报"
                      maxlength="600"
                      show-word-limit
                    />
                  </div>
                </el-collapse-item>
                <el-collapse-item name="2">
                  <template #title>
                    <h3>模型参数</h3>
                  </template>
                  <div class="select-model">
                    <div class="selected-model">
                      <img :src="selected_model.image" alt="model" />
                      <div>
                        <h4>{{ selected_model.label }}</h4>
                        <p>{{ selected_model.desc }}</p>
                      </div>
                      <setting-config theme="outline" size="16" fill="currentColor" :strokeWidth="2"/>
                    </div>
                  </div>
                </el-collapse-item>
                <el-collapse-item name="3">
                  <template #title>
                    <h3>模型参数</h3>
                  </template>
                  <div>
                    <el-input
                      v-model="data.prompt"
                      :rows="6"
                      type="textarea"
                      placeholder="描述你想生成的图片，如：做一张插画风格的“新年”海报"
                      maxlength="600"
                      show-word-limit
                    />
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-aside>
          <el-main>Main</el-main>
        </el-container>
      </el-container>
    </el-drawer>
  </div>
</template>
<script setup>
  import { ref, onMounted, computed } from 'vue';
  import GlobalHeader from './GlobalHeader.vue';
  

  import { 
    SettingConfig,
  } from '@icon-park/vue-next';

  import ajax from '@/utils/Ajax';
  import event from '@/utils/EventBus';

  const is_show_ai = ref(true);

  const data = ref({
    prompt: '',
    req_key: 'high_aes_general_v21_L',
    model_version: 'general_v2.1_L',
    // 默认值：general_v20_9B_pe
    // 标准版：general_v20_9B_rephraser
    // 美感版：general_v20_9B_pe
    req_schedule_conf: 'general_v20_9B_pe',
    seed: -1,
    // 影响文本描述的程度
    scale: 5,
    ddim_steps: 25,
    width: 512,
    height: 512,
    use_pre_llm: true,
    use_sr: true,
    return_img: true,
  });

  const active_names = ref(['1', '2', '3']);
  const models = ref([
    { 
      label: '图片2.1', 
      selected: true,
      image: require('@/assets/images/ai.webp'),
      desc: '稳定的结构和更强的影视质感，支持生成中、英文文字', 
      value: 'high_aes_general_v21_L' 
    },
    { 
      label: '图片2.0 Pro', 
      selected: false,
      image: require('@/assets/images/ai.webp'),
      desc: '大幅提升了多样性和真实的照片质感，开启创新与设计的视觉梦境', 
      value: 'high_aes_general_v21_L' 
    },
    { 
      label: '图片2.0', 
      selected: false,
      image: require('@/assets/images/ai.webp'),
      desc: '更精准的描述词响应和多样的风格组合，模型极具想象力！', 
      value: 'high_aes_general_v21_L' 
    },
    { 
      label: '图片 XL Pro', 
      selected: false,
      image: require('@/assets/images/ai.webp'),
      desc: '增强英文生成能力和参考图可控能力，使用引号强化文字效果', 
      value: 'high_aes_general_v21_L' 
    },
  ]);

  const ratios = ref([
    {
      label: '21:9',
      value: 21 / 9
    },
    {
      label: '16:9',
      value: 16 / 9
    },
    {
      label: '3:2',
      value: 3 / 2
    },
    { 
      label: '4:3', 
      value: 4 / 3 
    },
    { 
      label: '1:1', 
      value: 1 
    },
    { 
      label: '3:4', 
      value: 3 / 4 
    },
    { 
      label: '2:3', 
      value: 2 / 3
    },

    { 
      label: '9:16', 
      value: 9 / 16 
    },
  ]);

  const scale = ref(5);
  const width = ref(512);
  const height = ref(512);
  const ratio = ref(1);

  const selected_model = computed(() => {
    return models.value.find(item => item.selected);
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

      .ui-collapse {
        margin: 0 16px;
        border: none;

        .ui-collapse-item {
          margin: 16px 0;
        }
        
        .ui-collapse-item__header {
          background-color: transparent;
          border: none;
          --ui-collapse-header-height: auto;
          margin-bottom: 6px;

          h3 {
            font-weight: 500;
            font-size: 14px;
            color: var(--Text-primary);
          }
        }

        .ui-collapse-item__wrap,
        .ui-collapse-item__content {
          padding: 0;
          border: none;
          background-color: transparent;
        }
      }
    }
  }
</style>