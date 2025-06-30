"use client"
import React from "react"
import { FoodItem } from "@/src/widgets/food_item/food_item"
import { FoodItemProps } from "@/src/api/types/foods"

type CookPlateProps = {
  items: FoodItemProps[]
  onDrop: (item: FoodItemProps) => void
  onRemoveItem?: (id: number) => void
  onRemoveAll?: () => void
  onGetResult?: () => void
  className?: string
  isDragging?: boolean
}

const CookPlate: React.FC<CookPlateProps> = ({
  items,
  onDrop,
  onRemoveItem,
  onRemoveAll,
  onGetResult,
  className,
  isDragging,
}) => {
  const isEmpty = items.length === 0

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const item = JSON.parse(e.dataTransfer.getData("foodItem"))
    onDrop(item)
  }

  const baseClasses = "border-2 p-4 rounded-lg min-h-[100px] transition-colors"

  let dynamicClasses
  if (isDragging && isEmpty) {
    dynamicClasses = "border-green-800 bg-green-200 border-solid"
  } else {
    dynamicClasses = "border-gray-600 bg-slate-300 bg-opacity-35 border-dashed"
  }

  return (
    <div
      className={`${baseClasses} ${dynamicClasses} ${className || ""} flex flex-col`}
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
    >
      {!isEmpty && (
        <div className="ml-2">
          <button
            onClick={onRemoveAll}
            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
          >
            Удалить всё
          </button>
        </div>
      )}
      <h2 className="text-center mt-4">Cook Plate</h2>
      {isDragging && isEmpty && (
        <p className="text-center font-bold text-green-700">
          Перенеси меня сюда
        </p>
      )}
      <div className="flex gap-2 flex-wrap mt-2 justify-center flex-grow">
        {items.map(item => (
          <FoodItem
            {...item}
            key={item.id}
            showDeleteButton
            onDelete={() => onRemoveItem?.(item.id)}
          />
        ))}
      </div>
      {!isEmpty && (
        <div className="ml-2 mt-2">
          <button
            onClick={onGetResult}
            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
          >
            Получить результат
          </button>
        </div>
      )}
    </div>
  )
}

export default CookPlate 