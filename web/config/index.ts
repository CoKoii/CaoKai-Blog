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
    // 扩展预缓存模式，包含更多文件类型
    globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2,ttf,eot}'],
    // 排除一些不需要缓存的文件
    globIgnores: ['**/node_modules/**/*', 'sw.js', 'workbox-*.js'],
    runtimeCaching: [
      {
        // 缓存静态资源：JS、CSS、字体文件
        urlPattern: ({ request }: { request: Request }) =>
          request.destination === 'script' ||
          request.destination === 'style' ||
          request.destination === 'font',
        handler: 'CacheFirst', // 优先使用缓存
        options: {
          cacheName: 'static-assets-v1',
          expiration: {
            maxEntries: CACHE_MAX_ENTRIES,
            maxAgeSeconds: CACHE_MAX_AGE_SECONDS,
          },
        },
      },
      {
        // 缓存图片资源
        urlPattern: ({ request }: { request: Request }) => request.destination === 'image',
        handler: 'CacheFirst',
        options: {
          cacheName: 'images-v1',
          expiration: {
            maxEntries: 60,
            maxAgeSeconds: CACHE_MAX_AGE_SECONDS,
          },
        },
      },
      {
        // 缓存 GitHub 静态资源
        urlPattern: /^https:\/\/.*\.githubusercontent\.com\//,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'github-assets-v1',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: CACHE_MAX_AGE_SECONDS,
          },
        },
      },
      {
        // 缓存项目特定的资源路径
        urlPattern: new RegExp(`${PROJECT_BASE.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}assets/.*`),
        handler: 'CacheFirst',
        options: {
          cacheName: 'project-assets-v1',
          expiration: {
            maxEntries: CACHE_MAX_ENTRIES,
            maxAgeSeconds: CACHE_MAX_AGE_SECONDS,
          },
        },
      },
    ],
    // 清理过期的缓存
    cleanupOutdatedCaches: true,
    // 跳过等待，立即激活新的 Service Worker
    skipWaiting: true,
    // 立即控制客户端
    clientsClaim: true,
  },
}
