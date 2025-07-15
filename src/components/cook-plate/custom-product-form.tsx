import React, { useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "@/src/ui/button"
import { IconButton } from "@/src/ui/icon-button"
import { XMarkIcon } from '@heroicons/react/24/solid'

const schema = yup.object({
  name: yup.string().required("Название обязательно"),
  callory: yup.number().typeError("Введите число").min(0, "Не может быть меньше 0").required("Обязательно"),
  proteins: yup.number().typeError("Введите число").min(0, "Не может быть меньше 0").required("Обязательно"),
  fats: yup.number().typeError("Введите число").min(0, "Не может быть меньше 0").required("Обязательно"),
  carbs: yup.number().typeError("Введите число").min(0, "Не может быть меньше 0").required("Обязательно"),
  type: yup.mixed<'meat' | 'milk' | 'vegetable' | 'grain' | 'fruit'>().oneOf(['meat', 'milk', 'vegetable', 'grain', 'fruit']).required('Тип обязателен'),
})

type FormValues = {
  name: string
  callory: number
  proteins: number
  fats: number
  carbs: number
  type: 'meat' | 'milk' | 'vegetable' | 'grain' | 'fruit'
}

type Props = {
  onAdd: (product: FormValues & { id: number; imgUrl: string }) => void
  onCancel: () => void
  showLabels?: boolean
  style?: React.CSSProperties
}

const CustomProductForm: React.FC<Props> = ({ onAdd, onCancel, showLabels, style }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { name: "", callory: 0, proteins: 0, fats: 0, carbs: 0, type: undefined },
    mode: "onChange",
  })

  // Автофокус на первом поле
  const nameRef = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    nameRef.current?.focus()
  }, [])

  const onSubmit = (data: FormValues) => {
    onAdd({ ...data, id: Date.now(), imgUrl: "" })
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 p-8 rounded-lg bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-800 w-full max-w-2xl relative h-full"
      autoComplete="off"
      style={style}
    >
      {/* Кнопка закрытия в правом верхнем углу */}
      <IconButton
        type="button"
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white z-10"
        onClick={onCancel}
        aria-label="Закрыть форму"
      >
        <XMarkIcon className="w-7 h-7" />
      </IconButton>
      <div className="flex flex-col w-full">
        <input
          type="text"
          placeholder="Название"
          {...register("name")}
          ref={e => {
            register("name").ref(e)
            nameRef.current = e
          }}
          className={`border rounded-md px-2 py-1 mt-4 text-sm focus:ring-2 focus:ring-yellow-400 outline-none ${errors.name ? "border-red-400" : "border-gray-300"}`}
          aria-invalid={!!errors.name}
        />
        {errors.name && <span className="text-xs text-red-500 mt-0.5" role="alert">{errors.name.message}</span>}
      </div>
      <div className="flex flex-col w-full mt-2">
        <label htmlFor="type" className="text-xs text-gray-600 dark:text-gray-300 mb-1">Тип продукта</label>
        <select
          id="type"
          {...register("type")}
          className={`border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-yellow-400 outline-none ${errors.type ? "border-red-400" : "border-gray-300"}`}
          aria-invalid={!!errors.type}
        >
          <option value="">Выберите тип</option>
          <option value="meat">Мясо</option>
          <option value="milk">Молоко/яйцо/сыр</option>
          <option value="vegetable">Овощи</option>
          <option value="grain">Злаки/крупы/макароны</option>
          <option value="fruit">Фрукты/ягоды</option>
        </select>
        {errors.type && <span className="text-xs text-red-500 mt-0.5" role="alert">{errors.type.message}</span>}
      </div>
      {showLabels && (
        <div className="flex gap-2 w-full justify-between text-xs text-gray-600 dark:text-gray-300 mb-1">
          
        </div>
      )}
      <div className="flex flex-wrap gap-2 justify-start md:justify-center w-full items-center">
      <span className="text-center">Ккал:</span>
        <input
          type="number"
          placeholder="Ккал"
          {...register("callory")}
          className={`border rounded-md px-2 py-1 text-sm w-10 text-center focus:ring-2 focus:ring-yellow-400 outline-none font-semibold ${errors.callory ? "border-red-400" : "border-gray-300"} max-[425px]:w-14 max-[425px]:text-xs max-[425px]:font-semibold`}
          aria-invalid={!!errors.callory}
          min={0}
        />
        <span className="text-center">Б:</span>
        <input
          type="number"
          placeholder="Б"
          {...register("proteins")}
          className={`border rounded-md px-2 py-1 text-sm w-10 text-center focus:ring-2 focus:ring-yellow-400 outline-none font-semibold ${errors.proteins ? "border-red-400" : "border-gray-300"} max-[425px]:w-12 max-[425px]:text-xs max-[425px]:font-semibold`}
          aria-invalid={!!errors.proteins}
          min={0}
        />
        <span className="ext-center">Ж:</span>
        <input
          type="number"
          placeholder="Ж"
          {...register("fats")}
          className={`border rounded-md px-2 py-1 text-sm w-10 text-center focus:ring-2 focus:ring-yellow-400 outline-none font-semibold ${errors.fats ? "border-red-400" : "border-gray-300"} max-[425px]:w-12 max-[425px]:text-xs max-[425px]:font-semibold`}
          aria-invalid={!!errors.fats}
          min={0}
        />
        <span className="text-center">У:</span>
        <input
          type="number"
          placeholder="У"
          {...register("carbs")}
          className={`border rounded-md px-2 py-1 text-sm w-10 text-center focus:ring-2 focus:ring-yellow-400 outline-none font-semibold ${errors.carbs ? "border-red-400" : "border-gray-300"} max-[425px]:w-12 max-[425px]:text-xs max-[425px]:font-semibold`}
          aria-invalid={!!errors.carbs}
          min={0}
        />
      </div>
      <div className="absolute right-4 bottom-4 flex flex-row-reverse gap-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-8 px-3 py-1 text-xs bg-green-400/90 text-gray-800 dark:text-white hover:bg-green-400/100 hover:shadow-lg"
        >
          Добавить
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          className="h-8 px-3 py-1 text-xs bg-gray-300/90 text-gray-800 dark:text-white hover:bg-gray-300/100 hover:shadow-lg"
        >
          Отмена
        </Button>
      </div>
      {/* Компактные ошибки для числовых полей */}
      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 w-full">
        {errors.callory && <span className="text-xs text-red-500" role="alert">Ккал: {errors.callory.message}</span>}
        {errors.proteins && <span className="text-xs text-red-500" role="alert">Б: {errors.proteins.message}</span>}
        {errors.fats && <span className="text-xs text-red-500" role="alert">Ж: {errors.fats.message}</span>}
        {errors.carbs && <span className="text-xs text-red-500" role="alert">У: {errors.carbs.message}</span>}
      </div>
    </form>
  )
}

export default CustomProductForm 