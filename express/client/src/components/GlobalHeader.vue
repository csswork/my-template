<template>
  <el-page-header :icon="back_icon" class="global-header" :title="back_text" @back="goBack">
    <template #content>
      <div class="flex">
        <span v-if="title" class="page-title"> {{ title }} </span>
      </div>
    </template>
    <template #extra>
      <div class="flex">
        <el-button type="primary" size="small" round>
          <diamond theme="outline" :strokeWidth="2.8"/>
          促销活动 80% off
        </el-button>

        <el-popover 
          v-if="store.is_login"
          placement="bottom"
          :width="180"
          popper-class="menu-popover"
          popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
        >
          <ul class="list-unstyled">
            <li>
              <router-link to="/me">个人中心</router-link>
            </li>
            <li>
              <router-link to="/setting">设置</router-link>
            </li>
            <li>
              <router-link to="/password">通知</router-link>
            </li>
            <li class="divider"></li>
            <li>
              <router-link @click="logout">退出</router-link>
            </li>
          </ul>
          <template #reference>
            <el-avatar
              :size="32"
              :src="user_avatar"
              />
          </template>
        </el-popover>
        <el-button-group v-else>
          <el-button type="primary" size="small" round @click="router.push('/login')">
            <login theme="outline" :strokeWidth="2.8"/>
            登录
          </el-button>
          <el-button type="primary" size="small" round @click="router.push('/register')">
            <user theme="outline" :strokeWidth="2.8"/>
            注册</el-button>
        </el-button-group>
      </div>
    </template>
  </el-page-header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useGlobalStore } from '@/stores/Global';
import { Diamond, Login, User } from '@icon-park/vue-next';
import ajax from '@/utils/Ajax';

const store = useGlobalStore();
const route = useRoute();
const router = useRouter();
const title = ref('');

const props = defineProps({
  heading: {
    type: String,
    default: '',
  },

  back_text: {
    type: String,
    default: '返回',
  },

  back_func: {
    type: Function,
    default: false,
  },

  back_icon: {
    type: String,
    default: 'Back',
  },
});

const user_avatar = require('@/assets/images/user.png');

const goBack = () => {
  if (props.back_func) {
    props.back_func();
    return;
  }

  router.go(-1);
};

const logout = () => {
  ajax.post('/logout').then(() => {
    store.setUser(null);
    store.setToken(null);
    router.push('/login');
  });
};

onMounted(() => {
  if (props.heading) {
    title.value = props.heading;
  } else {
    title.value = route.meta.heading;
  }

  // console.log('title', title.value);
});

</script>

<style lang="scss">
.global-header {
  padding: 16px 24px;

  .page-title {
    font-size: 14px;
    font-weight: 400;
  }

  .flex {
    display: flex;
    align-items: center;

    .ui-avatar {
      margin-left: 12px;
    }

    .ui-button {
      margin-left: 8px;

    }
  }

}
.menu-popover {
  padding: 8px !important;

  .list-unstyled {

    li {
        a {
          padding: 8px;
          font-size: 14px;
          color: var(--Text-secondary);
          cursor: pointer;
          display: block;
          border-radius: var(--Radius);

          &:hover {
              background-color: var(--Neu-10);
              text-decoration: none;
              color: var(--Text-primary);
          }
        }
    }

    .divider {
        height: 1px;
        background-color: var(--Border-default);
        margin: 8px 0;
    }
  }
}


</style>
