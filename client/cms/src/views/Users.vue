<template>
  <global-wrap>
    <div class="users-page">
      <!-- Action Bar -->
      <div class="action-bar">
        <el-button type="primary" @click="showUserDialog('add')">
          添加用户
        </el-button>
      </div>

      <!-- Users Table -->
      <el-table :data="users" style="width: 100%" v-loading="loading">
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="role" label="角色">
          <template #default="{ row }">
            <el-tag :type="row.role === 'admin' ? 'danger' : 'success'">
              {{ row.role }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="个人信息">
          <template #default="{ row }">
            <el-popover trigger="hover" width="300">
              <template #reference>
                <el-avatar :src="row.profile?.avatar_url" :size="32">
                  {{ row.username.charAt(0).toUpperCase() }}
                </el-avatar>
              </template>
              <div class="user-profile-popover">
                <p><strong>昵称:</strong> {{ row.profile?.nickname }}</p>
                <p><strong>性别:</strong> {{ row.profile?.gender }}</p>
                <p><strong>生日:</strong> {{ row.profile?.birth_date }}</p>
                <p><strong>地址:</strong> {{ row.profile?.address }}</p>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="注册时间" />
        <el-table-column prop="last_login" label="最后登录" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button @click="showUserDialog('edit', row)">编辑</el-button>
            <el-button 
              type="danger" 
              @click="handleDeleteUser(row.id)"
              :disabled="row.role === 'admin'"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- User Dialog -->
      <el-dialog
        v-model="userDialog.visible"
        :title="userDialog.type === 'add' ? '添加用户' : '编辑用户'"
        width="600px"
      >
        <el-form ref="userFormRef" :model="userForm" :rules="userRules" label-width="100px">
          <el-tabs v-model="activeTab">
            <!-- Basic Info Tab -->
            <el-tab-pane label="基本信息" name="basic">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="userForm.username" :disabled="userDialog.type === 'edit'" />
              </el-form-item>
              <el-form-item 
                label="密码" 
                :prop="userDialog.type === 'add' ? 'password' : ''"
              >
                <el-input v-model="userForm.password" type="password" />
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="userForm.email" />
              </el-form-item>
              <el-form-item label="角色" prop="role">
                <el-select v-model="userForm.role">
                  <el-option label="管理员" value="admin" />
                  <el-option label="用户" value="user" />
                </el-select>
              </el-form-item>
              <el-form-item label="状态" prop="status">
                <el-select v-model="userForm.status">
                  <el-option label="正常" value="active" />
                  <el-option label="禁用" value="inactive" />
                </el-select>
              </el-form-item>
            </el-tab-pane>

            <!-- Profile Tab -->
            <el-tab-pane label="个人资料" name="profile">
              <el-form-item label="昵称">
                <el-input v-model="userForm.profile.nickname" />
              </el-form-item>
              <el-form-item label="头像">
                <el-upload
                  class="avatar-uploader"
                  action="/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                >
                  <img v-if="userForm.profile.avatar_url" :src="userForm.profile.avatar_url" class="avatar" />
                  <el-icon v-else><Plus /></el-icon>
                </el-upload>
              </el-form-item>
              <el-form-item label="性别">
                <el-select v-model="userForm.profile.gender">
                  <el-option label="男" value="male" />
                  <el-option label="女" value="female" />
                  <el-option label="其他" value="other" />
                </el-select>
              </el-form-item>
              <el-form-item label="生日">
                <el-date-picker
                  v-model="userForm.profile.birth_date"
                  type="date"
                  placeholder="选择日期"
                />
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="userForm.profile.address" type="textarea" />
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </el-form>
        <template #footer>
          <el-button @click="userDialog.visible = false">取消</el-button>
          <el-button type="primary" @click="handleUserSubmit" :loading="loading">
            确定
          </el-button>
        </template>
      </el-dialog>
    </div>
  </global-wrap>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import GlobalWrap from '../components/GlobalWrap.vue';
import ajax from '../utils/Ajax';

const loading = ref(false);
const users = ref([]);
const activeTab = ref('basic');

// Dialog and form
const userDialog = ref({ visible: false, type: 'add' });
const userFormRef = ref(null);
const userForm = ref({
  username: '',
  password: '',
  email: '',
  role: 'user',
  status: 'active',
  profile: {
    nickname: '',
    avatar_url: '',
    gender: '',
    birth_date: '',
    address: ''
  }
});

// Validation rules
const userRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, message: '用户名至少3个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少6个字符', trigger: 'blur' }
  ],
  email: [
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ]
};

// Load users
const loadUsers = async () => {
  loading.value = true;
  try {
    const res = await ajax.get('/users');
    users.value = res.data.data;
  } catch (error) {
    ElMessage.error('加载用户列表失败');
  } finally {
    loading.value = false;
  }
};

// Show dialog
const showUserDialog = (type, row = null) => {
  userDialog.value.type = type;
  userDialog.value.visible = true;
  activeTab.value = 'basic';
  
  if (type === 'edit' && row) {
    userForm.value = {
      ...row,
      password: '',
      profile: row.profile || {
        nickname: '',
        avatar_url: '',
        gender: '',
        birth_date: '',
        address: ''
      }
    };
  } else {
    userForm.value = {
      username: '',
      password: '',
      email: '',
      role: 'user',
      status: 'active',
      profile: {
        nickname: '',
        avatar_url: '',
        gender: '',
        birth_date: '',
        address: ''
      }
    };
  }
};

// Handle avatar upload
const handleAvatarSuccess = (res) => {
  userForm.value.profile.avatar_url = res.data.url;
};

// Submit form
const handleUserSubmit = async () => {
  if (!userFormRef.value) return;
  
  await userFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      try {
        if (userDialog.value.type === 'add') {
          await ajax.post('/users', userForm.value);
          ElMessage.success('添加成功');
        } else {
          const { id, ...updateData } = userForm.value;
          await ajax.put(`/users/${id}`, updateData);
          ElMessage.success('更新成功');
        }
        userDialog.value.visible = false;
        loadUsers();
      } catch (error) {
        ElMessage.error(error.response?.data?.message || '操作失败');
      } finally {
        loading.value = false;
      }
    }
  });
};

// Delete user
const handleDeleteUser = async (id) => {
  try {
    await ElMessageBox.confirm('确定要删除该用户吗？', '提示', {
      type: 'warning'
    });
    
    await ajax.delete(`/users/${id}`);
    ElMessage.success('删除成功');
    loadUsers();
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败');
    }
  }
};

onMounted(() => {
  loadUsers();
});
</script>

<style lang="scss" scoped>
.users-page {
  padding: 20px;

  .action-bar {
    margin-bottom: 20px;
  }

  .avatar-uploader {
    :deep(.el-upload) {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration);
      
      &:hover {
        border-color: var(--el-color-primary);
      }
    }
  }

  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }

  .user-profile-popover {
    p {
      margin: 5px 0;
    }
  }
}
</style>