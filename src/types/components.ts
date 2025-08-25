/**
 * UI Component types and interfaces
 */
import React from 'react'

// Button component types
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

// Toggler component types
export interface TogglerProps {
  label: string
  value: boolean
  onChange: (value: boolean) => void
}

// Icon expand button types
export interface IconExpandButtonProps {
  icon: React.ReactNode
  children: React.ReactNode
  expanded: boolean
  onClick: () => void
  className?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

// Modal types
export interface ModalState<T> {
  open: boolean
  content: T | null
}

// Recipe display types
export interface RecipeDisplayProps {
  name?: string
  description?: string
  bju?: string
  ingredients?: string
  instructions?: string
  full?: string
}

// Theme switcher types
export interface ThemeSwitcherProps {
  className?: string
}

// Product selection modal types
export interface ProductSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  foods: Array<{
    id: number
    name: string
    imgUrl?: string
    callory?: number
    proteins?: number
    fats?: number
    carbs?: number
    type: string
  }>
  selectedProducts: number[]
  onSelectedProductsChange: (products: number[]) => void
  onAdd: (products: Array<{
    id: number
    name: string
    imgUrl: string
    callory: number
    proteins: number
    fats: number
    carbs: number
    type: string
  }>) => void
  cookPlateItems: Array<{
    id: number
    name: string
    callory?: number
    proteins?: number
    fats?: number
    carbs?: number
    type: string
  }>
}

// Legacy toggler props (to be deprecated)
export interface TogglerPropsType {
  props: {
    title: string
  }
}