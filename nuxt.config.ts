// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  nitro: {
    timing: true,
    storage: {
      data: { driver: 'fs', base: './' }
    }
  },
  modules: ['nuxt-swiper', '@pinia/nuxt']
})