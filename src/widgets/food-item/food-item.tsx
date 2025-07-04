"use client"
import { FoodItemComponentProps } from "@/src/api/types/FoodItem"
import { AnimatePresence, motion } from "framer-motion"
import NutritionInfo from "@/src/widgets/nutrition-info/nutrition-info"
import { useState } from "react"
import Image from "next/image"
// заменить название БЖУ на иконки, решить проблему с оформлением

// Выделяем стили в отдельные константы
const CONTAINER_STYLES =
  "grid grid-cols-auto border-gray-600 border-2 px-2 py-2 rounded-lg hover:bg-slate-300 cursor-pointer relative min-h-[40px] min-h-0"

function FoodItem(props: FoodItemComponentProps & { showNutrition?: boolean; onToggleNutrition?: () => void }) {
  const { id, name, callory, proteins, fats, carbs, showDeleteButton, onDelete, showNutrition: showNutritionProp, onToggleNutrition } = props
  const [localShowNutrition, setLocalShowNutrition] = useState(false)
  const showNutrition = showNutritionProp !== undefined ? showNutritionProp : localShowNutrition
  const handleToggleNutrition = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onToggleNutrition) {
      onToggleNutrition()
    } else {
      setLocalShowNutrition(v => !v)
    }
  }

  return (
    <div
      className={CONTAINER_STYLES}
      key={id}
      style={{ height: showNutrition ? 'auto' : 56, minHeight: 40, transition: 'height 0.2s' }}
    >
      <div className="flex items-center gap-2">
        <h3 className="truncate flex-1 text-sm">{name}</h3>
        <div className="flex gap-1 flex-shrink-0">
          <button
            className="bg-gray-200 hover:bg-gray-300 rounded-full"
            onClick={handleToggleNutrition}
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
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden', height: showNutrition ? 'auto' : undefined }}
          >
            <NutritionInfo
              proteins={proteins}
              fats={fats}
              carbs={carbs}
              callory={callory}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { FoodItem }
