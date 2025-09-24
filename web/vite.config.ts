import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { PROJECT_BASE, pwaConfig } from './config'

export default defineConfig({
  plugins: [vue(), vueDevTools(), VitePWA(pwaConfig)],
  server: {
    open: true,
  },
  base: PROJECT_BASE,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
