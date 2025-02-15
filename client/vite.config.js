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
        chunkFileNames: (chunkInfo) => {
          const prefix = chunkInfo.facadeModuleId?.includes('/cms/') ? 'cms/' : '';
          return `${prefix}js/[name]-[hash].js`;
        },
        entryFileNames: (chunkInfo) => {
          const prefix = chunkInfo.name === 'cms' ? 'cms/' : '';
          return `${prefix}js/[name]-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          const prefix = assetInfo.name?.includes('/cms/') ? 'cms/' : '';
          return `${prefix}assets/[name]-[hash][ext]`;
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