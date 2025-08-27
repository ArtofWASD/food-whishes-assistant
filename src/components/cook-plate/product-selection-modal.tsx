import { Button } from "@/src/ui/button"
import Modal from "@/src/ui/modal"
import { ProductSelectionModalProps, FoodItemProps } from "@/src/types"

const ProductSelectionModal: React.FC<ProductSelectionModalProps> = ({ 
  isOpen, 
  onClose, 
  foods, 
  selectedProducts, 
  onSelectedProductsChange, 
  onAdd,
  cookPlateItems 
}) => {
  const handleProductToggle = (productId: number) => {
    const newSelection = selectedProducts.includes(productId)
      ? selectedProducts.filter((id: number) => id !== productId)
      : [...selectedProducts, productId]
    onSelectedProductsChange(newSelection)
  }

  const handleAdd = () => {
    const newProducts = foods
      .filter((f) => selectedProducts.includes(f.id) && !cookPlateItems.some((i) => i.id === f.id))
      .map((f) => ({ 
        ...f, 
        type: f.type as FoodItemProps['type'],
        imgUrl: f.imgUrl || "",
        callory: f.callory || 0,
        proteins: f.proteins || 0,
        fats: f.fats || 0,
        carbs: f.carbs || 0
      }))
    onAdd(newProducts)
    onSelectedProductsChange([])
    onClose()
  }

  const isProductInFridge = (productId: number) => {
    return cookPlateItems.some((item) => item.id === productId)
  }

  const round = (v: number) => Math.round(v * 10) / 10

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Выберите продукты"
      size="md"
      gradientBackground="purple"
      animation="slide-up"
      contentClassName="max-h-[80vh] flex flex-col"
    >
      {/* Products list */}
      <div className="flex-1 overflow-y-auto mb-6 space-y-3 max-h-96">
        {foods.map((food) => {
          const isSelected = selectedProducts.includes(food.id)
          const isInFridge = isProductInFridge(food.id)
          
          return (
            <div
              key={food.id}
              className={`relative p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                isInFridge 
                  ? "border-gray-300 bg-gray-50 dark:bg-gray-700/50 dark:border-gray-600 opacity-60 cursor-not-allowed"
                  : isSelected
                    ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500 shadow-md"
                    : "border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 bg-white dark:bg-gray-700/30 hover:shadow-sm"
              }`}
              onClick={() => !isInFridge && handleProductToggle(food.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {/* Product name and nutritional information on same line */}
                  <div className="flex items-center gap-4 flex-wrap">
                    <h3 className={`text-lg font-semibold ${
                      isInFridge 
                        ? "text-gray-400 dark:text-gray-500" 
                        : "text-gray-800 dark:text-white"
                    }`}>
                      {food.name}
                    </h3>
                    
                    {isInFridge && (
                      <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 rounded-full">
                        Уже добавлен
                      </span>
                    )}
                    
                    {/* Nutritional information - compact inline layout */}
                    <div className="flex items-center gap-1 md:gap-2">
                      {/* Calories */}
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Калории:
                        </span>
                        <span className={`text-xs font-bold ${
                          isInFridge
                            ? "text-gray-500 dark:text-gray-400"
                            : "text-gray-800 dark:text-gray-200"
                        }`}>
                          {round(food.callory || 0)}
                        </span>
                      </div>
                      
                      {/* Proteins */}
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Белки:
                        </span>
                        <span className={`text-xs font-bold ${
                          isInFridge
                            ? "text-gray-500 dark:text-gray-400"
                            : "text-gray-800 dark:text-gray-200"
                        }`}>
                          {round(food.proteins || 0)}г.
                        </span>
                      </div>
                      
                      {/* Fats */}
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Жиры:
                        </span>
                        <span className={`text-xs font-bold ${
                          isInFridge
                            ? "text-gray-500 dark:text-gray-400"
                            : "text-gray-800 dark:text-gray-200"
                        }`}>
                          {round(food.fats || 0)}г.
                        </span>
                      </div>
                      
                      {/* Carbs */}
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Углеводы:
                        </span>
                        <span className={`text-xs font-bold ${
                          isInFridge
                            ? "text-gray-500 dark:text-gray-400"
                            : "text-gray-800 dark:text-gray-200"
                        }`}>
                          {round(food.carbs || 0)}г.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Checkbox */}
                <div className="ml-4">
                  <input
                    type="checkbox"
                    className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
                      isInFridge
                        ? "opacity-50 cursor-not-allowed"
                        : "accent-blue-500 focus:ring-2 focus:ring-blue-400/20"
                    }`}
                    checked={isSelected}
                    onChange={() => !isInFridge && handleProductToggle(food.id)}
                    disabled={isInFridge}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
        <Button
          type="button"
          onClick={onClose}
          className="flex-1 py-3 px-6 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium transition-all duration-200 hover:shadow-md"
        >
          Отмена
        </Button>
        <Button
          onClick={handleAdd}
          disabled={selectedProducts.length === 0}
          className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-400 disabled:to-gray-500"
        >
          {selectedProducts.length === 0 
            ? "Выберите продукты" 
            : `Добавить (${selectedProducts.length})`
          }
        </Button>
      </div>
    </Modal>
  )
}

export default ProductSelectionModal