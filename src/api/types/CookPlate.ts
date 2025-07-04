import { FoodItemProps } from "./foods"

export type CookPlateProps = {
  items: FoodItemProps[]
  onDrop: (item: FoodItemProps) => void
  onRemoveItem?: (id: number) => void
  onRemoveAll?: () => void
  onGetResult?: () => void
  className?: string
  isDragging?: boolean
} 