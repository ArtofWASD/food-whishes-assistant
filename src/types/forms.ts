/**
 * Form types and validation interfaces
 */
import { FoodType } from './food.js'

// Custom product form types
export interface CustomProductFormValues {
  name: string
  callory: number
  proteins: number
  fats: number
  carbs: number
  type: FoodType
}

export interface CustomProductFormProps {
  onAdd: (product: CustomProductFormValues & { id: number; imgUrl: string }) => void
  onCancel: () => void
  showLabels?: boolean
  style?: React.CSSProperties
}

// Authentication form types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  email: string
  password: string
  confirm: string
}

export interface AuthDrawerProps {
  open: boolean
  onClose: () => void
}

// Form validation types
export type AuthMode = 'login' | 'register'

// Meal selection types
export type MealType = 'breakfast' | 'lunch' | 'dinner'