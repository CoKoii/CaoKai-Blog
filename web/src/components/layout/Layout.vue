/** * Layout 组件 - 响应式布局管理器 * * 功能特性： * - 响应式侧边栏（可隐藏、收缩、无占位） * -
响应式导航栏 * - 全屏模式（支持状态恢复） * - 移动端适配 * - 状态持久化 */

<script setup lang="ts">
import {
  computed,
  reactive,
  ref,
  useSlots,
  useTemplateRef,
  onMounted,
  onUnmounted,
  watch,
} from 'vue'
import {
  NAV_BOTTOM_STATIC_HEIGHT,
  applyLayoutStatePatch,
  createLayoutState,
  getPersistableLayoutState,
  createLayoutSnapshot,
  restoreFromSnapshot,
  shouldCreateSnapshot,
  shouldRestoreFromSnapshot,
  layoutProps,
  type LayoutActions,
  type LayoutEmits,
  type LayoutState,
  type LayoutStateOverrides,
} from './types'

const props = defineProps(layoutProps)
const emit = defineEmits<LayoutEmits>()

const layoutRef = useTemplateRef<HTMLDivElement>('layoutRoot')
const config = reactive<LayoutState>(createLayoutState(props.initialState))
const hasHydrated = ref(false)
const slots = useSlots()
const hasControlsSlot = computed(() => Boolean(slots.controls))

const statusTexts = computed(() => ({
  sidebar: config.Sidebar.isHidden ? '显示侧边栏' : '隐藏侧边栏',
  collapse: config.Sidebar.isCollapsed ? '展开侧边栏' : '收缩侧边栏',
  noSpace: config.SidebarNoSpace.active ? '侧边栏占位' : '侧边栏不占位',
  fullScreen: config.isFullScreen ? '退出全屏' : '进入全屏',
}))

const maskVisible = computed(() => config.isMobile && config.Sidebar.currentWidth > 0)

type ApplyOptions = {
  silent?: boolean
}

type ApplySidebarCollapsedOptions = ApplyOptions & {
  enforceVisible?: boolean
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
  setCSSProperty('--nav-top-border-width', topHeight > 0 ? '1px' : '0px')

  const totalHeight = topHeight + NAV_BOTTOM_STATIC_HEIGHT
  setCSSProperty('--nav-height', totalHeight)
  config.Nav.topCurrentHeight = topHeight
  config.Nav.currentHeight = totalHeight
}

const updateMainMargin = (margin: number | string) => {
  setCSSProperty('--main-margin-left', margin)
  config.SidebarNoSpace.marginLeft = margin
}

const getSidebarWidth = () =>
  config.Sidebar.isCollapsed ? config.Sidebar.collapsedWidth : config.Sidebar.defaultWidth

const applySidebarHidden = (hidden: boolean, options: ApplyOptions = {}) => {
  const changed = hidden !== config.Sidebar.isHidden

  updateSidebarWidth(hidden ? 0 : getSidebarWidth())
  config.Sidebar.isHidden = hidden

  if (changed && !options.silent) {
    emit('update:sidebarHidden', hidden)
  }

  if (changed) {
    persistState()
  }
}

const applySidebarNoSpace = (active: boolean, options: ApplyOptions = {}) => {
  const changed = active !== config.SidebarNoSpace.active

  updateMainMargin(active ? 0 : 'var(--aside-width)')
  config.SidebarNoSpace.active = active

  if (changed && !options.silent) {
    emit('update:sidebarNoSpace', active)
  }

  if (changed) {
    persistState()
  }
}

const applySidebarCollapsed = (collapsed: boolean, options: ApplySidebarCollapsedOptions = {}) => {
  const changed = collapsed !== config.Sidebar.isCollapsed

  if (options.enforceVisible && config.Sidebar.isHidden) {
    applySidebarHidden(false, { silent: options.silent })
  }

  config.Sidebar.isCollapsed = collapsed
  updateSidebarWidth(config.Sidebar.isHidden ? 0 : getSidebarWidth())

  if (changed && !options.silent) {
    emit('update:sidebarCollapsed', collapsed)
  }

  if (changed) {
    persistState()
  }
}

const applyFullScreen = (full: boolean, options: ApplyOptions = {}) => {
  const changed = full !== config.isFullScreen

  if (changed) {
    if (shouldCreateSnapshot(config.isFullScreen, full)) {
      // 进入全屏模式：保存当前状态快照
      config.fullScreenSnapshot = createLayoutSnapshot(config)
    }

    if (shouldRestoreFromSnapshot(config.isFullScreen, full)) {
      // 退出全屏模式：从快照恢复状态
      restoreFromSnapshot(config, config.fullScreenSnapshot)
      config.fullScreenSnapshot = null
    }
  }

  if (full) {
    // 进入全屏：隐藏侧边栏和导航栏
    updateSidebarWidth(0)
    updateNavHeight(0)
  } else {
    // 退出全屏：恢复到快照状态或默认状态
    const targetSidebarWidth = config.Sidebar.isHidden ? 0 : getSidebarWidth()
    updateSidebarWidth(targetSidebarWidth)
    updateNavHeight(config.Nav.topCurrentHeight)
  }

  config.isFullScreen = full

  if (changed && !options.silent) {
    emit('update:fullScreen', full)
  }

  if (changed) {
    persistState()
  }
}

const controlledDescriptors = {
  sidebarHidden: {
    apply: (value: boolean, options?: ApplyOptions) => applySidebarHidden(value, options),
    current: () => config.Sidebar.isHidden,
    event: 'update:sidebarHidden' as const,
  },
  sidebarNoSpace: {
    apply: (value: boolean, options?: ApplyOptions) => applySidebarNoSpace(value, options),
    current: () => config.SidebarNoSpace.active,
    event: 'update:sidebarNoSpace' as const,
  },
  sidebarCollapsed: {
    apply: (value: boolean, options?: ApplyOptions) => applySidebarCollapsed(value, options),
    current: () => config.Sidebar.isCollapsed,
    event: 'update:sidebarCollapsed' as const,
  },
  fullScreen: {
    apply: (value: boolean, options?: ApplyOptions) => applyFullScreen(value, options),
    current: () => config.isFullScreen,
    event: 'update:fullScreen' as const,
  },
} as const

type ControlledKey = keyof typeof controlledDescriptors

const controlledKeys = Object.keys(controlledDescriptors) as ControlledKey[]

const handleMobileTransition = (toMobile: boolean) => {
  if (toMobile) {
    applySidebarHidden(true)
    applySidebarNoSpace(true)
  } else {
    applySidebarHidden(false)
    applySidebarNoSpace(config.SidebarNoSpace.active)
  }
}

const checkMobile = () => {
  if (typeof window === 'undefined') return
  const isMobile = window.innerWidth <= 768
  const wasMobile = config.isMobile
  config.isMobile = isMobile

  if (isMobile !== wasMobile) {
    handleMobileTransition(isMobile)
  }
}

const hideSidebar = () => {
  applySidebarHidden(!config.Sidebar.isHidden)
}

const toggleSidebarSpace = () => {
  applySidebarNoSpace(!config.SidebarNoSpace.active)
}

const toggleSidebarCollapse = () => {
  applySidebarCollapsed(!config.Sidebar.isCollapsed, { enforceVisible: true })
}

const toggleFullScreen = () => {
  applyFullScreen(!config.isFullScreen)
}

const hideAside = () => {
  if (config.isMobile) {
    applySidebarHidden(true)
  }
}

const syncLayoutFromState = () => {
  updateSidebarWidth(config.Sidebar.currentWidth)
  updateNavHeight(config.Nav.topCurrentHeight)
  updateMainMargin(config.SidebarNoSpace.marginLeft)
}

const actions: LayoutActions = {
  hideSidebar,
  toggleSidebarSpace,
  toggleSidebarCollapse,
  toggleFullScreen,
}

const persistState = () => {
  if (!props.persist || !hasHydrated.value || typeof window === 'undefined') return

  try {
    const snapshot = getPersistableLayoutState(config)
    window.localStorage.setItem(props.storageKey, JSON.stringify(snapshot))
  } catch (error) {
    console.warn('[Layout] Failed to persist layout state.', error)
  }
}

const loadPersistedState = (): LayoutStateOverrides | null => {
  if (!props.persist || typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(props.storageKey)
    if (!raw) return null

    const parsed = JSON.parse(raw) as LayoutStateOverrides
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch (error) {
    console.warn('[Layout] Failed to load persisted layout state.', error)
    return null
  }
}

const persistableSnapshot = computed(() => getPersistableLayoutState(config))

const syncControlledModelsFromState = () => {
  if (props.sidebarHidden !== undefined && props.sidebarHidden !== config.Sidebar.isHidden) {
    emit('update:sidebarHidden', config.Sidebar.isHidden)
  }
  if (props.sidebarNoSpace !== undefined && props.sidebarNoSpace !== config.SidebarNoSpace.active) {
    emit('update:sidebarNoSpace', config.SidebarNoSpace.active)
  }
  if (
    props.sidebarCollapsed !== undefined &&
    props.sidebarCollapsed !== config.Sidebar.isCollapsed
  ) {
    emit('update:sidebarCollapsed', config.Sidebar.isCollapsed)
  }
  if (props.fullScreen !== undefined && props.fullScreen !== config.isFullScreen) {
    emit('update:fullScreen', config.isFullScreen)
  }
}

controlledKeys.forEach((key) => {
  watch(
    () => props[key],
    (value) => {
      if (value === undefined) return
      controlledDescriptors[key].apply(value, { silent: true })
    },
    { immediate: true },
  )
})

watch(persistableSnapshot, persistState, { deep: true })

onMounted(() => {
  const persisted = loadPersistedState()
  if (persisted) {
    applyLayoutStatePatch(config, persisted)
  }

  applyFullScreen(config.isFullScreen, { silent: true })
  syncLayoutFromState()
  checkMobile()
  syncLayoutFromState()
  syncControlledModelsFromState()
  window.addEventListener('resize', checkMobile)

  hasHydrated.value = true
  persistState()
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', checkMobile)
  }
})

defineExpose({
  state: config,
  actions,
  statusTexts,
  maskVisible,
})

defineOptions({ name: 'AppLayout' })
</script>

<template>
  <div class="Layout" ref="layoutRoot">
    <div class="mask" :class="{ active: maskVisible }" @click="hideAside"></div>
    <div v-if="hasControlsSlot" class="buttons">
      <slot name="controls" :actions="actions" :statuses="statusTexts"></slot>
    </div>
    <aside class="aside">
      <slot name="aside"></slot>
    </aside>
    <main class="main">
      <nav class="nav">
        <div class="top">
          <slot name="nav-top"></slot>
        </div>
        <div class="bottom">
          <slot name="nav-bottom"></slot>
        </div>
      </nav>
      <section class="content">
        <slot></slot>
      </section>
    </main>
  </div>
</template>

<style scoped lang="scss">
@use './style.scss';
</style>
