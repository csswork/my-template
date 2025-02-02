<template>
  <el-config-provider namespace="ui">
    <router-view v-if="!me_loading" />
  </el-config-provider>
</template>

<script setup>
import { watch, onMounted, onBeforeUnmount, ref } from 'vue';
import ajax from '@/utils/Ajax';
import router from './router';
import { useGlobalStore } from './stores/GlobalStore';
import { useRouter } from 'vue-router';
import emitter from '@/utils/EventBus';

const routerGo = useRouter();
const GlobalStore = useGlobalStore();
const me_loading = ref(true);//等checkLoging跑完再跑page

// watch router name
watch(() => router.currentRoute.value.name, (name) => {
  // update body class
  document.body.className = `page-${name}`;
  GlobalStore.setPageHeading(router.currentRoute.value.meta.heading || '');
});

GlobalStore.setIsMobile(window.innerWidth < 768);
let resizeTimeout;
const handleResize = () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    GlobalStore.setIsMobile(window.innerWidth < 768);
  }, 200);
};

// const mail = 'ianc@motom.me';
// const password = 'AbCd023';
// // temp login
// const is_login = window.localStorage.getItem('token');

// if (!is_login) {
//   const mail = 'ianc@motom.me';
//   const password = 'AbCd023';
//   // const access_token = btoa(`${mail}:${password}`);

//   ajax.post('/login', { email: mail, password: password }).then((res) => {
//     window.localStorage.setItem('token', res.data.data.access_token);
//   }).catch((err) => {
//     window.localStorage.removeItem('token');
//     // window.location.reload();
//   });

// }

const navigateToUrl = (url) => {
  routerGo.push(url);
};

const checkLogin = () => {
  const is_login = window.localStorage && window.localStorage.getItem('token');
  if (is_login) {
    ajax.get('/me', { token: is_login }).then((res) => {
      // console.log('res', res)
      setTimeout(() => {
        emitter.emit('get-user-data', res.data);
      }, 100);

      GlobalStore.user = res.data.data;
      //user_status=100 ⇒ email過關
      //在登陸註冊頁以外的地方，token沒過關代表這帳號不完全，要清除token導回登陸頁
      let rou_value = router.currentRoute.value;
      if (GlobalStore.user.user_status !== 100 && rou_value.name !== 'register' && !rou_value.meta.login) {
        GlobalStore.clearToken();
        window.location.href = '/login';
      }
      me_loading.value = false;
    }).catch((err) => {
      me_loading.value = false;
      GlobalStore.clearToken();
      window.location.href = '/login';
    });
  }
  else {
    me_loading.value = false;
  }
}

onMounted(() => {
  checkLogin();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

</script>

<style lang="scss">
@use '@/assets/scss/reset';

:root {
  --font: 'Franklin Gothic Book', sans-serif;

  --PB-100: #232a60;
  --PB-80: #2f398b;
  --PB-60: #505bbc;
  --PB-40: #7c85ce;
  --PB-20: #abb1e0;

  --Brand-Primary: var(--PB-100);
  --Brand-Orange: #faa378;
  --Brand-purple: #7e86bf;
  --Brand-grey: #efefef;

  --Red-10: #ffebeb;
  --Red-30: #f22028;
  --Yellow-10: #fff5d5;
  --Yellow-30: #ffc107;
  --Blue-10: #d3e1fe;
  --Blue-30: #007bff;
  --Green-10: #e8f8f2;
  --Green-30: #00a870;

  --Black-100: #000000;
  --Black-90: #333333;
  --Black-75: #58595b;
  --Black-60: #666666;
  --Black-50: #828282;
  --Black-40: #bdbdbd;
  --Black-20: #e0e0e0;
  --Black-10: #e5e5e5;
  --Black-05: #f2f2f2;
  --Black-03: #fafafa;
  --Black-00: #fff;

  --Black-100-rgba: 0, 0, 0;
  --Black-90-rgba: 51, 51, 51;
  --Black-50-rgba: 130, 130, 130;
  --Black-00-rgba: 255, 255, 255;

  --Neu-00: #fff;
  --Neu-10: #f6f8fc;
  --Neu-20: #f1f4f9;
  --Neu-30: #e2e8f0;
  --Neu-40: #cbd4e1;
  --Neu-50: #94a3b8;
  --Neu-60: #64748b;
  --Neu-70: #475569;
  --Neu-80: #27364b;
  --Neu-90: #1e2a3b;
  --Neu-100: #0f1a2a;

  --Spotify: #1db954;
  --Facebook-new: #1877f2;
  --Facebook-old: #3b5998;
  --Insta: #c32aa3;
  --Pinterest: #e60023;
  --Twitter: #1da1f2;
  --X-twitter: #000000;
  --YouTube: #ff0000;
  --Snapchat: #fffc00;
  --Google: #0f9d58;
  --Linktree: #3ddc84;
  --Apple-iOS: #8e8e93;
  --Win: #0078d4;
  --TikTok-Pink: #ee1d52;
  --TikTok-Blue: #69c9d0;
  --TikTok-dark: #010101;

  --Text-brand: var(--PB-100);
  --Text-primary: var(--Black-90);
  --Text-secondary: var(--Black-75);
  --Text-default: var(--Black-50);
  --Text-disabled: var(--Black-40);
  --Text-invert: var(--Black-00);
  --Text-danger: var(--Red-30);
  --Text-warning: var(--Yellow-30);
  --Text-safe: var(--Green-30);
  --Text-link: var(--Blue-30);

  --Border-primary: var(--PB-100);
  --Border-secondary: var(--Brand-Orange);
  --Border-dark: var(--Black-90);
  --Border-light: var(--Black-00);
  --Border-default: var(--Black-10);
  --Border-hover: var(--Black-10);
  --Border-disable: var(--Black-20);
  --Border-neu: var(--Neu-40);
  --Border-danger: var(--Red-30);
  --Border-Warning: var(--Yellow-30);
  --Border-safe: var(--Green-30);

  --Surface-primary: var(--PB-100);
  --Surface-primary-hover: var(--Neu-70);
  --Surface-secondary: var(--Brand-Orange);
  --Surface-dark: var(--Black-90);
  --Surface-light: var(--Black-00);
  --Surface-neu: var(--Neu-30);
  --Surface-alert: var(--Red-30);
  --Surface-default: var(--Black-05);
  --Surface-hover: var(--Black-10);
  --Surface-disable: var(--Black-20);
  --Surface-tertiary-selected: var(--Neu-20);
  --Surface-danger: var(--Red-10);
  --Surface-safe: var(--Green-10);
  --Surface-warn: var(--Yellow-10);
  --Surface-normal: var(--Blue-10);

  --Bg-dark: var(--Black-90);
  --Bg-light: var(--Black-00);
  --Bg-01: var(--Black-03);
  --Bg-02: var(--Black-05);
  --Bg-03: var(--Black-10);

  --bot-1dp: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  --bot-2dp: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  --bot-4dp: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  --bot-6dp: 0px 6px 8px 0px rgba(0, 0, 0, 0.1);

  --top-1dp: 0px -1px 2px 0px rgba(0, 0, 0, 0.1);
  --top-2dp: 0px -2px 4px 0px rgba(0, 0, 0, 0.1);
  --top-4dp: 0px -4px 8px 0px rgba(0, 0, 0, 0.1);
  --top-6dp: 0px -6px 8px 0px rgba(0, 0, 0, 0.1);

  --right-1dp: 1px 0px 2px 0px rgba(0, 0, 0, 0.1);
  --right-2dp: 2px 0px 4px 0px rgba(0, 0, 0, 0.1);
  --right-4dp: 4px 0px 8px 0px rgba(0, 0, 0, 0.1);
  --right-6dp: 6px 0px 8px 0px rgba(0, 0, 0, 0.1);

  --left-1dp: -1px 0px 2px 0px rgba(0, 0, 0, 0.1);
  --left-2dp: -2px 0px 4px 0px rgba(0, 0, 0, 0.1);
  --left-4dp: -4px 0px 8px 0px rgba(0, 0, 0, 0.1);
  --left-6dp: -6px 0px 8px 0px rgba(0, 0, 0, 0.1);

  --card: 0px 0 2px 1px rgba(0, 0, 0, 0.1);
  --pop-medium: 2px 4px 30px 1px rgba(0, 0, 0, 0.15);
  --pop-light: 2px 4px 20px 0px rgba(0, 0, 0, 0.1);
  --neno-01: 0px 4px 8px 0px rgba(241, 101, 41, 0.35), 1px 2px 4px 0px rgba(249, 163, 38, 0.32);

  --mbg-bttb: 348.82deg, var(--Red-30) 8.25%, var(--Yellow-30) 91.52%;
  --mbg-bttf: 102.8deg, var(--Red-30) 6.94%, var(--Yellow-30) 91.73%;
  --mbg-bttl: 168.82deg, var(--Red-30) 11.16%, var(--Yellow-30) 91.53%;

  --font-xxxl: 32px;
  --font-xxl: 24px;
  --font-xl: 22px;
  --font-l: 20px;
  --font-md: 18px;
  --font-m: 16px;
  --font-s: 14px;
  --font-xs: 12px;
  --font-xxs: 10px;

  --font-lh-xxxl: 34px;
  --font-lh-xxl: 26px;
  --font-lh-xl: 24px;
  --font-lh-l: 22px;
  --font-lh-md: 20px;
  --font-lh-m: 18px;
  --font-lh-s: 16px;
  --font-lh-xs: 14px;
  --font-lh-xxs: 12px;

  --font-semi: 600;
  --font-medium: 500;
  --font-regular: 400;
  --font-light: 300;

  --spacing-01: 2px;
  --spacing-02: 4px;
  --spacing-03: 8px;
  --spacing-04: 12px;
  --spacing-05: 16px;
  --spacing-06: 24px;
  --spacing-07: 32px;
  --spacing-08: 36px;
  --spacing-09: 40px;
  --spacing-10: 48px;
  --spacing-11: 64px;

  --register_max_width: 550px;
  --radius: 6px;
}

html {
  -webkit-overflow-scrolling: touch;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  background-color: var(--Bg-01);
}

body {
  font-family: var(--font);
  font-size: 14px;
  line-height: 1.5;
  color: var(--Text-secondary);

  /* Font smoothing */
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--Bg-01);

  &.disabled-scroll {
    overflow: hidden !important;
  }
}

* {
  box-sizing: border-box;
}

#app {
  min-height: 100vh;

  .w-100 {
    width: 100%;
  }

  .login-container {
    padding: 0;
    
    .ui-main{
      background: var(--Bg-01);
    }
  }

  .analytics-page {
    padding: 24px;
    max-width: 1000px;
    margin: 0 auto;
  }
  
}

a {
  color: var(--Text-link);
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

.main-content {
  background-color: var(--Bg-light);
  height: 100vh;
  box-shadow: var(--card);
}
</style>
