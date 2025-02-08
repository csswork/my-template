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

const generateImage = () => {
  const obj = {
    req_key: 'high_aes_general_v21_L',
    model_version: 'general_v2.1_L',
    prompt: '千军万马',

    // 默认值：general_v20_9B_pe
    // 标准版：general_v20_9B_rephraser
    // 美感版：general_v20_9B_pe
    req_schedule_conf: 'general_v20_9B_pe',

    // 随机种子，作为确定扩散初始状态的基础，默认-1（随机）。若随机种子为相同正整数且其他参数均一致，则生成图片极大概率效果一致
    // 默认值：-1
    seed: -1,

    // 影响文本描述的程度
    // 默认值：3.5
    // 取值范围：[1, 10]
    scale: 5,

    // 生成图像的步数，建议使用默认值，过大会造成延迟增加而服务超时
    // 默认值：25
    // 取值范围：[1, 200]
    // 推荐取值范围：[1, 50]
    ddim_steps: 25,

    // 生成图像的宽
    // 默认值：512
    // 取值范围：[256, 768]
    width: 512,

    // 生成图像的高
    // 默认值：512
    // 取值范围：[256, 768]
    height: 512,

    // 开启文本扩写，会针对输入prompt进行扩写优化，如果输入prompt较短建议开启，如果输入prompt较长建议关闭
    use_pre_llm: true,

    // 内置的超分功能，开启后可将上述宽高均乘以2返回，此参数打开后延迟会有增加
    // 如上述宽高均为512和512，此参数关闭出图 512*512 ，此参数打开出图1024 * 1024
    use_sr: true,

    // 输出是否返回图片链接 （链接有效期为24小时）
    // 如果期望返回永久地址或者二次处理，可以接入：veImageX https://www.volcengine.com/docs/508/1363002
    return_url: true,

    // 水印信息
    // logo_info: false
  }

  ajax.post('/ai', obj).then(res => {
    console.log(res);
  });
};

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
