"use client"
import type { FoodItemProps } from "@/src/api/types/foods"
import Image from "next/image"
// заменить название БЖУ на иконки, решить проблему с оформлением

// Выделяем стили в отдельные константы
const CONTAINER_STYLES =
  "grid grid-cols-auto border-gray-600 border-2 px-2 py-2 rounded-lg hover:bg-slate-300 cursor-pointer relative min-h-[40px] min-h-0"

interface FoodItemExtraProps {
  showDeleteButton?: boolean;
  onDelete?: () => void;
  showNutrition?: boolean;
  onToggleNutrition?: () => void;
}

const TYPE_ICONS: Record<string, string> = {
  meat: "/meat.png",
  milk: "/milk.png",
  vegetable: "/vegetable.png",
  grain: "/rice.png",
  fruit: "/fruits.png",
}

// Компонент FoodItem отображает продукт с возможностью раскрытия информации о питательных веществах и удаления
// TODO: Добавить тесты для UI, событий удаления и раскрытия NutritionInfo
function FoodItem(props: FoodItemProps & FoodItemExtraProps) {
  const { id, name, callory, proteins, fats, carbs, showDeleteButton, onDelete, type } = props

  return (
    <div
      className={
        `${CONTAINER_STYLES} w-64 h-30 lg:w-72 lg:h-38 flex flex-col justify-between relative bg-white dark:bg-gray-800 shadow-xl`
      }
      key={id}
    >
      {/* Верхняя панель: иконка + название */}
      <div className="flex items-end absolute top-3 left-4 right-12 gap-2 z-10">
        <Image src={TYPE_ICONS[type] || "/file.svg"} alt={type} width={24} height={24} className="block md:hidden" />
        <Image src={TYPE_ICONS[type] || "/file.svg"} alt={type} width={36} height={36} className="hidden md:block" />
        <span className="text-[24px] md:text-[36px] font-bold text-gray-800 dark:text-white leading-none truncate max-w-[120px] md:max-w-[220px]">{name}</span>
      </div>
      {/* Кнопка удаления в правом верхнем углу */}
      {showDeleteButton && (
        <button
          className="absolute top-1 right-1 w-8 h-8 flex items-center justify-center z-20"
          onClick={(e) => {
            e.stopPropagation()
            onDelete?.()
          }}
          aria-label="Удалить продукт"
        >
          <svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6L14 14M14 6L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
      {/* Калории и БЖУ внизу карточки */}
      <div className="absolute left-4 right-4 bottom-3 flex flex-col gap-0.5 text-sm text-gray-700 dark:text-gray-200">
        <div>
          <span className="font-bold">Калории:</span> {callory} ккал. <span className="font-bold">Белки:</span> {proteins} г.
        </div>
        <div>
          <span className="font-bold">Жиры:</span> {fats} г. <span className="font-bold">Углеводы:</span> {carbs} г.
        </div>
      </div>
    </div>
  )
}

export { FoodItem }
