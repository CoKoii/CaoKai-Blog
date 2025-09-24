import type { VitePWAOptions } from 'vite-plugin-pwa'

// PWA 配置
export const pwaConfig: Partial<VitePWAOptions> = {
  manifest: false,
  registerType: 'autoUpdate',
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
    runtimeCaching: [
      {
        urlPattern: /\.woff2$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'fonts-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 365,
          },
        },
      },
    ],
  },
}
