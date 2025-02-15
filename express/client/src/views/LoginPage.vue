<template>
  <global-wrap>
    <div class="login-page">
      <div class="login-container">
        <h2>登录</h2>
        <el-tabs v-model="activeTab" class="login-tabs">
          <!-- 账号密码登录 -->
          <el-tab-pane label="账号密码登录" name="account">
            <el-form
              ref="accountFormRef"
              :model="accountForm"
              :rules="accountRules"
              label-width="0"
            >
              <el-form-item prop="username">
                <el-input 
                  size="large"
                  v-model="accountForm.username"
                  placeholder="用户名/邮箱/手机号"
                  prefix-icon="User"
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input 
                  size="large"
                  v-model="accountForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="请输入密码"
                  prefix-icon="Lock"
                >
                  <template #suffix>
                    <el-icon 
                      class="password-eye" 
                      @click="showPassword = !showPassword"
                    >
                      <View v-if="showPassword" />
                      <Hide v-else />
                    </el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-button type="primary" size="large" @click="handleAccountLogin" :loading="loading">
                登录
              </el-button>
            </el-form>
          </el-tab-pane>

          <!-- 手机验证码登录 -->
          <el-tab-pane label="手机验证码登录" name="phone">
            <el-form
              ref="phoneFormRef"
              :model="phoneForm"
              :rules="phoneRules"
              label-width="0"
            >
              <el-form-item prop="phone">
                <el-input 
                  size="large"
                  v-model="phoneForm.phone"
                  placeholder="请输入手机号"
                  prefix-icon="Iphone"
                >
                  <template #append>
                    <el-button 
                      :disabled="!!countdown || loading"
                      @click="handleSendCode"
                    >
                      {{ countdown ? `${countdown}s` : '获取验证码' }}
                    </el-button>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="code">
                <el-input 
                  size="large"
                  v-model="phoneForm.code"
                  placeholder="请输入验证码"
                  prefix-icon="Lock"
                />
              </el-form-item>
              <el-button type="primary" size="large" @click="handlePhoneLogin" :loading="loading">
                登录
              </el-button>
            </el-form>
          </el-tab-pane>

          <!-- 扫码登录 -->
          <el-tab-pane label="扫码登录" name="qrcode">
            <div class="qrcode-container">
              <div class="qrcode-box" ref="qrcodeRef">TODO</div>
              <p>请使用APP扫码登录</p>
            </div>
          </el-tab-pane>
        </el-tabs>

        <div class="login-footer">
          <el-checkbox v-model="rememberMe">记住我</el-checkbox>
          <router-link to="/forgot-password">忘记密码？</router-link>
        </div>
        <div class="register-link">
          还没有账号？<router-link to="/register">立即注册</router-link>
        </div>
      </div>
    </div>
  </global-wrap>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { ElMessage } from 'element-plus';
import { View, Hide } from '@element-plus/icons-vue';
import GlobalWrap from '../components/GlobalWrap.vue';
import ajax from '../utils/Ajax';
import QRCode from 'qrcode';
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

<style lang="scss" scoped>
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
      text-align: center;
      margin-bottom: 30px;
      color: var(--el-text-color-primary);
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

    .el-form {
      margin-top: 20px;

      .el-button {
        width: 100%;
        margin-top: 20px;
      }
    }

    .password-eye {
      cursor: pointer;
      color: var(--el-text-color-secondary);
      
      &:hover {
        color: var(--el-text-color-primary);
      }
    }

    .qrcode-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px 0;

      .qrcode-box {
        width: 200px;
        height: 200px;
        margin-bottom: 20px;
      }

      p {
        color: var(--el-text-color-secondary);
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
      color: var(--el-text-color-secondary);

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