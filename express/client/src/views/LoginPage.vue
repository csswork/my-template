<template>
  <global-wrap :hide_sidebar="true">
    <div class="login-page">

    </div>
  </global-wrap>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { View, Hide } from '@element-plus/icons-vue';
import GlobalWrap from '../components/GlobalWrap.vue';
import ajax from '../utils/Ajax';
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(false);
const activeTab = ref('account');
const showPassword = ref(false);
const rememberMe = ref(false);
const countdown = ref(0);

// Account form
const accountFormRef = ref(null);
const accountForm = reactive({
  username: '',
  password: ''
});

// Phone form
const phoneFormRef = ref(null);
const phoneForm = reactive({
  phone: '',
  code: ''
});

// Validation rules
const accountRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
};

const phoneRules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 6, message: '验证码为6位数字', trigger: 'blur' }
  ]
};

// Handle account login
const handleAccountLogin = async () => {
  if (!accountFormRef.value) return;
  
  await accountFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      try {
        const res = await ajax.post('/api/users/login', accountForm);
        if (res.data.success) {
          ElMessage.success('登录成功');
          // Store token and redirect
          localStorage.setItem('token', res.data.data.token);
          router.push('/');
        }
      } catch (error) {
        ElMessage.error(error.response?.data?.message || '登录失败');
      } finally {
        loading.value = false;
      }
    }
  });
};

// Handle phone login
const handlePhoneLogin = async () => {
  if (!phoneFormRef.value) return;
  
  await phoneFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      try {
        const res = await ajax.post('/api/users/login/phone', phoneForm);
        if (res.data.success) {
          ElMessage.success('登录成功');
          localStorage.setItem('token', res.data.data.token);
          router.push('/');
        }
      } catch (error) {
        ElMessage.error(error.response?.data?.message || '登录失败');
      } finally {
        loading.value = false;
      }
    }
  });
};

// Handle send verification code
const handleSendCode = async () => {
  if (!phoneForm.phone) {
    return ElMessage.warning('请先输入手机号');
  }
  
  loading.value = true;
  try {
    await ajax.post('/api/users/send-code', { phone: phoneForm.phone });
    countdown.value = 60;
    const timer = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(timer);
      }
    }, 1000);
    ElMessage.success('验证码已发送');
  } catch (error) {
    ElMessage.error(error.response?.data?.message || '发送失败');
  } finally {
    loading.value = false;
  }
};

</script>

<style lang="scss">
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 60px);
    background-color: var(--el-bg-color);

    .login-container {
      width: 400px;
      padding: 30px;
      background: var(--el-bg-color-overlay);
      border-radius: 8px;
      box-shadow: var(--el-box-shadow-light);

      h2 {
        margin-bottom: 24px;
        font-size: 20px;
        color: var(--Text-primary);
      }

      .login-tabs {
        :deep(.el-tabs__nav) {
          width: 100%;
          
          .el-tabs__item {
            flex: 1;
            text-align: center;
          }
        }
      }

      .ui-form {
        margin-top: 8px;

        // .ui-form-item {
        //   margin-bottom: 16px;
        // }

        .submit-btn {
          width: 100%;
          margin-top: 16px;
        }
      }

      .password-eye {
        cursor: pointer;
        color: var(--Text-secondary);
        
        &:hover {
          color: var(--el-text-color-primary);
        }
      }

      .qrcode-container {
        display: block;
        padding: 16px 0;

        .qrcode-box {
          width: 200px;
          height: 200px;
          margin: 0 auto 16px;
          position: relative;
        }

        p {
          color: var(--Text-secondary);
          font-size: 12px;
          text-align: center;
        }
      }

      .login-footer {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .register-link {
        margin-top: 15px;
        text-align: center;
        color: var(--Text-secondary);

        a {
          color: var(--el-color-primary);
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>