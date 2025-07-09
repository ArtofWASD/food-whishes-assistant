import React from "react"
import type { FoodItemProps } from "@/src/api/types/foods"

type Props = {
  items: Array<Pick<FoodItemProps, 'callory' | 'proteins' | 'fats' | 'carbs'>>
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
    <div className="absolute left-1/2 -translate-x-1/2 top-2 md:left-auto md:translate-x-0 md:right-4 bg-white/80 dark:bg-slate-800/80 rounded-lg px-4 py-2 shadow-md flex flex-nowrap gap-4 text-base font-semibold z-10 overflow-x-auto whitespace-nowrap">
      <span>Калории: {round(total.callory)}</span>
      <span>Б: {round(total.proteins)} г</span>
      <span>Ж: {round(total.fats)} г</span>
      <span>У: {round(total.carbs)} г</span>
    </div>
  )
}

export default CookPlateSummary 