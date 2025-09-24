import type { VitePWAOptions } from 'vite-plugin-pwa'

// 项目常量
export const PROJECT_BASE = '/CaoKai-Blog/'
export const CACHE_MAX_ENTRIES = 80
export const CACHE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365 // 1年

// PWA 配置
export const pwaConfig: Partial<VitePWAOptions> = {
  manifest: false, // 不生成 Web App Manifest（更纯粹）
  injectRegister: 'auto', // 自动在生产环境注册 SW
  registerType: 'autoUpdate', // 有新构建就自动更新 SW
  workbox: {
    globPatterns: ['**/*.{js,css,woff2}'], // 让这些类型可被预缓存
    runtimeCaching: [
      {
        // 仅缓存构建产物：/CaoKai-Blog/assets/*.js|css|woff2
        urlPattern: new RegExp(`${PROJECT_BASE}assets/.*\\.(?:js|css|woff2)$`),
        handler: 'StaleWhileRevalidate', // 先用缓存，再后台拉新
        options: {
          cacheName: 'assets-swr-v1',
          expiration: {
            maxEntries: CACHE_MAX_ENTRIES,
            maxAgeSeconds: CACHE_MAX_AGE_SECONDS,
          },
        },
      },
    ],
  },
}
