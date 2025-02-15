// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  nitro: {
    timing: true,
    storage: {
      data: { 
        driver: 'fs', 
        base: './' 
      }
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        // scss: {
        //   api: 'modern-compiler',
        //   additionalData: `@use "/src/assets/scss/vars.scss" as *; @use "/src/assets/scss/element.scss" as *;`
        // }
      }
    }
  },
  modules: ['nuxt-swiper', '@pinia/nuxt']
})