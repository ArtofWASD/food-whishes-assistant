import React from "react"
import { FoodItemComponentProps } from "@/src/api/types/FoodItem"

type Props = {
  items: Array<Pick<FoodItemComponentProps, 'callory' | 'proteins' | 'fats' | 'carbs'>>
}

const CookPlateSummary: React.FC<Props> = ({ items }) => {
  if (!items.length) return null
  const total = items.reduce((acc, item) => {
    acc.callory += item.callory || 0
    acc.proteins += item.proteins || 0
    acc.fats += item.fats || 0
    acc.carbs += item.carbs || 0
    return acc
  }, { callory: 0, proteins: 0, fats: 0, carbs: 0 })

  // Округляем значения до 1 знака после запятой
  const round = (v: number) => Math.round(v * 10) / 10

  return (
    <div className="absolute top-2 right-4 bg-white/80 dark:bg-slate-800/80 rounded-lg px-4 py-2 shadow-md flex flex-wrap gap-4 text-base font-semibold z-10">
      <span>Калории: {round(total.callory)}</span>
      <span>Б: {round(total.proteins)} г</span>
      <span>Ж: {round(total.fats)} г</span>
      <span>У: {round(total.carbs)} г</span>
    </div>
  )
}

export default CookPlateSummary 