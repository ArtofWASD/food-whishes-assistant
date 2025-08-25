import { FoodItemProps, CustomProductFormValues, TogglerProps } from "@/src/types"/**
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