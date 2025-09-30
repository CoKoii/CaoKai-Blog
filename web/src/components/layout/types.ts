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

export interface LayoutState {
  Sidebar: LayoutSidebarState
  Nav: LayoutNavState
  SidebarNoSpace: LayoutSidebarNoSpaceState
  isFullScreen: boolean
  isMobile: boolean
}

export type PersistableLayoutState = Omit<LayoutState, 'isMobile'>

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Record<string, any> ? DeepPartial<T[K]> : T[K]
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

    if (typeof patch.Nav.currentHeight === 'number' && typeof patch.Nav.topCurrentHeight !== 'number') {
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
