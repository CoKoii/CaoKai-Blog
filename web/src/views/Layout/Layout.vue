<script setup lang="ts">
import { reactive, useTemplateRef } from 'vue'
const LayoutConfig = reactive({
  Sidebar: {
    defaultWidth: 244, // 默认宽度
    collapsedWidth: 60, // 收缩宽度
    currentWidth: 244, // 当前宽度
    isHidden: false, // 是否隐藏
    isCollapsed: false, // 是否收缩
  },
  Nav: {
    defaultHeight: 86, // 默认高度
    currentHeight: 86, // 当前高度
    topDefaultHeight: 50, // top默认高度(按flex比例计算为86*50/(50+33))
    topCurrentHeight: 50, // top当前高度
    isHidden: false, // 是否隐藏
    isTopHidden: false, // top是否隐藏
  },
  SidebarNoSpace: {
    marginLeft: 244 as number | string,
    active: false,
  },
  isFullScreen: false, // 是否全屏
  Layout: {
    isVerticalLayout: true,
    isHorizontalLayout: false,
  },
})
const LayoutRef = useTemplateRef<HTMLDivElement>('Layout') as { value: HTMLDivElement }

// 计算属性 - 获取当前状态的文本描述
const getSidebarStatusText = () => {
  if (LayoutConfig.Sidebar.isHidden) return '显示侧边栏'
  return '隐藏侧边栏'
}

const getCollapseStatusText = () => {
  if (LayoutConfig.Sidebar.isCollapsed) return '展开侧边栏'
  return '收缩侧边栏'
}

const getNoSpaceStatusText = () => {
  if (LayoutConfig.SidebarNoSpace.active) return '侧边栏占位'
  return '侧边栏不占位'
}

const getFullScreenStatusText = () => {
  if (LayoutConfig.isFullScreen) return '退出全屏'
  return '进入全屏'
}

// 操作方法

//设置侧边栏宽度
const setSidebarWidth = (w: number) => {
  LayoutRef.value.style.setProperty('--aside-width', w + 'px')
  LayoutConfig.Sidebar.currentWidth = w
}

//设置导航栏top高度
const setNavTopHeight = (h: number) => {
  LayoutRef.value.style.setProperty('--nav-top-height', h + 'px')
  LayoutConfig.Nav.topCurrentHeight = h

  // 控制border透明度：当高度为0时，border也透明
  const borderOpacity = h > 0 ? 1 : 0
  LayoutRef.value.style.setProperty('--nav-top-border-opacity', borderOpacity.toString())

  // 同时调整整个nav的高度：top高度 + bottom高度(36px，按原比例计算)
  const bottomHeight = 36 // 根据原始比例86 * 33/(50+33) ≈ 36
  const totalNavHeight = h + bottomHeight
  LayoutRef.value.style.setProperty('--nav-height', totalNavHeight + 'px')
  LayoutConfig.Nav.currentHeight = totalNavHeight
}

//设置主体内容margin-left
const setMainMarginLeft = (m: number | string) => {
  if (typeof m === 'string') {
    LayoutRef.value.style.setProperty('--main-margin-left', m)
  } else {
    LayoutRef.value.style.setProperty('--main-margin-left', m + 'px')
  }
  LayoutConfig.SidebarNoSpace.marginLeft = m
}
const hideAside = () => {
  if (LayoutRef.value) {
    LayoutRef.value.classList.toggle('hide-aside')
  }
}
// 功能按钮

//隐藏/显示侧边栏
const HideSidebar = () => {
  if (LayoutConfig.Sidebar.isHidden) {
    // 显示侧边栏：恢复到之前的状态（收缩或正常）
    const targetWidth = LayoutConfig.Sidebar.isCollapsed
      ? LayoutConfig.Sidebar.collapsedWidth
      : LayoutConfig.Sidebar.defaultWidth
    setSidebarWidth(targetWidth)
    LayoutConfig.Sidebar.isHidden = false
  } else {
    // 隐藏侧边栏
    setSidebarWidth(0)
    LayoutConfig.Sidebar.isHidden = true
  }
}
//侧边栏不占位
const SidebarNoArea = () => {
  if (LayoutConfig.SidebarNoSpace.active) {
    setMainMarginLeft('var(--aside-width)')
    LayoutConfig.SidebarNoSpace.active = false
  } else {
    setMainMarginLeft(0)
    LayoutConfig.SidebarNoSpace.active = true
  }
}

//侧边栏收缩
const SidebarCollapse = () => {
  if (LayoutConfig.Sidebar.isHidden) {
    // 如果当前是隐藏状态，先显示再设置收缩状态
    LayoutConfig.Sidebar.isHidden = false
  }

  if (LayoutConfig.Sidebar.isCollapsed) {
    // 展开侧边栏：恢复为默认宽度
    setSidebarWidth(LayoutConfig.Sidebar.defaultWidth)
    LayoutConfig.Sidebar.isCollapsed = false
  } else {
    // 收缩侧边栏：缩小为收缩宽度
    setSidebarWidth(LayoutConfig.Sidebar.collapsedWidth)
    LayoutConfig.Sidebar.isCollapsed = true
  }
}

//全屏模式
const FullScreen = () => {
  if (LayoutConfig.isFullScreen) {
    // 退出全屏：恢复侧边栏和导航栏top部分
    const targetSidebarWidth = LayoutConfig.Sidebar.isCollapsed
      ? LayoutConfig.Sidebar.collapsedWidth
      : LayoutConfig.Sidebar.defaultWidth

    if (!LayoutConfig.Sidebar.isHidden) {
      setSidebarWidth(targetSidebarWidth)
    }

    if (!LayoutConfig.Nav.isTopHidden) {
      setNavTopHeight(LayoutConfig.Nav.topDefaultHeight)
    }

    LayoutConfig.isFullScreen = false
  } else {
    // 进入全屏：隐藏侧边栏和导航栏top部分，bottom保留
    setSidebarWidth(0)
    setNavTopHeight(0)
    LayoutConfig.isFullScreen = true
  }
}

defineOptions({
  name: 'Layout',
})
</script>

<template>
  <div class="Layout" ref="Layout">
    <div class="mask" @click="hideAside"></div>
    <div class="buttons">
      <button @click="HideSidebar">{{ getSidebarStatusText() }}</button>
      <button @click="SidebarNoArea">{{ getNoSpaceStatusText() }}</button>
      <button @click="SidebarCollapse">{{ getCollapseStatusText() }}</button>
      <button @click="FullScreen">{{ getFullScreenStatusText() }}</button>
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
