"use client"
import React, { useState } from "react"
import { FoodItem } from "@/src/widgets/food-item/food-item"
import { useAppStore } from "@/src/store/appStore"
import fakeFoods from "@/src/api/fake_foods/fake_food_api.json"
import CookPlateSummary from "@/src/components/cook-plate/cook-plate-summary"
import { Button } from "@/src/ui/button"
import CustomProductForm from "./custom-product-form"
import type { FoodItemProps } from "@/src/api/types/foods"
import { XMarkIcon } from '@heroicons/react/24/solid'

const CookPlate = ({ className }: { className?: string }) => {
  // Получаем состояние из глобального стора
  const {
    cookPlateItems, setCookPlateItems,
    setShowResults, fetchAIRecipeToStore
  } = useAppStore()
  const isEmpty = cookPlateItems.length === 0

  // Локальные состояния для поиска, выбора, пользовательского продукта и раскрытия NutritionInfo
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [showCustomForm, setShowCustomForm] = useState(false)
  const [openedNutritionId, setOpenedNutritionId] = useState<number | null>(null)

  // Получаем список продуктов из базы
  const foods = (fakeFoods.foods || [])

  // Добавление продукта из базы
  const handleAddProduct = () => {
    if (selectedId == null) return
    const product = foods.find(f => f.id === selectedId)
    if (!product) return
    if (cookPlateItems.some(i => i.id === product.id)) return
    setCookPlateItems([
      ...cookPlateItems,
      product as FoodItemProps // Приведение типа для строгой типизации
    ])
    setSelectedId(null)
  }

  return (
    // Корневой контейнер CookPlate
    <div className={`relative p-4 rounded-lg min-h-[400px] transition-colors ${className || ""} flex flex-col bg-[var(--pastel-green)] bg-opacity-35 dark:bg-[var(--pastel-blue)] dark:text-white`}>
      <div className="flex flex-col items-center w-full">
        <div className="order-1 w-full flex justify-center">
          <CookPlateSummary items={cookPlateItems} />
        </div>
        {/* Блок выбора и добавления продукта */}
        <div className="order-2 w-full flex flex-col md:flex-row gap-2 items-center">
          <select
            value={selectedId ?? ""}
            onChange={e => setSelectedId(Number(e.target.value))}
            className="border rounded-full px-3 py-2 mb w-full md:w-64 focus:ring-2 focus:ring-pastelBlue/60 bg-white/80 backdrop-blur-sm shadow-sm"
          >
            <option value="">Выберите продукт</option>
            {foods.map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
          <Button
            onClick={handleAddProduct}
            className="bg-gradient-to-r from-green-400 to-green-600 shadow-md text-white hover:from-green-500 hover:to-green-700 focus:ring-2 focus:ring-green-300"
          >
            Добавить продукт
          </Button>
          <Button
            onClick={() => setShowCustomForm(v => !v)}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-md text-white hover:from-yellow-500 hover:to-yellow-700 focus:ring-2 focus:ring-yellow-300"
          >
            Добавить свой продукт
          </Button>
        </div>
      </div>
      {/* Форма для пользовательского продукта */}
      {showCustomForm && (
        <div className="fixed inset-0 px-4 z-50 flex items-center justify-center bg-black/60 animate-fade-in">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-2xl h-[250px] max-h-[250px] relative animate-fade-in-up flex flex-col">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
              onClick={() => setShowCustomForm(false)}
              aria-label="Закрыть"
            >
              <XMarkIcon className="w-7 h-7" /> 
            </button>
            <CustomProductForm
              onAdd={(product: FoodItemProps) => {
                setCookPlateItems([...cookPlateItems, product])
                setShowCustomForm(false)
              }}
              onCancel={() => setShowCustomForm(false)}
              showLabels
              style={{ height: '100%' }}
            />
          </div>
        </div>
      )}

      {/* Список продуктов на тарелке и кнопки действий */}
      <div className="flex flex-col flex-grow w-full">
        {/* Дисклеймер, если нет ингредиентов */}
        {isEmpty && (
          <div className="flex justify-center items-center flex-grow">
            <div className="border-2 border-dashed border-gray-400 text-gray-500 rounded-lg mt-2 p-2 py-4 text-center text-lg lg:text-2xl max-w-md mx-auto font-pacifico">
              Добавьте хотя бы один ингредиент.<br />Вы можете выбрать из готового списка или добавить свой собственный.
            </div>
          </div>
        )}
        {/* Список продуктов на тарелке */}
        <div className="flex gap-1 flex-wrap mt-2 justify-center items-center flex-grow order-1 md:order-1 lg:flex-row lg:flex-nowrap">
          {!isEmpty && cookPlateItems.map((item, idx) => (
            <FoodItem
              {...item}
              key={item.id}
              showDeleteButton
              onDelete={() => setCookPlateItems(cookPlateItems.filter(i => i.id !== item.id))}
              showNutrition={openedNutritionId === item.id}
              onToggleNutrition={() => setOpenedNutritionId(openedNutritionId === item.id ? null : item.id)}
              className={`min-h-[48px] h-auto px-2 py-1 text-xs md:text-sm ${idx === 0 ? 'sm:mt-2 md:mt-0' : ''} ${idx === cookPlateItems.length - 1 ? 'sm:mb-2 md:mb-0' : ''}`}
            />
          ))}
        </div>
        {/* Кнопки действий: mobile под списком, md+ справа */}
        <div className="flex flex-row gap-2 mt-3 md:mt-0 order-2 md:order-2 md:justify-end justify-center">
          {cookPlateItems.length >= 2 && (
            <Button
              onClick={() => setCookPlateItems([])}
              className="bg-gradient-to-r from-red-400 to-red-600 shadow-md text-white hover:from-red-500 hover:to-red-700 focus:ring-2 focus:ring-red-300 z-20 w-auto px-4 py-1 text-sm"
            >
              Удалить ингридиенты
            </Button>
          )}
          {!isEmpty && (
            <Button
              onClick={() => {
                setShowResults(true)
                if (cookPlateItems.length > 0) fetchAIRecipeToStore()
              }}
              className="bg-gradient-to-r from-blue-400 to-blue-600 shadow-md text-white hover:from-blue-500 hover:to-blue-700 focus:ring-2 focus:ring-blue-300 z-20 w-auto px-4 py-1 text-sm"
            >
              Найти рецепты
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CookPlate