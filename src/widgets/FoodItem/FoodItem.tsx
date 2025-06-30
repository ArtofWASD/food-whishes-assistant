"use client"
import { FoodItemComponentProps } from "@/src/api/types/FoodItem"
import { AnimatePresence, motion } from "framer-motion"
import NutritionInfo from "@/src/widgets/NutritionInfo/NutritionInfo"
import { useState } from "react"
import Image from "next/image"
// заменить название БЖУ на иконки, решить проблему с оформлением

// Выделяем стили в отдельные константы
const CONTAINER_STYLES =
  "grid grid-cols-auto gap-2 border-gray-600 border-2 px-2 py-2 rounded-lg hover:bg-slate-300 cursor-pointer relative min-h-[40px]"

function FoodItem(props: FoodItemComponentProps) {
  const { id, name, callory, proteins, fats, carbs, onDragStart, onDragEnd, showDeleteButton, onDelete } = props
  const [showNutrition, setShowNutrition] = useState(false)

  return (
    <motion.div
      layout
      transition={{ duration: 0.3 }}
      className={CONTAINER_STYLES}
      key={id}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="flex items-center gap-2">
        <h3 className="truncate flex-1">{name}</h3>
        <div className="flex gap-1 flex-shrink-0">
          <button
            className="bg-gray-200 hover:bg-gray-300 rounded-full"
            onClick={(e) => {
              e.stopPropagation()
              setShowNutrition(!showNutrition)
            }}
          >
            <Image src="/dots.png" alt="dots" width={16} height={16} />
          </button>
          {showDeleteButton && (
            <button
              className="bg-red-200 hover:bg-red-300 rounded-full w-4 h-4 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation()
                onDelete?.()
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showNutrition && (
          <NutritionInfo
            proteins={proteins}
            fats={fats}
            carbs={carbs}
            callory={callory}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export { FoodItem }
