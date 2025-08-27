/**
 * UI-specific types for styling, animations, and interactions
 */

// Theme types
export type ThemeMode = 'light' | 'dark' | 'system'

// Animation states
export type AnimationState = 'idle' | 'loading' | 'success' | 'error'

// Loading message configuration
export interface LoadingConfig {
  messages: string[]
  interval: number
  minDuration: number
}

// Responsive breakpoint types
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

// Common style props
export interface StyleProps {
  className?: string
  style?: React.CSSProperties
}

// Layout types
export type LayoutDirection = 'row' | 'column'
export type LayoutAlign = 'start' | 'center' | 'end' | 'stretch'
export type LayoutJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

// Navigation types
export interface NavigationItem {
  label: string
  href: string
  icon?: React.ReactNode
  active?: boolean
}

// Grid and layout types
export interface GridConfig {
  columns: number
  gap: number
  responsive?: Partial<Record<Breakpoint, { columns: number; gap: number }>>
}

// Color scheme types
export interface ColorScheme {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  error: string
  warning: string
  success: string
}

// Spacing system
export type SpacingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type SpacingValue = number | SpacingSize

// Modal animation types
export type ModalAnimationType = 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'none'

// Modal size types
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

// Modal backdrop behavior
export type ModalBackdropBehavior = 'close' | 'none' | 'blur'

// Universal Modal component props
export interface ModalProps {
  // Core modal state
  isOpen: boolean
  onClose: () => void
  
  // Content and presentation
  title?: string
  children: React.ReactNode
  size?: ModalSize
  
  // Styling and appearance
  className?: string
  contentClassName?: string
  overlayClassName?: string
  showCloseButton?: boolean
  closeButtonClassName?: string
  
  // Background and backdrop
  gradientBackground?: string
  backdrop?: ModalBackdropBehavior
  
  // Animation
  animation?: ModalAnimationType
  animationDuration?: number
  
  // Behavior
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
  preventScroll?: boolean
  
  // Accessibility
  'aria-labelledby'?: string
  'aria-describedby'?: string
  role?: string
  
  // Event handlers
  onOpen?: () => void
  onClosed?: () => void
}

// Modal state management interface
export interface ModalState<T = unknown> {
  open: boolean
  content: T | null
}