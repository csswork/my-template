import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolve } from 'node:path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { manualChunksPlugin } from 'vite-plugin-webpackchunkname';
import { viteRequire } from 'vite-require';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cms: resolve(__dirname, 'cms/index.html')
      },
      output: {
        dir: 'dist',
        format: 'es',
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][ext]',
        manualChunks: {
          'element-plus': ['element-plus'],
          'vendor': [
            'vue',
            'vue-router',
            'pinia'
          ]
        }
      }
    }
  },
  server: {
    port: 5178,
    host: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3001',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '/api')
    //   }
    // }
  },
  plugins: [
    vue(),
    viteRequire(),
    manualChunksPlugin(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      symbolId: 'icon-[name]',
      inject: 'body-last',
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
        additionalData: `
          @use "@/assets/scss/vars.scss" as *;
          @use "@/assets/scss/element.scss" as *;
        `
      }
    }
  }
});