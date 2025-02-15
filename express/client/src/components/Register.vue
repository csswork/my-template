<template>
  <div class="register-container">
    <h2>注册账号</h2>
    <el-tabs v-model="activeTab" class="register-tabs">
      <el-tab-pane label="账号密码注册" name="account">
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
              placeholder="请输入用户名"
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
          <el-form-item prop="confirmPassword">
            <el-input 
              size="large"
              v-model="accountForm.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="请确认密码"
              prefix-icon="Lock"
            >
              <template #suffix>
                <el-icon 
                  class="password-eye" 
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  <View v-if="showConfirmPassword" />
                  <Hide v-else />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input 
              size="large"
              v-model="accountForm.email"
              placeholder="请输入邮箱"
              prefix-icon="Message"
            />
          </el-form-item>
          <el-button class="submit-btn" type="primary" size="large" @click="handleAccountRegister" :loading="loading">
            注册
          </el-button>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="手机号注册" name="phone">
        <el-form
          ref="phoneFormRef"
          size="large"
          :model="phoneForm"
          :rules="phoneRules"
          label-width="0"
        >
          <el-form-item prop="phone">
            <el-input 
              v-model="phoneForm.phone"
              placeholder="请输入手机号"
              size="large"
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
          <el-button class="submit-btn" type="primary" size="large" @click="handlePhoneRegister" :loading="loading">
            注册
          </el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <div class="register-footer">
      已有账号？<router-link to="/login">立即登录</router-link>
    </div>
  </div>

</template>

<script setup>
  import { ref, reactive } from 'vue';
  import { ElMessage } from 'element-plus';
  import { useRouter } from 'vue-router';
import ajax from '../utils/Ajax';

  const router = useRouter();
  const loading = ref(false);
  const activeTab = ref('account');
  const countdown = ref(0);

  // Password visibility
  const showPassword = ref(false);
  const showConfirmPassword = ref(false);

  // Account form
  const accountFormRef = ref(null);
  const accountForm = reactive({
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
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
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, message: '用户名至少3个字符', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, message: '密码至少6个字符', trigger: 'blur' }
    ],
    confirmPassword: [
      { required: true, message: '请确认密码', trigger: 'blur' },
      {
        validator: (rule, value, callback) => {
          if (value !== accountForm.password) {
            callback(new Error('两次输入密码不一致'));
          } else {
            callback();
          }
        },
        trigger: 'blur'
      }
    ],
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
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

  // Handle account registration
  const handleAccountRegister = async () => {
    if (!accountFormRef.value) return;
    
    await accountFormRef.value.validate(async (valid) => {
      if (valid) {
        loading.value = true;

        ajax.post('/register', accountForm).then(res => {
          console.log(res);

          ElMessage.success('注册成功');
          // router.push('/login');
        }).catch(err => {
          ElMessage.error(err.message || '注册失败');
        }).finally(() => {
          loading.value = false;
        });

        // try {
        //   // TODO: Call your registration API here
        //   ElMessage.success('注册成功');
        //   router.push('/login');
        // } catch (error) {
        //   ElMessage.error(error.message || '注册失败');
        // } finally {
        //   loading.value = false;
        // }
      }
    });
  };

  // Handle phone registration
  const handlePhoneRegister = async () => {
    if (!phoneFormRef.value) return;
    
    await phoneFormRef.value.validate(async (valid) => {
      if (valid) {
        loading.value = true;
        try {
          // TODO: Call your registration API here
          ElMessage.success('注册成功');
          router.push('/login');
        } catch (error) {
          ElMessage.error(error.message || '注册失败');
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
      // TODO: Call your SMS API here
      countdown.value = 60;
      const timer = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
          clearInterval(timer);
        }
      }, 1000);
      ElMessage.success('验证码已发送');
    } catch (error) {
      ElMessage.error(error.message || '发送失败');
    } finally {
      loading.value = false;
    }
  };
</script>

<style lang="scss">
  .register-container {
    h2 {
      margin-bottom: 24px;
      font-size: 20px;
      color: var(--Text-primary);
    }

    .register-tabs {
      :deep(.el-tabs__nav) {
        width: 100%;
        
        .ui-tabs__item {
          width: 50%;
          text-align: center;
        }
      }
    }


    .password-eye {
      cursor: pointer;
      color: var(--el-text-color-secondary);
      
      &:hover {
        color: var(--el-text-color-primary);
      }
    }


    .ui-form {
      // margin-top: 24px;

      .submit-btn {
        width: 100%;
        justify-content: center;
        margin-top: 16px;
      }

      .ui-input-group__append {
        padding: 0;

        .ui-button {
          min-width: 150px;
        }
      }
    }

    .register-footer {
      margin-top: 20px;
      text-align: center;
      color: var(--Text-secondary);

      a {
        color: #409EFF;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>