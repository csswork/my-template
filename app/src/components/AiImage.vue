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
              <div class="tools">
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
                    <h4 class="sub-title">选择模型</h4>
                    <el-popover
                      placement="right"
                      trigger="click"
                      ref="model_popover"
                      :width="320"
                      popper-class="select-model"
                      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
                    >
                      <ul class="model-list">
                        <li v-for="model in models" :key="model.label" @click="selectModel(model)" :class="{ 'selected': model.selected }">
                          <img :src="model.image" alt="model" />
                          <div>
                            <h4>{{ model.label }} <CircleCheck v-if="model.selected" /></h4>
                            <p>{{ model.desc }}</p>
                          </div>
                        </li>
                      </ul>
                      <template #reference>
                        <div class="selected-model">
                          <img :src="selected_model.image" alt="model" />
                          <div>
                            <h4>{{ selected_model.label }}</h4>
                            <p>{{ selected_model.desc }}</p>
                          </div>
                          <SettingConfig theme="outline" size="16" :strokeWidth="2.8" />
                        </div>
                      </template>
                    </el-popover>
                    <div class="form-item">
                      <h4 class="sub-title" style="margin-bottom: 0;">
                        精细度
                        <el-tooltip content="数值越大，效果越好，生成的速度越慢。" placement="top" effect="light">
                          <Help theme="outline" size="14" :strokeWidth="2.8"/>
                        </el-tooltip>
                      </h4>
                      <div class="slider-wrap">
                        <el-slider v-model="data.scale" :min="1" :max="10" :step="1" />
                        <span class="count">{{ data.scale }}</span>
                      </div>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item name="2">
                    <template #title>
                      <h3>比例尺寸</h3>
                    </template>
                    <h4 class="sub-title">选择比例</h4>
                    <ul class="ratio-list">
                      <li
                        v-for="ratio in ratios"
                        :key="ratio.label"
                        :class="{ 'selected': ratio.active }"
                        @click="selectRatio(ratio)"
                      >
                        <i :class="['ratio-' + ratio.label.replace(':', '-')]"></i>
                        {{ ratio.label }}
                      </li>
                    </ul>
                    <div class="form-item">
                      <h4 class="sub-title" style="margin-bottom: 0;">
                        尺寸
                        <el-tooltip content="尺寸越大，效果越好，生成的速度越慢。" placement="top" effect="light">
                          <Help theme="outline" size="14" :strokeWidth="2.8"/>
                        </el-tooltip>
                      </h4>
                      <el-form-item>
                        <el-col :span="11">
                          <el-input v-model="data.width" 
                          @blur="() => { if (data.width < 512) data.width = 512; }"
                          :formatter="(value) => `${value}`" 
                          :parser="(value) => {
                            const parsed = value.replace(/[^0-9]/g, '');
                            let num = parseInt(parsed);
                            if (num > 1360) num = 1360;
                            return num ? num.toString() : '';
                          }"
                          />
                        </el-col>
                        <el-col class="text-center" :span="2">-</el-col>
                        <el-col :span="11">
                          <el-input v-model="data.height" 
                            @blur="() => { if (data.height < 512) data.height = 512; }"
                            :formatter="(value) => `${value}`" 
                            :parser="(value) => {
                              const parsed = value.replace(/[^0-9]/g, '');
                              let num = parseInt(parsed);
                              if (num > 1360) num = 1360;
                              return num ? num.toString() : '';
                            }"
                            />
                        </el-col>
                      </el-form-item>
                    </div>

                  </el-collapse-item>
                </el-collapse>
              </div>
              <footer class="submit-btn">
                <el-button type="primary" size="large" @click="generateImage" :loading="is_loading" :disabled="is_can_submit">
                  {{ is_loading ? '生成中...' : '生成图片' }}
                </el-button>
              </footer>
            </div>

     
          </el-aside>
          <el-main>
            <el-skeleton :loading="is_loading" animated>
              <template #template>
                <figure class="image-wrap" :style="{ width: image_width + 'px', height: image_height + 'px' }">
                  <el-skeleton-item variant="image" />
                </figure>
              </template>
              <template #default>
                <figure v-if="images.length !== 0" class="image-wrap" :style="{ width: image_width + 'px', height: image_height + 'px' }">
                  <img
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image"
                  />
                </figure>
              </template>
            </el-skeleton>
          </el-main>
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
    Help,
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

  const size = 480;
  const is_loading = ref(false);
  const images = ref([]);
  const image_width = ref(size);
  const image_height = ref(size);
  const model_popover = ref(null);
  const active_names = ref(['1', '2']);
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
      active: false,
      label: '21:9',
      value: 21 / 9
    },
    {
      active: false,
      label: '16:9',
      value: 16 / 9
    },
    {
      active: false,
      label: '3:2',
      value: 3 / 2
    },
    { 
      active: false,
      label: '4:3', 
      value: 4 / 3 
    },
    { 
      active: true,
      label: '1:1', 
      value: 1 
    },
    { 
      active: false,
      label: '3:4', 
      value: 3 / 4 
    },
    { 
      active: false,
      label: '2:3', 
      value: 2 / 3
    },

    { 
      active: false,
      label: '9:16', 
      value: 9 / 16 
    },
  ]);

  const selected_model = computed(() => {
    return models.value.find(item => item.selected);
  });

  const is_can_submit = computed(() => {
    return (data.value.prompt && data.value.width && data.value.height) ? false : true;
  });

  const selectRatio = (ratio) => {
    ratios.value.forEach(item => {
      item.active = false;
    });

    if (ratio.value === 1) {
      data.value.width = 512;
      data.value.height = 512;
    } else if (ratio.value > 1) {
      data.value.width = 1024;
      data.value.height = Math.floor(1024 / ratio.value);
    } else {
      data.value.width = Math.floor(1024 * ratio.value);
      data.value.height = 1024;
    }

    ratio.active = true;

    // image_width.value = data.value.width;
    // image_height.value = data.value.height;

    // image max size 600
    if (ratio.value === 1) {
      image_width.value = size;
      image_height.value = size;
    } else if (ratio.value > 1) {
      image_width.value = size;
      image_height.value = Math.floor(size / ratio.value);
    } else {
      image_height.value = size;
      image_width.value = Math.floor(size * ratio.value);
    }
  };

  const selectModel = (model) => {
    models.value.forEach(item => {
      item.selected = false;
    });

    model.selected = true;
    model_popover.value.hide();
  };

  const generateImage = () => {
    is_loading.value = true;

    setTimeout(() => {
      is_loading.value = false;
      images.value = [
        'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      ];
    }, 2000);
    // ajax.post('/ai', data.value).then(res => {
    //   console.log(res);
    //   is_loading.value = false;
    // });
  };


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

  .i-icon {

    svg {
      display: block;
      fill: none;
    }
  }
      
  .drawer-container {
    height: 100%;

    .ui-aside {
      padding: 0 24px 24px;

      .col {
        border: 1px solid var(--ui-border-color);
        border-radius: var(--Radius-large);
        background-color: var(--Bg-01);
        height: 100%;
        display: grid;
        grid-template-rows: 1fr auto;
        overflow: hidden;

        .tools {
          overflow-y: auto;
          height: 100%;

          & > .form-item {
            border-bottom: 1px solid var(--Border-default);
            margin: 0;
            padding: 16px;
            padding-bottom: 16px;
          }
        }
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
        border: none;

        .ui-collapse-item {
          margin: 16px 0;
          padding: 0 16px 16px;
          border-bottom: 1px solid var(--Border-default);

          &:last-child {
            border-bottom: none;
          }
        }

        .form-item {
          margin: 16px 0;
        }
        
        .ui-collapse-item__header {
          background-color: transparent;
          border: none;
          --ui-collapse-header-height: auto;
          margin-bottom: 10px;

          h3 {
            font-weight: 500;
            font-size: 14px;
            color: var(--Text-primary);
          }
        }

        .sub-title {
          color: var(--Text-secondary);
          margin-bottom: 6px;
          font-weight: normal;
          display: flex;
          align-items: center;

          svg {
            margin-left: 4px;
          }
        }

        .ui-collapse-item__wrap,
        .ui-collapse-item__content {
          padding: 0;
          border: none;
          background-color: transparent;
        }
      }

      .selected-model {
        display: flex;
        align-items: center;
        border: 1px solid var(--ui-border-color);
        border-radius: var(--Radius);
        background-color: var(--Bg-light);
        padding-right: 16px;
        cursor: pointer;
        transition: all 0.2s ease;
        color: var(--Text-default);

        div {
          flex: 1;
          line-height: 1.6;
        }

        img {
          width: 52px;
          height: 52px;
          border-radius: var(--Radius);
          margin-right: 16px;
        }

        h4 {
          font-weight: 500;
          color: var(--Text-primary);
          transition: all 0.2s ease;
        }

        .i-icon {
          display: block;

          svg {
            display: block;
          }
        }

        p {
          font-size: 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 220px;
        }

        &[aria-describedby],
        &:hover {
          background-color: var(--Neu-20);
          border-color: var(--Neu-60);
          color: var(--Text-brand);

          h4 {
            color: var(--Text-brand);
          }
        }
      }

      .slider-wrap {
        display: flex;
        align-items: center;

        .count {
          margin-left: 16px;
          font-size: 14px;
          color: var(--Text-secondary);
        }
      }


      .ui-form-item {
        text-align: center;

        .ui-input__inner {
          text-align: center;
        }
      }

      .submit-btn {
        padding: 16px;
        text-align: center;
        border-top: 1px solid var(--ui-border-color);
        background-color: var(--Bg-01);

        .ui-button {
          height: 44px;
          width: 100%;
          background: linear-gradient(125deg, var(--Neu-70) 0%, var(--Violet-20) 100%);
          border: none;

          &:hover {
            background: linear-gradient(125deg, var(--Neu-80) 0%, var(--Violet-30) 100%);
          }
          
          &[aria-disabled="true"] {
            background: var(--Neu-20);
            color: var(--Text-disabled);
          }
        }
      }
    }
    
    & > .ui-container {
      height: calc(100vh - 64px);
    }


    .ui-main {
      margin-right: 24px;
      margin-bottom: 24px;
      background-color: var(--Bg-01);
      border-radius: var(--Radius-large);
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      .ui-skeleton {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        padding: 0 0 100%;
        height: 0;


      }


      .image-wrap {
        position: absolute;
        width: calc(100% - 36px);
        height: calc(100% - 36px);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: red;

        img,
        .ui-skeleton__item {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          object-fit: cover;
        }
      }

    }
  }

  .select-model {
    padding: 8px !important;

    .model-list {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        cursor: pointer;
        transition: all 0.2s ease;
        padding: 8px;
        border-radius: var(--Radius-large);
        display: flex;
        align-items: center;
        margin: 4px;
        border: 1px solid transparent;




        img {
          width: 64px;
          height: 64px;
          border-radius: var(--Radius-large);
          margin-right: 16px;
        }

        h4 {
          font-weight: 500;
          color: var(--Text-primary);
          margin-bottom: 4px;
          display: flex;
          align-items: center;
        }

        p {
          font-size: 12px;
          color: var(--Text-default);
          // max two line
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        &:hover {
          background-color: var(--Neu-10);
        }

        &.selected {
          background-color: var(--Neu-20);
          border-color: rgba(0, 0, 0, 0.08);

          svg {
            height: 16px;
            width: 16px;
            min-width: 16px;
            margin-left: 8px;
            color: var(--Text-brand);
          }
        }
      }
    }
  }

  .ratio-list {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin: 0 -4px;

    li {
      width: calc(25% - 8px);
      margin: 4px;
      cursor: pointer;
      transition: all 0.2s ease;
      border-radius: var(--Radius);
      background-color: var(--Bg-light);
      color: var(--Text-primary);
      border: 1px solid var(--ui-border-color);
      text-align: center;
      padding: 6px;

      i {
        display: block;
        height: 32px;
        position: relative;
        width: 32px;
        margin: 4px auto 2px;

        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: var(--Neu-20);
          border: 1px solid var(--Neu-40);
          border-radius: var(--Radius-small);
        }

        &.ratio-21-9::before {
          padding-top: 42.857%;
          width: 100%;
        }

        &.ratio-16-9::before {
          padding-top: 56.25%;
          width: 100%;
        }

        &.ratio-3-2::before {
          padding-top: 66.666%;
          width: 100%;
        }

        &.ratio-4-3::before {
          padding-top: 75%;
          width: 100%;
        }

        &.ratio-1-1::before {
          padding-top: 100%;
          width: 100%;
        }

        &.ratio-3-4::before {
          padding-top: 100%;
          width: 75%;
        }

        &.ratio-2-3::before {
          padding-top: 100%;
          width: 66.66%;
        }

        &.ratio-9-16::before {
          padding-top: 100%;
          width: 56.25%;
        }
      }

      &.selected {
        background-color: var(--Neu-20);
        border-color: var(--Neu-60);
        color: var(--Text-brand);

        i::before {
          background-color: var(--Neu-40);
        }
      }
    }
  }

</style>