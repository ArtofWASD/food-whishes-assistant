"use client"
import React, { useState } from "react"
import { FoodItem } from "@/src/widgets/food_item/food_item"
import { FoodItemProps } from "@/src/api/types/foods"
import CookPlate from "@/src/components/cook_plate/CookPlate"

const MOCK_FOODS: FoodItemProps[] = [
  {
    id: 1,
    name: "Яблоко",
    callory: 52,
    proteins: 0.3,
    fats: 0.2,
    carbs: 14,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg",
  },
  {
    id: 2,
    name: "Куриная грудка",
    callory: 165,
    proteins: 31,
    fats: 3.6,
    carbs: 0,
    imgUrl: "https://www.themealdb.com/images/ingredients/chicken-breast.png",
  },
  {
    id: 3,
    name: "Огурец",
    callory: 16,
    proteins: 0.7,
    fats: 0.1,
    carbs: 3.6,
    imgUrl: "https://www.themealdb.com/images/ingredients/cucumber.png",
  },
  {
    id: 4,
    name: "Соус терияки",
    callory: 89,
    proteins: 1,
    fats: 0.2,
    carbs: 20,
    imgUrl: "https://www.themealdb.com/images/ingredients/teriyaki-sauce.png",
  },
]

const Fridge = () => {
  const [fridgeItems, setFridgeItems] = useState<FoodItemProps[]>(MOCK_FOODS)
  const [cookPlateItems, setCookPlateItems] = useState<FoodItemProps[]>([])
  const [isDragging, setIsDragging] = useState(false)

  // useEffect(() => {
  //   fetch("/src/api/fake_foods/fake_food_api.json")
  //     .then(res => res.json())
  //     .then(data => setFridgeItems(data.foods))
  // }, [])

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
      <div className="border-gray-600 border-2 border-dashed p-4 rounded-lg bg-slate-300 bg-opacity-35 flex-1">
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
