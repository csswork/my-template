<template>
  <el-page-header icon="Back" class="global-header">
    <template #content>
      <div class="flex">
        <span v-if="heading" class="page-title"> {{ heading }} </span>
      </div>
    </template>
    <template #extra>
      <div class="flex">
        <el-button type="primary" size="small" round>促销活动 80%off</el-button>

        <el-popover
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
              <router-link to="/login">退出</router-link>
            </li>
          </ul>
          <template #reference>
            <el-avatar
                :size="32"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                />
          </template>
        </el-popover>
      </div>
    </template>
  </el-page-header>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  heading: {
    type: String,
    required: true,
    default: '首页',
  },
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

        .ui-button {
            margin-right: 12px;
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
