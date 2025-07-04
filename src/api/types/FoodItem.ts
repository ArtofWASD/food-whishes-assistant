export type FoodItemComponentProps = {
  id: number
  name: string
  callory: number
  proteins: number
  fats: number
  carbs: number
  showDeleteButton?: boolean
  onDelete?: () => void
} 