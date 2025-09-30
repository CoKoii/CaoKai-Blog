<script setup lang="ts">
import { reactive, useTemplateRef, onMounted, onUnmounted } from 'vue'

interface LayoutState {
  Sidebar: {
    defaultWidth: number
    collapsedWidth: number
    currentWidth: number
    isHidden: boolean
    isCollapsed: boolean
  }
  Nav: {
    defaultHeight: number
    currentHeight: number
    topDefaultHeight: number
    topCurrentHeight: number
    isHidden: boolean
    isTopHidden: boolean
  }
  SidebarNoSpace: {
    marginLeft: number | string
    active: boolean
  }
  isFullScreen: boolean
  isMobile: boolean
}

const config = reactive<LayoutState>({
  Sidebar: {
    defaultWidth: 244,
    collapsedWidth: 60,
    currentWidth: 244,
    isHidden: false,
    isCollapsed: false,
  },
  Nav: {
    defaultHeight: 86,
    currentHeight: 86,
    topDefaultHeight: 50,
    topCurrentHeight: 50,
    isHidden: false,
    isTopHidden: false,
  },
  SidebarNoSpace: {
    marginLeft: 244,
    active: false,
  },
  isFullScreen: false,
  isMobile: false,
})

const layoutRef = useTemplateRef<HTMLDivElement>('Layout')

const statusTexts = {
  sidebar: () => (config.Sidebar.isHidden ? '显示侧边栏' : '隐藏侧边栏'),
  collapse: () => (config.Sidebar.isCollapsed ? '展开侧边栏' : '收缩侧边栏'),
  noSpace: () => (config.SidebarNoSpace.active ? '侧边栏占位' : '侧边栏不占位'),
  fullScreen: () => (config.isFullScreen ? '退出全屏' : '进入全屏'),
}

const setCSSProperty = (property: string, value: string | number) => {
  if (!layoutRef.value) return
  const cssValue = typeof value === 'string' ? value : `${value}px`
  layoutRef.value.style.setProperty(property, cssValue)
}

const updateSidebarWidth = (width: number) => {
  setCSSProperty('--aside-width', width)
  config.Sidebar.currentWidth = width
}

const updateNavHeight = (topHeight: number) => {
  setCSSProperty('--nav-top-height', topHeight)
  setCSSProperty('--nav-top-border-opacity', topHeight > 0 ? 1 : 0)

  const totalHeight = topHeight + 36
  setCSSProperty('--nav-height', totalHeight)
  config.Nav.topCurrentHeight = topHeight
  config.Nav.currentHeight = totalHeight
}

const updateMainMargin = (margin: number | string) => {
  setCSSProperty('--main-margin-left', margin)
  config.SidebarNoSpace.marginLeft = margin
}

const toggleMask = (show: boolean) => {
  if (!layoutRef.value) return
  const mask = layoutRef.value.querySelector('.mask')
  mask?.classList.toggle('active', show)
}

const getSidebarWidth = () =>
  config.Sidebar.isCollapsed ? config.Sidebar.collapsedWidth : config.Sidebar.defaultWidth

const handleMobileTransition = (toMobile: boolean) => {
  if (toMobile) {
    if (!config.Sidebar.isHidden) {
      config.Sidebar.isHidden = true
      config.SidebarNoSpace.active = true
      updateSidebarWidth(0)
      updateMainMargin(0)
      toggleMask(false)
    }
  } else {
    toggleMask(false)
    if (config.Sidebar.isHidden) {
      updateSidebarWidth(getSidebarWidth())
      updateMainMargin(config.SidebarNoSpace.active ? 0 : 'var(--aside-width)')
      config.Sidebar.isHidden = false
    }
  }
}

const checkMobile = () => {
  const isMobile = window.innerWidth <= 768
  const wasMobile = config.isMobile
  config.isMobile = isMobile

  if (isMobile !== wasMobile) {
    handleMobileTransition(isMobile)
  }
}

const hideSidebar = () => {
  const isShowing = config.Sidebar.isHidden
  const targetWidth = isShowing ? getSidebarWidth() : 0

  updateSidebarWidth(targetWidth)
  config.Sidebar.isHidden = !isShowing

  if (config.isMobile) {
    toggleMask(isShowing)
  }
}

const toggleSidebarSpace = () => {
  const willActivate = !config.SidebarNoSpace.active
  updateMainMargin(willActivate ? 0 : 'var(--aside-width)')
  config.SidebarNoSpace.active = willActivate
}

const toggleSidebarCollapse = () => {
  if (config.Sidebar.isHidden) {
    config.Sidebar.isHidden = false
    if (config.isMobile) toggleMask(true)
  }

  config.Sidebar.isCollapsed = !config.Sidebar.isCollapsed
  updateSidebarWidth(getSidebarWidth())

  if (config.isMobile && !config.Sidebar.isHidden) {
    toggleMask(true)
  }
}

const toggleFullScreen = () => {
  const isExiting = config.isFullScreen

  if (isExiting) {
    if (!config.Sidebar.isHidden) {
      updateSidebarWidth(getSidebarWidth())
    }
    if (!config.Nav.isTopHidden) {
      updateNavHeight(config.Nav.topDefaultHeight)
    }
  } else {
    updateSidebarWidth(0)
    updateNavHeight(0)
  }

  config.isFullScreen = !isExiting
}

const hideAside = () => {
  if (config.isMobile) {
    config.Sidebar.isHidden = true
    updateSidebarWidth(0)
    toggleMask(false)
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

defineOptions({ name: 'Layout' })
</script>

<template>
  <div class="Layout" ref="Layout">
    <div class="mask" @click="hideAside"></div>
    <div class="buttons">
      <button @click="hideSidebar">{{ statusTexts.sidebar() }}</button>
      <button @click="toggleSidebarSpace">{{ statusTexts.noSpace() }}</button>
      <button @click="toggleSidebarCollapse">{{ statusTexts.collapse() }}</button>
      <button @click="toggleFullScreen">{{ statusTexts.fullScreen() }}</button>
    </div>
    <div class="aside"></div>
    <div class="main">
      <div class="nav">
        <div class="top"></div>
        <div class="bottom"></div>
      </div>
      <div class="content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, commodi minima magnam
        exercitationem animi repellat accusamus aliquam quisquam, alias odit numquam voluptate modi
        maiores in minus sit! Numquam laudantium nemo quaerat voluptatem minima, velit, repellendus
        dolorem cum accusamus explicabo perspiciatis! Recusandae laudantium laboriosam perferendis
        error, pariatur nostrum corrupti voluptates ab saepe alias reiciendis sequi harum sit illo
        asperiores veritatis. Asperiores nobis sequi placeat explicabo nam consequuntur rem atque
        cupiditate, unde distinctio? Laboriosam magnam eaque, tempore molestias itaque quo aliquam
        eius dolorem reprehenderit autem corporis asperiores a delectus incidunt consequuntur magni
        sapiente ad exercitationem? Dolore sunt animi voluptates! Omnis, cum possimus? Tempora
        placeat laudantium, commodi sed porro, quaerat, possimus inventore temporibus repellat
        minima aperiam accusamus dolor voluptatem doloribus quam nam blanditiis vel dicta ex fugiat
        eligendi at cum harum culpa alias nam tempora, eveniet deleniti nulla tenetur quo libero.
        Minima, necessitatibus maxime deserunt itaque libero aut vitae quibusdam expedita commodi
        culpa nihil est ex impedit obcaecati explicabo quia eveniet labore quas provident
        perferendis fuga, ab sint error. Aliquid voluptas quod veritatis fugiat, doloribus fuga odio
        rerum autem totam quae tempore optio vitae qui quaerat nihil dignissimos ipsum rem est
        pariatur sed cumque corporis deserunt! Earum culpa repellat tenetur non explicabo deleniti
        accusantium. Molestiae sapiente adipisci praesentium ex fuga nisi unde nam at mollitia
        labore eos, quaerat eaque ducimus? Officiis, eos doloremque dicta sint iusto distinctio
        molestiae et fugit ipsam facilis in officia repudiandae provident nisi, consectetur nobis
        labore quo laudantium a. Earum eius labore quibusdam illo, aperiam consectetur perspiciatis
        quia, magnam libero tempora voluptatem aspernatur quas fugit asperiores consequatur fuga
        necessitatibus molestiae quos. Excepturi expedita eius doloremque qui facilis provident
        doloribus recusandae eligendi pariatur cum.
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use './style.scss';
</style>
