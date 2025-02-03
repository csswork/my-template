<template>
  <el-config-provider namespace="ui">
    <router-view />
    <ai-image />

  </el-config-provider>
</template>

<script setup>
// import { watch, onMounted, onBeforeUnmount, ref } from 'vue';
import AiImage from './components/AiImage.vue';
</script>

<style lang="scss">
@use '@/assets/scss/reset';

:root {
  --font: "PingFang SC", "hiragino sans gb", "microsoft yahei ui", "microsoft yahei", "simsun", arial, sans-serif;

  --PB-100: #CC4900;
  --PB-90: #FF5B00;
  --PB-80: #FF6B1A;
  --PB-70: #FF8033;
  --PB-60: #FF9966;
  --PB-50: #FFB085;
  --PB-40: #FFC7A8;
  --PB-30: #FFE0D1;
  --PB-20: #FFF2EB;
  --PB-10: #FFF9F5;

  --Brand-Primary: var(--PB-80);
  --Brand-Orange: var(--PB-60);
  --Brand-purple: #7e86bf;
  --Brand-grey: #efefef;

  --Red-10: #FFEBED;
  --Red-20: #FF3D57;
  --Red-30: #CC3045;
  --Yellow-10: #FFF5E6;
  --Yellow-20: #FFAA00;
  --Yellow-30: #CC8800;
  --Blue-10: #d3e1fe;
  --Blue-20: #4d8cf5;
  --Blue-30: #007bff;
  --Green-10: #E6F9F3;
  --Green-20: #00C896;
  --Green-30: #009D73;

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

  --Neu-00: #FFFFFF;
  --Neu-10: #FFF8F2;
  --Neu-20: #FBE9E0;
  --Neu-30: #F3D5C8;
  --Neu-40: #E8C0AD;
  --Neu-50: #D8A58C;
  --Neu-60: #C48F75;
  --Neu-70: #B0775E;
  --Neu-80: #9D624A;
  --Neu-90: #804D38;
  --Neu-100: #663726;

  --Text-brand: var(--PB-80);
  --Text-primary: var(--Black-90);
  --Text-secondary: var(--Black-75);
  --Text-default: var(--Black-50);
  --Text-disabled: var(--Black-40);
  --Text-invert: var(--Black-00);
  --Text-danger: var(--Red-30);
  --Text-warning: var(--Yellow-30);
  --Text-safe: var(--Green-30);
  --Text-link: var(--Blue-30);

  --Border-primary: var(--PB-80);
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

  --Surface-primary: var(--PB-80);
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
