"use client"
import React, { useState } from "react"
import { FoodItem } from "@/src/widgets/FoodItem/FoodItem"
import { FoodItemProps } from "@/src/api/types/Foods"
import CookPlate from "@/src/components/CookPlate/CookPlate"
import foodsData from "@/src/api/fake_foods/fake_food_api.json"

const Fridge = () => {
  const [fridgeItems, setFridgeItems] = useState<FoodItemProps[]>(foodsData.foods)
  const [cookPlateItems, setCookPlateItems] = useState<FoodItemProps[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = (item: FoodItemProps) => (e: React.DragEvent) => {
    e.dataTransfer.setData("foodItem", JSON.stringify(item))
    setIsDragging(true)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const handleDropToCookPlate = (item: FoodItemProps) => {
    setFridgeItems(items => items.filter(i => i.id !== item.id))
    setCookPlateItems(items => [...items, item])
  }

  const handleRemoveFromCookPlate = (id: number) => {
    const itemToReturn = cookPlateItems.find(item => item.id === id)
    if (itemToReturn) {
      setCookPlateItems(items => items.filter(i => i.id !== id))
      setFridgeItems(items => [...items, itemToReturn])
    }
  }

  const handleRemoveAll = () => {
    setFridgeItems(items => [...items, ...cookPlateItems])
    setCookPlateItems([])
  }

  const handleGetResult = () => {
    // Здесь будет логика получения результата
    console.log("Получаем результат для:", cookPlateItems)
  }

  return (
    <div className="flex gap-4">
      <div className="p-4 rounded-lg flex-1 bg-[var(--pastel-green)] bg-opacity-35 dark:bg-[var(--pastel-blue)] dark:text-white">
        <h1 className="text-center">Fridge</h1>
        <div className="flex gap-2 py-2 flex-wrap">
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
        items={cookPlateItems}
        onDrop={handleDropToCookPlate}
        onRemoveItem={handleRemoveFromCookPlate}
        onRemoveAll={handleRemoveAll}
        onGetResult={handleGetResult}
        className="flex-1"
        isDragging={isDragging}
      />
    </div>
  )
}

export default Fridge
