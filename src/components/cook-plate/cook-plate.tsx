"use client"
import React, { useState } from "react"
import { FoodItem } from "@/src/widgets/food-item/food-item"
import { useAppStore } from "@/src/store/appStore"
import fakeFoods from "@/src/api/fake_foods/fake_food_api.json"
import CookPlateSummary from "@/src/components/cook-plate/cook-plate-summary"
import { Button } from "@/src/ui/button"  

const CookPlate = ({ className }: { className?: string }) => {
  // Получаем состояние из глобального стора
  const {
    cookPlateItems, setCookPlateItems,
    setShowResults, fetchAIRecipeToStore
  } = useAppStore()
  const isEmpty = cookPlateItems.length === 0

  // Локальные состояния для поиска, выбора, пользовательского продукта и раскрытия NutritionInfo
  const [search, setSearch] = useState("")
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [showCustomForm, setShowCustomForm] = useState(false)
  const [customProduct, setCustomProduct] = useState({
    name: "",
    callory: "",
    proteins: "",
    fats: "",
    carbs: ""
  })
  const [openedNutritionId, setOpenedNutritionId] = useState<number | null>(null)

  // Получаем список продуктов из базы
  const foods = (fakeFoods.foods || [])
  const filteredFoods = foods.filter(f => f.name.toLowerCase().includes(search.toLowerCase()))

  // Добавление продукта из базы
  const handleAddProduct = () => {
    if (selectedId == null) return
    const product = foods.find(f => f.id === selectedId)
    if (!product) return
    if (cookPlateItems.some(i => i.id === product.id)) return
    setCookPlateItems([...cookPlateItems, product])
    setSelectedId(null)
    setSearch("")
  }

  // Добавление пользовательского продукта
  const handleAddCustomProduct = () => {
    if (!customProduct.name.trim()) return
    const newProduct = {
      id: Date.now(),
      name: customProduct.name,
      callory: Number(customProduct.callory) || 0,
      proteins: Number(customProduct.proteins) || 0,
      fats: Number(customProduct.fats) || 0,
      carbs: Number(customProduct.carbs) || 0,
      imgUrl: ""
    }
    setCookPlateItems([...cookPlateItems, newProduct])
    setShowCustomForm(false)
    setCustomProduct({ name: "", callory: "", proteins: "", fats: "", carbs: "" })
    setSearch("")
  }

  return (
    // Корневой контейнер CookPlate
    <div className={`relative p-4 rounded-lg min-h-[400px] transition-colors ${className || ""} flex flex-col bg-[var(--pastel-green)] bg-opacity-35 dark:bg-[var(--pastel-blue)] dark:text-white`}>
      {/* Сумма БЖУ и калорий в правом верхнем углу */}
      <CookPlateSummary items={cookPlateItems} />
      {/* Блок поиска, выбора и добавления продукта */}
      <div className="flex flex-col md:flex-row gap-2 items-center mb-4">
        <input
          type="text"
          placeholder="Поиск продукта..."
          value={search}
          onChange={e => {
            setSearch(e.target.value)
            setShowCustomForm(false)
          }}
          className="border rounded-lg px-3 py-2 w-full md:w-64"
        />
        <select
          value={selectedId ?? ""}
          onChange={e => setSelectedId(Number(e.target.value))}
          className="border rounded-lg px-3 py-2 w-full md:w-64"
        >
          <option value="">Выберите продукт</option>
          {filteredFoods.map(f => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>
        <Button
          onClick={handleAddProduct}
          className="bg-gradient-to-r from-green-400 to-green-600 shadow-md text-white hover:from-green-500 hover:to-green-700 focus:ring-2 focus:ring-green-300"
        >
          Добавить продукт
        </Button>
        {search.trim() && filteredFoods.length === 0 && !showCustomForm && (
          <Button
            onClick={() => setShowCustomForm(true)}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-md text-white hover:from-yellow-500 hover:to-yellow-700 focus:ring-2 focus:ring-yellow-300"
          >
            Добавить свой продукт
          </Button>
        )}
      </div>
      {/* Форма для пользовательского продукта */}
      {showCustomForm && (
        <div className="mb-4 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900 flex flex-col gap-2">
          <input
            type="text"
            placeholder="Название продукта"
            value={customProduct.name}
            onChange={e => setCustomProduct({ ...customProduct, name: e.target.value })}
            className="border rounded-lg px-3 py-2"
          />
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Калории"
              value={customProduct.callory}
              onChange={e => setCustomProduct({ ...customProduct, callory: e.target.value })}
              className="border rounded-lg px-3 py-2 w-1/4"
            />
            <input
              type="number"
              placeholder="Белки"
              value={customProduct.proteins}
              onChange={e => setCustomProduct({ ...customProduct, proteins: e.target.value })}
              className="border rounded-lg px-3 py-2 w-1/4"
            />
            <input
              type="number"
              placeholder="Жиры"
              value={customProduct.fats}
              onChange={e => setCustomProduct({ ...customProduct, fats: e.target.value })}
              className="border rounded-lg px-3 py-2 w-1/4"
            />
            <input
              type="number"
              placeholder="Углеводы"
              value={customProduct.carbs}
              onChange={e => setCustomProduct({ ...customProduct, carbs: e.target.value })}
              className="border rounded-lg px-3 py-2 w-1/4"
            />
          </div>
          <div className="flex gap-2 mt-2">
            <Button
              onClick={handleAddCustomProduct}
              className="bg-gradient-to-r from-green-400 to-green-600 shadow-md text-white hover:from-green-500 hover:to-green-700 focus:ring-2 focus:ring-green-300"
            >
              Добавить
            </Button>
            <Button
              onClick={() => setShowCustomForm(false)}
              className="bg-gray-300 text-gray-800 hover:bg-gray-400"
            >
              Отмена
            </Button>
          </div>
        </div>
      )}

      {/* Список продуктов на тарелке */}
      <div className="flex gap-2 flex-wrap mt-2 justify-center flex-grow">
        {cookPlateItems.map(item => (
          <FoodItem
            {...item}
            key={item.id}
            showDeleteButton
            onDelete={() => setCookPlateItems(cookPlateItems.filter(i => i.id !== item.id))}
            showNutrition={openedNutritionId === item.id}
            onToggleNutrition={() => setOpenedNutritionId(openedNutritionId === item.id ? null : item.id)}
          />
        ))}
      </div>
      {/* Кнопки действий */}
      {cookPlateItems.length >= 2 && (
        <Button
          onClick={() => setCookPlateItems([])}
          className="absolute left-4 bottom-4 bg-gradient-to-r from-red-400 to-red-600 shadow-md text-white hover:from-red-500 hover:to-red-700 focus:ring-2 focus:ring-red-300 z-20"
        >
          Удалить все
        </Button>
      )}
      {!isEmpty && (
        <Button
          onClick={() => {
            setShowResults(true)
            if (cookPlateItems.length > 0) fetchAIRecipeToStore()
          }}
          className="fixed md:absolute right-4 bottom-4 bg-gradient-to-r from-blue-400 to-blue-600 shadow-md text-white hover:from-blue-500 hover:to-blue-700 focus:ring-2 focus:ring-blue-300 z-20"
        >
          Получить результат
        </Button>
      )}
    </div>
  )
}

export default CookPlate 