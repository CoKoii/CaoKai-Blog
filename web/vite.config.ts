import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      manifest: false, // 不生成 Web App Manifest（更纯粹）
      injectRegister: 'auto', // 自动在生产环境注册 SW
      registerType: 'autoUpdate', // 有新构建就自动更新 SW
      workbox: {
        globPatterns: ['**/*.{js,css,woff2}'], // 让这些类型可被预缓存
        runtimeCaching: [
          {
            // 仅缓存构建产物：/CaoKai-Blog/assets/*.js|css|woff2
            urlPattern: /\/CaoKai-Blog\/assets\/.*\.(?:js|css|woff2)$/,
            handler: 'StaleWhileRevalidate', // 先用缓存，再后台拉新
            options: {
              cacheName: 'assets-swr-v1',
              expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
  server: {
    open: true,
  },
  base: '/CaoKai-Blog/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
