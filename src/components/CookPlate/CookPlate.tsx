"use client"
import React from "react"
import { FoodItem } from "@/src/widgets/FoodItem/FoodItem"
import { useAppStore } from "@/src/store/appStore"

const CookPlate = ({ className }: { className?: string }) => {
  const {
    cookPlateItems, setCookPlateItems,
    isDragging, setIsDragging,
    setFridgeItems, fridgeItems,
    setShowResults
  } = useAppStore()
  const isEmpty = cookPlateItems.length === 0

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const item = JSON.parse(e.dataTransfer.getData("foodItem"))
    setFridgeItems(fridgeItems.filter(i => i.id !== item.id))
    setCookPlateItems([...cookPlateItems, item])
  }

  const baseClasses = "p-4 rounded-lg min-h-[100px] transition-colors"
  let dynamicClasses
  if (isDragging && isEmpty) {
    dynamicClasses = "bg-green-200"
  } else {
    dynamicClasses = "bg-[var(--pastel-green)] bg-opacity-35 dark:bg-[var(--pastel-blue)] dark:text-white"
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
            onClick={() => {
              setFridgeItems([...fridgeItems, ...cookPlateItems])
              setCookPlateItems([])
            }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-400 to-pink-600 shadow-md text-white font-semibold hover:from-pink-500 hover:to-pink-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
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
        {cookPlateItems.map(item => (
          <FoodItem
            {...item}
            key={item.id}
            showDeleteButton
            onDelete={() => setCookPlateItems(cookPlateItems.filter(i => i.id !== item.id))}
          />
        ))}
      </div>
      {!isEmpty && (
        <div className="ml-2 mt-2">
          <button
            onClick={() => setShowResults(true)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 shadow-md text-white font-semibold hover:from-blue-500 hover:to-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Получить результат
          </button>
        </div>
      )}
    </div>
  )
}

export default CookPlate 