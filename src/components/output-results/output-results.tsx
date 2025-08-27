import React from "react"
import { useAppStore } from "@/src/store/appStore"
import { FoodItemProps, ParsedRecipe, ParsedRecipes, ModalState } from "@/src/types"
import { motion, AnimatePresence } from "framer-motion"
import { XMarkIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { IconButton } from "@/src/ui/icon-button"
import { Button } from "@/src/ui/button"

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
    parsedRecipes: ParsedRecipes
    resetRecipes: () => void
    favoriteRecipes: ParsedRecipes
    addFavoriteRecipe: (recipe: ParsedRecipe) => void
    removeFavoriteRecipe: (recipe: ParsedRecipe) => void
  }
  // Изменено: content теперь объект ParsedRecipe, а не строка
  const [modal, setModal] = React.useState<ModalState<ParsedRecipe>>({ open: false, content: null })
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
      setModal({ open: false, content: null })
      return
    }
  }, [cookPlateItems.length])

  const recipes = parsedRecipes
  const title = recipes.length > 0 ? recipes[0].name : null

  return (
    <div className="bg-[var(--pastel-green)] bg-opacity-35 min-h-72 dark:bg-[var(--pastel-blue)] dark:text-white overflow-y-auto relative">
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
          <div className="mt-4 flex flex-col gap-2 px-2 md:px-4">
            {recipes.map((r: ParsedRecipe, i: number) => {
              const name = r.name || 'Без названия';
              return (
                <div key={i} className="flex items-center justify-between bg-white/80 dark:bg-slate-800/80 rounded-lg px-2 py-2 shadow text-base">
                  <span className="truncate font-semibold text-sm md:text-base">
                    <span className="block md:hidden">
                      {name.length > 25 ? name.slice(0, 25) + '…' : name}
                    </span>
                    <span className="hidden md:block">{name}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <IconButton
                      className="focus:outline-none"
                      aria-label={favoriteRecipes.some((f: ParsedRecipe) => f.full === r.full) ? 'Удалить из избранного' : 'Добавить в избранное'}
                      onClick={() => {
                        if (favoriteRecipes.some((f: ParsedRecipe) => f.full === r.full)) {
                          removeFavoriteRecipe(r)
                        } else {
                          addFavoriteRecipe(r)
                        }
                      }}
                    >
                      <Image
                        src={favoriteRecipes.some((f: ParsedRecipe) => f.full === r.full) ? '/favorite.png' : '/favorite-gray.png'}
                        alt="Избранное"
                        width={28}
                        height={28}
                        className="transition-transform duration-150 hover:scale-110"
                      />
                    </IconButton>
                    {/* Мобильная версия: иконка-лупа, десктоп: кнопка */}
                    <IconButton
                      className="ml-2 rounded-lg bg-transparent shadow-none text-white font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 block md:hidden"
                      aria-label="Подробнее"
                      onClick={() => setModal({ open: true, content: r })} // Передаем объект рецепта
                    >
                      <Image src="/loupe.png" alt="Подробнее" width={24} height={24} />
                    </IconButton>
                    <Button
                      className="ml-2 px-3 py-1 rounded-lg bg-[#08A045]/90 text-white hover:bg-[#08A045]/100 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 hidden md:block"
                      onClick={() => setModal({ open: true, content: r })} // Передаем объект рецепта
                    >
                      Подробнее
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
          <Button
            className="mt-6 mx-auto block px-6 py-2 rounded-lg bg-[#EF3E36]/90 text-white hover:bg-[#EF3E36]/100 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
            onClick={resetRecipes}
          >
            Удалить всё
          </Button>
        </>
      )}
      {/* Модальное окно */}
      {modal.open && modal.content && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Полупрозрачный фон */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setModal({ open: false, content: null })} />
          
          {/* Модальное окно в стиле custom-product-form */}
          <div className="relative w-full max-w-3xl mx-auto max-h-[85vh] overflow-y-auto">
            {/* Красивый фон с градиентом */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-50 dark:from-blue-900/30 dark:via-indigo-900/20 dark:to-purple-900/10 rounded-2xl blur-sm"></div>
            
            <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-6 md:p-8 space-y-6">
              {/* Заголовок модального окна */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                  🍽️ {modal.content.name || 'Рецепт'}
                </h2>
                <IconButton
                  type="button"
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-1"
                  onClick={() => setModal({ open: false, content: null })}
                  aria-label="Закрыть модальное окно"
                >
                  <XMarkIcon className="w-6 h-6" />
                </IconButton>
              </div>

              {/* Контент рецепта */}
              <div className="space-y-6">
                {/* Описание */}
                {modal.content.description && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">📋 Описание</h3>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">{modal.content.description}</p>
                    </div>
                  </div>
                )}

                {/* БЖУ */}
                {modal.content.bju && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">⚖️ Пищевая ценность (на порцию)</h3>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-700">
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed font-medium">{modal.content.bju}</p>
                    </div>
                  </div>
                )}

                {/* Ингредиенты */}
                {modal.content.ingredients && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">🥘 Ингредиенты</h3>
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-700">
                      <ul className="space-y-2">
                        {modal.content.ingredients.split('\n').filter((line: string) => line.trim() !== '').map((ingredient: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                            <span className="text-orange-500 font-bold mt-1">•</span>
                            <span className="leading-relaxed">{ingredient.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Инструкция */}
                {modal.content.instruction && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">👨‍🍳 Инструкция по приготовлению</h3>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                      <ol className="space-y-3">
                        {modal.content.instruction.split('\n').filter((line: string) => line.trim() !== '').map((step: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <span className="bg-blue-500 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{step.trim()}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                )}
              </div>

              {/* Кнопки действий */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="button"
                  onClick={() => setModal({ open: false, content: null })}
                  className="flex-1 py-3 px-6 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium transition-all duration-200 hover:shadow-md"
                >
                  ❌ Закрыть
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    if (favoriteRecipes.some((f: ParsedRecipe) => f.full === modal.content?.full)) {
                      removeFavoriteRecipe(modal.content!)
                    } else {
                      addFavoriteRecipe(modal.content!)
                    }
                  }}
                  className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:shadow-lg ${
                    favoriteRecipes.some((f: ParsedRecipe) => f.full === modal.content?.full)
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white'
                      : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white'
                  }`}
                >
                  {favoriteRecipes.some((f: ParsedRecipe) => f.full === modal.content?.full)
                    ? '💔 Удалить из избранного'
                    : '⭐ Добавить в избранное'
                  }
                </Button>
              </div>
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