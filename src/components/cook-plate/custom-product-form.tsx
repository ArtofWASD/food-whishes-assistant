import React from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "@/src/ui/button"
import { IconButton } from "@/src/ui/icon-button"
import { XMarkIcon } from '@heroicons/react/24/solid'
import { CustomProductFormValues, CustomProductFormProps, FoodType } from "@/src/types"

const schema = yup.object({
  name: yup.string().required("Название обязательно"),
  callory: yup.number().typeError("Введите число").min(0, "Не может быть меньше 0").required("Обязательно"),
  proteins: yup.number().typeError("Введите число").min(0, "Не может быть меньше 0").required("Обязательно"),
  fats: yup.number().typeError("Введите число").min(0, "Не может быть меньше 0").required("Обязательно"),
  carbs: yup.number().typeError("Введите число").min(0, "Не может быть меньше 0").required("Обязательно"),
  type: yup.mixed<FoodType>().oneOf(['meat', 'milk', 'vegetable', 'grain', 'fruit']).required('Тип обязателен'),
})

const CustomProductForm: React.FC<CustomProductFormProps> = ({ onAdd, onCancel, style }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CustomProductFormValues>({
    resolver: yupResolver(schema),
    defaultValues: { name: "", callory: 0, proteins: 0, fats: 0, carbs: 0, type: undefined },
    mode: "onChange",
  })

  // Автофокус на первом поле
  const nameRef = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    nameRef.current?.focus()
  }, [])

  const onSubmit = (data: CustomProductFormValues) => {
    onAdd({ ...data, id: Date.now(), imgUrl: "" })
    reset()
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Красивый фон с градиентом */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-orange-50 to-red-50 dark:from-yellow-900/30 dark:via-orange-900/20 dark:to-red-900/10 rounded-2xl blur-sm"></div>
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-6 md:p-8 space-y-6"
        autoComplete="off"
        style={style}
      >
        {/* Заголовок формы */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            🥗 Добавить продукт
          </h3>
          <IconButton
            type="button"
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-1"
            onClick={onCancel}
            aria-label="Закрыть форму"
          >
            <XMarkIcon className="w-6 h-6" />
          </IconButton>
        </div>

        {/* Поле названия */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Название продукта
          </label>
          <input
            type="text"
            placeholder="Введите название продукта..."
            {...register("name")}
            ref={e => {
              register("name").ref(e)
              nameRef.current = e
            }}
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 outline-none text-gray-800 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500 ${
              errors.name ? "border-red-400 bg-red-50 dark:bg-red-900/20" : "border-gray-200 dark:border-gray-600 hover:border-yellow-300 dark:hover:border-yellow-500"
            }`}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <span>⚠️</span>
              <span>{errors.name.message}</span>
            </div>
          )}
        </div>

        {/* Поле типа продукта */}
        <div className="space-y-2">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Тип продукта
          </label>
          <select
            id="type"
            {...register("type")}
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 outline-none text-gray-800 dark:text-white bg-white dark:bg-gray-700 ${
              errors.type ? "border-red-400 bg-red-50 dark:bg-red-900/20" : "border-gray-200 dark:border-gray-600 hover:border-yellow-300 dark:hover:border-yellow-500"
            }`}
            aria-invalid={!!errors.type}
          >
            <option value="">Выберите категорию...</option>
            <option value="meat">🥩 Мясо</option>
            <option value="milk">🥛 Молочные продукты</option>
            <option value="vegetable">🥕 Овощи</option>
            <option value="grain">🌾 Злаки и крупы</option>
            <option value="fruit">🍎 Фрукты и ягоды</option>
          </select>
          {errors.type && (
            <div className="flex items-center gap-1 text-red-500 text-sm">
              <span>⚠️</span>
              <span>{errors.type.message}</span>
            </div>
          )}
        </div>

        {/* Пищевая ценность */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
            Пищевая ценность (на 100г)
          </h4>
          
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-2">
            {/* Калории */}
            <div className="flex items-center gap-1">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                Ккал:
              </label>
              <input
                type="number"
                placeholder="0"
                {...register("callory")}
                className={`w-16 px-2 py-1.5 rounded-lg border-2 text-center text-sm font-semibold transition-all duration-200 focus:ring-2 focus:ring-yellow-400/20 focus:border-yellow-400 outline-none text-gray-800 dark:text-white bg-white dark:bg-gray-700 ${
                  errors.callory ? "border-red-400 bg-red-50 dark:bg-red-900/20" : "border-gray-200 dark:border-gray-600 hover:border-yellow-300 dark:hover:border-yellow-500"
                }`}
                aria-invalid={!!errors.callory}
                min={0}
              />
            </div>
            
            {/* Белки */}
            <div className="flex items-center gap-1">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                Белки:
              </label>
              <input
                type="number"
                placeholder="0"
                {...register("proteins")}
                className={`w-16 px-2 py-1.5 rounded-lg border-2 text-center text-sm font-semibold transition-all duration-200 focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400 outline-none text-gray-800 dark:text-white bg-white dark:bg-gray-700 ${
                  errors.proteins ? "border-red-400 bg-red-50 dark:bg-red-900/20" : "border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"
                }`}
                aria-invalid={!!errors.proteins}
                min={0}
              />
            </div>
            
            {/* Жиры */}
            <div className="flex items-center gap-1">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                Жиры:
              </label>
              <input
                type="number"
                placeholder="0"
                {...register("fats")}
                className={`w-16 px-2 py-1.5 rounded-lg border-2 text-center text-sm font-semibold transition-all duration-200 focus:ring-2 focus:ring-green-400/20 focus:border-green-400 outline-none text-gray-800 dark:text-white bg-white dark:bg-gray-700 ${
                  errors.fats ? "border-red-400 bg-red-50 dark:bg-red-900/20" : "border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500"
                }`}
                aria-invalid={!!errors.fats}
                min={0}
              />
            </div>
            
            {/* Углеводы */}
            <div className="flex items-center gap-1">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                Углеводы:
              </label>
              <input
                type="number"
                placeholder="0"
                {...register("carbs")}
                className={`w-16 px-2 py-1.5 rounded-lg border-2 text-center text-sm font-semibold transition-all duration-200 focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400 outline-none text-gray-800 dark:text-white bg-white dark:bg-gray-700 ${
                  errors.carbs ? "border-red-400 bg-red-50 dark:bg-red-900/20" : "border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-500"
                }`}
                aria-invalid={!!errors.carbs}
                min={0}
              />
            </div>
          </div>
          
          {/* Ошибки для пищевой ценности */}
          <div className="space-y-1">
            {errors.callory && (
              <div className="flex items-center gap-1 text-red-500 text-sm">
                <span>⚠️</span>
                <span>Калории: {errors.callory.message}</span>
              </div>
            )}
            {errors.proteins && (
              <div className="flex items-center gap-1 text-red-500 text-sm">
                <span>⚠️</span>
                <span>Белки: {errors.proteins.message}</span>
              </div>
            )}
            {errors.fats && (
              <div className="flex items-center gap-1 text-red-500 text-sm">
                <span>⚠️</span>
                <span>Жиры: {errors.fats.message}</span>
              </div>
            )}
            {errors.carbs && (
              <div className="flex items-center gap-1 text-red-500 text-sm">
                <span>⚠️</span>
                <span>Углеводы: {errors.carbs.message}</span>
              </div>
            )}
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 px-6 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium transition-all duration-200 hover:shadow-md"
          >
            ❌ Отмена
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "⏳ Добавляю..." : "✅ Добавить продукт"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CustomProductForm 