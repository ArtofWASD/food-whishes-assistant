import React from "react"
import { FoodItem } from "@/src/widgets/FoodItem/FoodItem"
import { FoodItemComponentProps } from "@/src/api/types/FoodItem"

type Props = {
  items: FoodItemComponentProps[]
  openedNutritionId: number | null
  setOpenedNutritionId: (id: number | null) => void
  onDelete: (id: number) => void
}

const CookPlateList: React.FC<Props> = ({ items, openedNutritionId, setOpenedNutritionId, onDelete }) => (
  <div className="flex gap-2 flex-wrap mt-2 justify-center flex-grow">
    {items.map(item => (
      <FoodItem
        {...item}
        key={item.id}
        showDeleteButton
        onDelete={() => onDelete(item.id)}
        showNutrition={openedNutritionId === item.id}
        onToggleNutrition={() => setOpenedNutritionId(openedNutritionId === item.id ? null : item.id)}
      />
    ))}
  </div>
)

export default CookPlateList 