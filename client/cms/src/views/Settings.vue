<template>
  <global-wrap>
    <div class="settings-page">
      <el-tabs v-model="activeTab" class="settings-tabs">
        <!-- Types Management -->
        <el-tab-pane label="类型管理" name="types">
          <div class="action-bar">
            <el-button type="primary" @click="showTypeDialog('add')">
              添加类型
            </el-button>
          </div>

          <el-table :data="types" style="width: 100%">
            <el-table-column prop="name" label="类型名称" />
            <el-table-column prop="description" label="描述" />
            <el-table-column label="操作" width="200">
              <template #default="{ row }">
                <el-button @click="showTypeDialog('edit', row)">编辑</el-button>
                <el-button type="danger" @click="handleDeleteType(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <!-- Categories Management -->
        <el-tab-pane label="分类管理" name="categories">
          <div class="action-bar">
            <el-button type="primary" @click="showCategoryDialog('add')">
              添加分类
            </el-button>
          </div>

          <el-table :data="categories" style="width: 100%">
            <el-table-column prop="name" label="分类名称" />
            <el-table-column prop="description" label="描述" />
            <el-table-column prop="type.name" label="所属类型" />
            <el-table-column label="操作" width="200">
              <template #default="{ row }">
                <el-button @click="showCategoryDialog('edit', row)">编辑</el-button>
                <el-button type="danger" @click="handleDeleteCategory(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- Type Dialog -->
    <el-dialog
      v-model="typeDialog.visible"
      :title="typeDialog.type === 'add' ? '添加类型' : '编辑类型'"
      width="500px"
    >
      <el-form ref="typeFormRef" :model="typeForm" :rules="typeRules" label-width="80px">
        <el-form-item label="类型名称" prop="name">
          <el-input v-model="typeForm.name" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="typeForm.description" type="textarea" rows="3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="typeDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="handleTypeSubmit" :loading="loading">
          确定
        </el-button>
      </template>
    </el-dialog>

    <!-- Category Dialog -->
    <el-dialog
      v-model="categoryDialog.visible"
      :title="categoryDialog.type === 'add' ? '添加分类' : '编辑分类'"
      width="500px"
    >
      <el-form ref="categoryFormRef" :model="categoryForm" :rules="categoryRules" label-width="80px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="categoryForm.name" />
        </el-form-item>
        <el-form-item label="所属类型" prop="type_id">
          <el-select v-model="categoryForm.type_id" placeholder="请选择类型">
            <el-option
              v-for="type in types"
              :key="type.id"
              :label="type.name"
              :value="type.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="categoryForm.description" type="textarea" rows="3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="categoryDialog.visible = false">取消</el-button>
        <el-button type="primary" @click="handleCategorySubmit" :loading="loading">
          确定
        </el-button>
      </template>
    </el-dialog>
  </global-wrap>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import GlobalWrap from '../components/GlobalWrap.vue';
import ajax from '../utils/Ajax';
import { ElMessage, ElMessageBox } from 'element-plus';

const activeTab = ref('types');
const loading = ref(false);
const types = ref([]);
const categories = ref([]);

// Type management
const typeDialog = ref({ visible: false, type: 'add' });
const typeFormRef = ref(null);
const typeForm = ref({
  name: '',
  description: ''
});
const typeRules = {
  name: [{ required: true, message: '请输入类型名称', trigger: 'blur' }]
};

// Category management
const categoryDialog = ref({ visible: false, type: 'add' });
const categoryFormRef = ref(null);
const categoryForm = ref({
  name: '',
  type_id: '',
  description: ''
});
const categoryRules = {
  name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
  type_id: [{ required: true, message: '请选择所属类型', trigger: 'change' }]
};

// Load data
const loadTypes = async () => {
  try {
    const res = await ajax.get('/api/types');
    types.value = res.data.data;
  } catch (error) {
    ElMessage.error('加载类型失败');
  }
};

const loadCategories = async () => {
  try {
    const res = await ajax.get('/api/categories');
    categories.value = res.data.data;
  } catch (error) {
    ElMessage.error('加载分类失败');
  }
};

// Type operations
const showTypeDialog = (type, row = null) => {
  typeDialog.value.type = type;
  typeDialog.value.visible = true;
  if (type === 'edit' && row) {
    typeForm.value = { ...row };
  } else {
    typeForm.value = { name: '', description: '' };
  }
};

const handleTypeSubmit = async () => {
  if (!typeFormRef.value) return;
  
  await typeFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      try {
        if (typeDialog.value.type === 'add') {
          await ajax.post('/api/types', typeForm.value);
          ElMessage.success('添加成功');
        } else {
          await ajax.put(`/api/types/${typeForm.value.id}`, typeForm.value);
          ElMessage.success('更新成功');
        }
        typeDialog.value.visible = false;
        loadTypes();
      } catch (error) {
        ElMessage.error(error.response?.data?.message || '操作失败');
      } finally {
        loading.value = false;
      }
    }
  });
};

const handleDeleteType = async (id) => {
  try {
    await ElMessageBox.confirm('确定要删除该类型吗？', '提示', {
      type: 'warning'
    });
    
    await ajax.delete(`/api/types/${id}`);
    ElMessage.success('删除成功');
    loadTypes();
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败');
    }
  }
};

// Category operations
const showCategoryDialog = (type, row = null) => {
  categoryDialog.value.type = type;
  categoryDialog.value.visible = true;
  if (type === 'edit' && row) {
    categoryForm.value = { ...row };
  } else {
    categoryForm.value = { name: '', type_id: '', description: '' };
  }
};

const handleCategorySubmit = async () => {
  if (!categoryFormRef.value) return;
  
  await categoryFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      try {
        if (categoryDialog.value.type === 'add') {
          await ajax.post('/api/categories', categoryForm.value);
          ElMessage.success('添加成功');
        } else {
          await ajax.put(`/api/categories/${categoryForm.value.id}`, categoryForm.value);
          ElMessage.success('更新成功');
        }
        categoryDialog.value.visible = false;
        loadCategories();
      } catch (error) {
        ElMessage.error(error.response?.data?.message || '操作失败');
      } finally {
        loading.value = false;
      }
    }
  });
};

const handleDeleteCategory = async (id) => {
  try {
    await ElMessageBox.confirm('确定要删除该分类吗？', '提示', {
      type: 'warning'
    });
    
    await ajax.delete(`/api/categories/${id}`);
    ElMessage.success('删除成功');
    loadCategories();
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败');
    }
  }
};

onMounted(() => {
  loadTypes();
  loadCategories();
});
</script>

<style lang="scss" scoped>
.settings-page {
  padding: 20px;

  .action-bar {
    margin-bottom: 20px;
  }

  .settings-tabs {
    padding: 8px;
  }

  :deep(.el-tabs__nav-wrap::after) {
    height: 1px;
  }
}
</style>