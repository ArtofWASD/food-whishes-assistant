/**
 * Food item types and interfaces
 */

// Food product category types
export type FoodType = 'meat' | 'milk' | 'vegetable' | 'grain' | 'fruit'

// Main food item interface
export interface FoodItemProps {
  id: number
  name: string
  imgUrl: string
  callory: number
  fats: number
  carbs: number
  proteins: number
  type: FoodType
}

// Nutrition information type
export type NutritionInfo = {
  proteins: number
  fats: number
  carbs: number
  callory: number
}

// Type icons mapping
export type TypeIconsMap = Record<FoodType, string>

// Food item with extra functionality
export interface FoodItemExtraProps {
  showDeleteButton?: boolean
  onDelete?: () => void
  showNutrition?: boolean
  onToggleNutrition?: () => void
}

// Combined food item props for components
export type FoodItemComponentProps = FoodItemProps & FoodItemExtraProps & { 
  className?: string 
}

// Nutritional summary props
export interface NutritionSummaryProps {
  items: Array<Pick<FoodItemProps, "callory" | "proteins" | "fats" | "carbs">>
}

// Nutrition info component props
export interface NutritionInfoProps {
  proteins: number
  fats: number
  carbs: number
  callory: number
}