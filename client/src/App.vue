<template>
  <el-config-provider namespace="ui">
    <router-view />
    <ai-image />
  </el-config-provider>
</template>

<script setup>
import { watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import AiImage from './components/AiImage.vue';
import { useGlobalStore } from './stores/Global';
import ajax from './utils/Ajax';

const route = useRoute();
const router = useRouter();
const store = useGlobalStore();

if (window.localStorage.getItem('token')) {
  ajax.get('/me').then((res) => {
    if (route.name === 'login' || route.name === 'register') {
      router.replace('/');
    }

    store.setUser(res.data.data);
  });
}

watch(() => route.name, () => {
  // update body class
  document.body.className = 'page-' + route.name;
});

onMounted(() => {
  // update body class
  document.body.className = 'page-' + route.name;
});

</script>

<style lang="scss">
  @use '@/assets/scss/main';
</style>
