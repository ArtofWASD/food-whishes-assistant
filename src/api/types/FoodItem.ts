export type FoodItemComponentProps = {
  id: number
  name: string
  callory: number
  proteins: number
  fats: number
  carbs: number
  onDragStart?: (e: React.DragEvent) => void
  onDragEnd?: (e: React.DragEvent) => void
  showDeleteButton?: boolean
  onDelete?: () => void
} 