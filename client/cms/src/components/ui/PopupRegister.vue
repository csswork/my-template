<template>
  
  <el-dialog
    v-model="is_show"
    width="520"
    class="popup-register"
  >
    <Register @success="close" />
  </el-dialog>

</template>

<script setup>
  import { ref } from 'vue';
  import Register from '../Register.vue'

  const is_show = ref(false);

  const open = () => {
    is_show.value = true;
  };

  const close = () => {
    is_show.value = false;
  };


  defineExpose({
    open,
    close
  });
</script>

<style lang="scss">
  body .popup-register {
    .ui-dialog__headerbtn {
      right: 16px;
      top: 32px;
    }
    
    .ui-dialog__header {
      padding: 0;
      background-color: transparent;
      border-bottom: none;
      height: 0;
      min-height: unset;
    }

    .ui-dialog__body {
      padding: 24px;
      background-color: transparent;
    }
  }
</style>