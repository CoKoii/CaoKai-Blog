import './styles/main.scss'
import { createPinia } from 'pinia'
import { ViteSSG } from 'vite-ssg'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import { routes } from './router'

export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
  },
  ({ app }) => {
    app.use(createPinia())
    app.use(createHead())
  },
)
