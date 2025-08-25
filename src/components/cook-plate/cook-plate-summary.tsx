import React from "react"
import { NutritionSummaryProps } from "@/src/types"

const CookPlateSummary: React.FC<NutritionSummaryProps> = ({ items }) => {
  if (!items.length) return null
  const total = items.reduce(
    (acc: { callory: number; proteins: number; fats: number; carbs: number }, item: any) => {
      acc.callory += item.callory || 0
      acc.proteins += item.proteins || 0
      acc.fats += item.fats || 0
      acc.carbs += item.carbs || 0
      return acc
    },
    { callory: 0, proteins: 0, fats: 0, carbs: 0 },
  )

  // Округляем значения до 1 знака после запятой
  const round = (v: number) => Math.round(v * 10) / 10

  return (
    <div
      className="
        md:absolute md:right-4 md:top-4
        bg-white/80 dark:bg-slate-800/80 rounded-xl px-4 py-2 shadow-md flex flex-nowrap gap-4 text-sm md:text-md font-semibold z-10 overflow-x-auto whitespace-nowrap
        sm:mx-auto sm:flex sm:justify-center sm:w-full md:w-auto md:mx-0
        justify-center mb-4
      ">
      <span>На 100гр. Ккал: {round(total.callory)}</span>
      <span>Б: {round(total.proteins)} г</span>
      <span>Ж: {round(total.fats)} г</span>
      <span>У: {round(total.carbs)} г</span>
    </div>
  )
}

export default CookPlateSummary
