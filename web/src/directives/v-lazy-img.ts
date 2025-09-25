import type { Directive } from 'vue'

interface ExtendedHTMLImageElement extends HTMLImageElement {
  __lazyImgObserver?: IntersectionObserver
}

let globalObserver: IntersectionObserver | null = null

const createObserver = (): IntersectionObserver => {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as ExtendedHTMLImageElement
          const src = el.dataset.lazySrc

          if (src) {
            const img = new Image()

            img.onload = () => {
              requestAnimationFrame(() => {
                el.src = src
                el.style.opacity = '1'
                el.style.filter = 'blur(0px)'
              })

              globalObserver?.unobserve(el)
              delete el.dataset.lazySrc
            }

            img.onerror = () => {
              el.style.opacity = '1'
              el.style.filter = 'blur(0px)'
              globalObserver?.unobserve(el)
              delete el.dataset.lazySrc
            }

            img.src = src
          }
        }
      })
    },
    {
      threshold: 0.01,
      rootMargin: '100px',
    },
  )
}

export const vLazyImg: Directive = {
  mounted(el: ExtendedHTMLImageElement, binding) {
    if (!globalObserver) {
      globalObserver = createObserver()
    }

    el.dataset.lazySrc = binding.value

    el.style.cssText = `
      opacity: 0;
      filter: blur(8px);
      transition: opacity 0.4s ease, filter 0.4s ease;
      will-change: opacity, filter;
    `

    el.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

    globalObserver.observe(el)
    el.__lazyImgObserver = globalObserver
  },

  beforeUnmount(el: ExtendedHTMLImageElement) {
    if (el.__lazyImgObserver) {
      el.__lazyImgObserver.unobserve(el)
      delete el.__lazyImgObserver
    }
    delete el.dataset.lazySrc
  },
}

export const cleanupLazyImg = () => {
  if (globalObserver) {
    globalObserver.disconnect()
    globalObserver = null
  }
}
