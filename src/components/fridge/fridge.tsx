"use client"
import React from "react"
import { FoodItem } from "@/src/widgets/FoodItem/FoodItem"
import CookPlate from "@/src/components/CookPlate/CookPlate"
import foodsData from "@/src/api/fake_foods/fake_food_api.json"
import { useAppStore } from "@/src/store/appStore"
import { FoodItemProps } from "@/src/api/types/Foods"

const viewModes = [
  { value: 'list', label: 'Список' },
  { value: 'grid', label: 'Плитка 4 в ряд' },
  { value: 'flow', label: 'Все подряд' },
]

const Fridge: React.FC = () => {
  const {
    fridgeItems, setFridgeItems,
    cookPlateItems, setCookPlateItems,
    isDragging, setIsDragging,
    viewMode, setViewMode,
    setShowResults
  } = useAppStore()

  React.useEffect(() => {
    if (fridgeItems.length === 0 && cookPlateItems.length === 0) {
      setFridgeItems(foodsData.foods)
    }
  }, [])

  React.useEffect(() => {
    setShowResults(false)
  }, [fridgeItems, cookPlateItems])

  const handleDragStart = (item: FoodItemProps) => (e: React.DragEvent) => {
    e.dataTransfer.setData("foodItem", JSON.stringify(item))
    setIsDragging(true)
  }
  const handleDragEnd = () => setIsDragging(false)
  const handleDropToCookPlate = (item: FoodItemProps) => {
    setFridgeItems(fridgeItems.filter(i => i.id !== item.id))
    setCookPlateItems([...cookPlateItems, item])
  }
  const handleRemoveFromCookPlate = (id: number) => {
    const itemToReturn = cookPlateItems.find(item => item.id === id)
    if (itemToReturn) {
      setCookPlateItems(cookPlateItems.filter(i => i.id !== id))
      setFridgeItems([...fridgeItems, itemToReturn])
    }
  }
  const handleRemoveAll = () => {
    setFridgeItems([...fridgeItems, ...cookPlateItems])
    setCookPlateItems([])
  }

  let containerClass = ""
  if (viewMode === 'list') {
    containerClass = "flex flex-col gap-2 py-2 pr-4 max-h-[400px] overflow-y-auto"
  } else if (viewMode === 'grid') {
    containerClass = "grid grid-cols-4 gap-2 py-2"
  } else if (viewMode === 'flow') {
    containerClass = "flex flex-row gap-2 py-2 flex-wrap"
  }

  return (
    <div className="flex gap-4">
      <div className="p-4 rounded-lg flex-1 bg-[var(--pastel-green)] bg-opacity-35 dark:bg-[var(--pastel-blue)] dark:text-white relative min-h-[320px] min-w-[320px] max-w-full">
        <div className="flex flex-row items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Fridge</h1>
          <div className="z-10">
            <select
              className="p-2 rounded text-sm"
              value={viewMode}
              onChange={e => setViewMode(e.target.value)}
            >
              {viewModes.map(mode => (
                <option key={mode.value} value={mode.value}>{mode.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={containerClass + " mt-4"}>
          {fridgeItems.map(food => (
            <FoodItem
              {...food}
              key={food.id}
              onDragStart={handleDragStart(food)}
              onDragEnd={handleDragEnd}
            />
          ))}
        </div>
      </div>
      <CookPlate
        className="flex-1"
      />
    </div>
  )
}

export default Fridge
