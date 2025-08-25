"use client"
import { useState } from "react"
import { FoodItem } from "@/src/widgets/food-item/food-item"
import { useAppStore } from "@/src/store/appStore"
import fakeFoods from "@/src/api/fake_foods/fake_food_api.json"
import CookPlateSummary from "@/src/components/cook-plate/cook-plate-summary"
import { Button } from "@/src/ui/button"
import CustomProductForm from "./custom-product-form"
import ProductSelectionModal from "./product-selection-modal"
import { XMarkIcon } from '@heroicons/react/24/solid'
import { FoodItemProps } from '@/src/types'

const CookPlate = ({ className }: { className?: string }) => {
  // Получаем состояние из глобального стора
  const {
    cookPlateItems, setCookPlateItems,
    setShowResults, fetchAIRecipeToStore
  } = useAppStore()
  const isEmpty = cookPlateItems.length === 0

  // Локальные состояния для поиска, выбора, пользовательского продукта и раскрытия NutritionInfo
  const [showCustomForm, setShowCustomForm] = useState(false)
  const [openedNutritionId, setOpenedNutritionId] = useState<number | null>(null)
  const [showProductModal, setShowProductModal] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])

  // Получаем список продуктов из базы
  const foods = (fakeFoods.foods || [])

  return (
    // Корневой контейнер CookPlate
    <div className={`relative min-h-[400px] transition-colors ${className || ""} flex flex-col bg-[var(--pastel-green)] bg-opacity-35 dark:bg-[var(--pastel-blue)] dark:text-white`}>
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 mb-2">
        {/* Блок кнопок добавления продуктов */}
        <div className="flex flex-col md:flex-row gap-2 items-center order-1 self-start w-full md:w-auto pt-4 pl-4">
          {/* <select ...> ... </select> удалено */}
          <Button
            onClick={() => setShowProductModal(true)}
            className="bg-[#08A045]/90 text-white hover:bg-[#08A045]/100 hover:shadow-lg"
          >
            Добавить продукт
          </Button>
          <Button
            onClick={() => setShowCustomForm(v => !v)}
            className="bg-[#FFB627]/90 text-gray-800 hover:bg-[#FFB627]/100 hover:shadow-lg"
          >
            Добавить свой продукт
          </Button>
        </div>
        {/* Блок с подсчётом калорий */}
        <div className="order-2 self-end w-full md:w-auto flex justify-center lg:justify-end">
          <CookPlateSummary items={cookPlateItems} />
        </div>
      </div>
      {/* Product Selection Modal */}
      <ProductSelectionModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        foods={foods}
        selectedProducts={selectedProducts}
        onSelectedProductsChange={setSelectedProducts}
        onAdd={(newProducts) => {
          setCookPlateItems([...cookPlateItems, ...newProducts as FoodItemProps[]])
        }}
        cookPlateItems={cookPlateItems}
      />
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
        <div className="flex flex-row gap-2 mt-3 md:mt-0 order-2 md:order-2 md:justify-end justify-center pr-4 pb-4">
          {cookPlateItems.length >= 2 && (
            <Button
              onClick={() => setCookPlateItems([])}
              className="bg-[#EF3E36]/90 text-white hover:bg-[#EF3E36]/100 hover:shadow-lg z-20 w-auto px-4 py-1 text-sm"
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
              className="bg-[#026C7C]/90 text-white hover:bg-[#026C7C]/100 hover:shadow-lg z-20 w-auto px-4 py-1 text-sm"
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