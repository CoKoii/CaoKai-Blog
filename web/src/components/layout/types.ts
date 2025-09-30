import type { ExtractPropTypes, PropType } from 'vue'

export interface LayoutSidebarState {
  defaultWidth: number
  collapsedWidth: number
  currentWidth: number
  isHidden: boolean
  isCollapsed: boolean
}

export interface LayoutNavState {
  defaultHeight: number
  currentHeight: number
  topDefaultHeight: number
  topCurrentHeight: number
  isHidden: boolean
  isTopHidden: boolean
}

export interface LayoutSidebarNoSpaceState {
  marginLeft: number | string
  active: boolean
}

// 全屏模式前的状态快照
export interface LayoutStateSnapshot {
  sidebarWidth: number
  navHeight: number
  timestamp: number
}

export interface LayoutState {
  Sidebar: LayoutSidebarState
  Nav: LayoutNavState
  SidebarNoSpace: LayoutSidebarNoSpaceState
  isFullScreen: boolean
  isMobile: boolean
  // 全屏模式前的状态快照，用于恢复
  fullScreenSnapshot: LayoutStateSnapshot | null
}

export type PersistableLayoutState = Omit<LayoutState, 'isMobile' | 'fullScreenSnapshot'>

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Record<string, unknown> ? DeepPartial<T[K]> : T[K]
}

export type LayoutStateOverrides = DeepPartial<PersistableLayoutState>

export const NAV_BOTTOM_STATIC_HEIGHT = 36

const defaultState: LayoutState = {
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
  fullScreenSnapshot: null,
}

const booleanControlProp = () => ({
  type: Boolean as PropType<boolean | undefined>,
  default: undefined,
})

export const layoutProps = {
  persist: {
    type: Boolean,
    default: false,
  },
  storageKey: {
    type: String,
    default: 'app-layout-state',
  },
  initialState: {
    type: Object as PropType<LayoutStateOverrides>,
    default: () => ({}),
  },
  sidebarHidden: booleanControlProp(),
  sidebarNoSpace: booleanControlProp(),
  sidebarCollapsed: booleanControlProp(),
  fullScreen: booleanControlProp(),
} as const

export type LayoutProps = ExtractPropTypes<typeof layoutProps>

export type LayoutEmits = {
  (e: 'update:sidebarHidden', value: boolean): void
  (e: 'update:sidebarNoSpace', value: boolean): void
  (e: 'update:sidebarCollapsed', value: boolean): void
  (e: 'update:fullScreen', value: boolean): void
}

export interface LayoutActions {
  hideSidebar: () => void
  toggleSidebarSpace: () => void
  toggleSidebarCollapse: () => void
  toggleFullScreen: () => void
}

export const createLayoutState = (overrides: LayoutStateOverrides = {}): LayoutState => {
  const state: LayoutState = {
    Sidebar: { ...defaultState.Sidebar },
    Nav: { ...defaultState.Nav },
    SidebarNoSpace: { ...defaultState.SidebarNoSpace },
    isFullScreen: defaultState.isFullScreen,
    isMobile: defaultState.isMobile,
    fullScreenSnapshot: null,
  }

  applyLayoutStatePatch(state, overrides)

  return state
}

export const applyLayoutStatePatch = (
  target: LayoutState,
  patch: LayoutStateOverrides = {},
): LayoutState => {
  if (patch.Sidebar) {
    Object.assign(target.Sidebar, patch.Sidebar)
  }

  if (patch.Nav) {
    Object.assign(target.Nav, patch.Nav)

    if (typeof patch.Nav.topCurrentHeight === 'number') {
      target.Nav.currentHeight = patch.Nav.topCurrentHeight + NAV_BOTTOM_STATIC_HEIGHT
    }

    if (
      typeof patch.Nav.currentHeight === 'number' &&
      typeof patch.Nav.topCurrentHeight !== 'number'
    ) {
      target.Nav.currentHeight = patch.Nav.currentHeight
    }
  }

  if (patch.SidebarNoSpace) {
    Object.assign(target.SidebarNoSpace, patch.SidebarNoSpace)
  }

  if (typeof patch.isFullScreen === 'boolean') {
    target.isFullScreen = patch.isFullScreen
  }

  return target
}

export const getPersistableLayoutState = (state: LayoutState): PersistableLayoutState => ({
  Sidebar: { ...state.Sidebar },
  Nav: { ...state.Nav },
  SidebarNoSpace: { ...state.SidebarNoSpace },
  isFullScreen: state.isFullScreen,
})

/**
 * 创建当前布局状态的快照，用于全屏模式恢复
 */
export const createLayoutSnapshot = (state: LayoutState): LayoutStateSnapshot => ({
  sidebarWidth: state.Sidebar.currentWidth,
  navHeight: state.Nav.topCurrentHeight,
  timestamp: Date.now(),
})

/**
 * 从快照恢复布局状态（不包括全屏状态本身）
 */
export const restoreFromSnapshot = (
  state: LayoutState,
  snapshot: LayoutStateSnapshot | null,
): void => {
  if (!snapshot) return

  // 恢复侧边栏宽度相关状态
  state.Sidebar.currentWidth = snapshot.sidebarWidth

  // 恢复导航栏高度相关状态
  state.Nav.topCurrentHeight = snapshot.navHeight
  state.Nav.currentHeight = snapshot.navHeight + NAV_BOTTOM_STATIC_HEIGHT
}

/**
 * 检查当前是否需要保存快照（即将进入全屏且当前非全屏状态）
 */
export const shouldCreateSnapshot = (
  currentFullScreen: boolean,
  targetFullScreen: boolean,
): boolean => {
  return !currentFullScreen && targetFullScreen
}

/**
 * 检查当前是否需要从快照恢复（即将退出全屏且当前为全屏状态）
 */
export const shouldRestoreFromSnapshot = (
  currentFullScreen: boolean,
  targetFullScreen: boolean,
): boolean => {
  return currentFullScreen && !targetFullScreen
}
