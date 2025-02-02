import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { manualChunksPlugin } from 'vite-plugin-webpackchunkname';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    manualChunksPlugin(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')], // svg file directory
      symbolId: 'icon-[name]', // id of symbol
      inject: 'body-last', // inject in body
      customDomId: '__svg__icons__dom__'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use "/src/assets/scss/vars.scss" as *; @use "/src/assets/scss/element.scss" as *;`
      }
    }
  }
});
