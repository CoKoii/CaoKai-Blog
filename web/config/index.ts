import type { VitePWAOptions } from 'vite-plugin-pwa'

// PWA 配置
export const pwaConfig: Partial<VitePWAOptions> = {
  manifest: false,
  registerType: 'autoUpdate',
  workbox: {
    mode: 'development', // 避免 Terser 压缩问题
    globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
  },
}
