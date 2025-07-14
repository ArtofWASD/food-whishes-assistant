import React from "react"
import { useAppStore } from "@/src/store/appStore"
import { FoodItemProps } from "@/src/api/types/foods"
import type { parseRecipes } from "@/src/handlers/parseRecipes"
import { motion, AnimatePresence } from "framer-motion"
import { XMarkIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

const loadingMessages = [
  "Ищем рецепты...",
  "Генерируем вкусные идеи...",
  "Собираем ингредиенты...",
  "Пробуем разные комбинации...",
  "Проверяем лучшие варианты...",
  "Почти готово!",
  "Добавляем щепотку вдохновения..."
]

const OutputResults: React.FC = () => { 
  const { cookPlateItems, aiResult, aiLoading, aiError, parsedRecipes, resetRecipes, favoriteRecipes, addFavoriteRecipe, removeFavoriteRecipe } = useAppStore() as {
    cookPlateItems: FoodItemProps[]
    aiResult: string
    aiLoading: boolean
    aiError: string
    parsedRecipes: ReturnType<typeof parseRecipes>
    resetRecipes: () => void
    favoriteRecipes: ReturnType<typeof parseRecipes>
    addFavoriteRecipe: (recipe: ReturnType<typeof parseRecipes>[0]) => void
    removeFavoriteRecipe: (recipe: ReturnType<typeof parseRecipes>[0]) => void
  }
  const [modal, setModal] = React.useState<{ open: boolean, content: string }>({ open: false, content: "" })
  const [loadingIdx, setLoadingIdx] = React.useState(0)
  const loadingTimer = React.useRef<NodeJS.Timeout | null>(null)
  const loadingStart = React.useRef<number | null>(null)

  React.useEffect(() => {
    if (aiLoading) {
      loadingStart.current = Date.now()
      setLoadingIdx(0)
      if (loadingTimer.current) clearInterval(loadingTimer.current)
      loadingTimer.current = setInterval(() => {
        if (loadingStart.current && Date.now() - loadingStart.current > 3000) {
          setLoadingIdx(idx => (idx + 1) % loadingMessages.length)
        }
      }, 3000)
    } else {
      setLoadingIdx(0)
      if (loadingTimer.current) clearInterval(loadingTimer.current)
    }
    return () => {
      if (loadingTimer.current) clearInterval(loadingTimer.current)
    }
  }, [aiLoading])

  React.useEffect(() => {
    if (cookPlateItems.length === 0) {
      setModal({ open: false, content: "" })
      return
    }
  }, [cookPlateItems.length])

  const recipes = parsedRecipes
  const title = recipes.length > 0 ? recipes[0].name : null

  return (
    <div className="p-4 rounded-lg bg-[var(--pastel-green)] bg-opacity-35 min-h-72 dark:bg-[var(--pastel-blue)] dark:text-white overflow-y-auto relative">
      {/* Лоадер теперь в основном компоненте */}
      {aiLoading && (
        <div className="flex flex-col items-center justify-center gap-2 mt-8">
          <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-2"></div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={loadingIdx}
              className="font-semibold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {loadingMessages[loadingIdx]}
            </motion.span>
          </AnimatePresence>
        </div>
      )}
      {aiError && <div className="text-red-600 mt-4">{aiError}</div>}
      {/* Заголовок ответа */}
      {!aiLoading && title && (
        <div className="mt-2 text-2xl font-bold text-center mb-2">Список рецептов</div>
      )}
      {/* Список рецептов только с названием и кнопкой */}
      {!aiLoading && recipes.length > 0 && (
        <>
          <div className="mt-4 flex flex-col gap-2">
            {recipes.map((r: ReturnType<typeof parseRecipes>[0], i: number) => {
              const name = r.name || 'Без названия';
              return (
                <div key={i} className="flex items-center justify-between bg-white/80 dark:bg-slate-800/80 rounded-lg px-2 py-2 shadow text-base">
                  <span className="truncate font-semibold text-sm md:text-base">{name}</span>
                  <div className="flex items-center gap-2">
                    <button
                      className="focus:outline-none"
                      aria-label={favoriteRecipes.some(f => f.full === r.full) ? 'Удалить из избранного' : 'Добавить в избранное'}
                      onClick={() => {
                        if (favoriteRecipes.some(f => f.full === r.full)) {
                          removeFavoriteRecipe(r)
                        } else {
                          addFavoriteRecipe(r)
                        }
                      }}
                    >
                      <Image
                        src={favoriteRecipes.some(f => f.full === r.full) ? '/favorite.png' : '/favorite-gray.png'}
                        alt="Избранное"
                        width={28}
                        height={28}
                        className="transition-transform duration-150 hover:scale-110"
                      />
                    </button>
                    {/* Мобильная версия: иконка-лупа, десктоп: кнопка */}
                    <button
                      className="ml-2 rounded-lg bg-transparent shadow-none text-white font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 block md:hidden"
                      aria-label="Подробнее"
                      onClick={() => setModal({ open: true, content: r.full })}
                    >
                      <Image src="/loupe.png" alt="Подробнее" width={24} height={24} />
                    </button>
                    <button
                      className="ml-2 px-3 py-1 rounded-lg bg-gradient-to-r from-green-400 to-green-600 shadow text-white font-semibold hover:from-green-500 hover:to-green-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 hidden md:block"
                      onClick={() => setModal({ open: true, content: r.full })}
                    >
                      Подробнее
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          <button
            className="mt-6 mx-auto block px-6 py-2 rounded-lg bg-gradient-to-r from-red-400 to-red-600 shadow text-white font-semibold hover:from-red-500 hover:to-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
            onClick={resetRecipes}
          >
            Удалить всё
          </button>
        </>
      )}
      {/* Модальное окно */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Полупрозрачный фон */}
          <div className="fixed inset-0 bg-black/40" onClick={() => setModal({ open: false, content: "" })} />
          {/* Модальное окно */}
          <div className="bg-white dark:bg-gray-900 px-4 py-6 w-full max-w-xl relative flex flex-col overflow-y-auto max-h-[80vh] z-10 animate-fade-in-up">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white z-10"
              onClick={() => setModal({ open: false, content: "" })}
              aria-label="Закрыть"
            >
              <XMarkIcon className="w-7 h-7" />
            </button>
            <div className="whitespace-pre-line text-base min-h-12 flex items-center justify-center py-6">
              {modal.content.replace(/===([A-ZА-ЯЁ\s]+?)===/g, (_match, p1) => `${p1.trim().charAt(0).toUpperCase() + p1.trim().slice(1).toLowerCase()}:`)}
            </div>
          </div>
        </div>
      )}
      {!aiResult && !aiLoading && !aiError && (
        <div className="mt-8 text-gray-500 text-center">Нажмите кнопку, чтобы получить рецепт на основе выбранных продуктов.</div>
      )}
    </div>
  )
}

export default OutputResults
