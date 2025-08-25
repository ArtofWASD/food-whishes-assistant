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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Полупрозрачный фон */}
          <div className="fixed inset-0 bg-black/40" onClick={() => setModal({ open: false, content: null })} />
          {/* Модальное окно */}
          <div className="bg-white dark:bg-gray-900 px-4 py-6 w-full max-w-xl relative flex flex-col overflow-y-auto max-h-[80vh] z-10 animate-fade-in-up">
            <IconButton
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white z-10"
              onClick={() => setModal({ open: false, content: null })}
              aria-label="Закрыть"
            >
              <XMarkIcon className="w-7 h-7" />
            </IconButton>
            {/* Изменено: структурированный вывод рецепта */}
            <div className="text-base min-h-12 py-2">
              {/* Название рецепта */}
              {modal.content.name && (
                <h2 className="text-2xl font-bold mb-4 text-center">{modal.content.name}</h2>
              )}

              {/* Описание */}
              {modal.content.description && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-1">Описание:</h3>
                  <p className="whitespace-pre-line">{modal.content.description}</p>
                </div>
              )}

              {/* БЖУ */}
              {modal.content.bju && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-1">Пищевая ценность (на порцию):</h3>
                  <p className="whitespace-pre-line">{modal.content.bju}</p>
                </div>
              )}

              {/* Ингредиенты */}
              {modal.content.ingredients && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-1">Ингредиенты:</h3>
                  <ul className="list-disc pl-5 whitespace-pre-line">
                    {modal.content.ingredients.split('\n').filter((line: string) => line.trim() !== '').map((ingredient: string, idx: number) => (
                      <li key={idx} className="mb-1">{ingredient.trim()}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Инструкция */}
              {modal.content.instruction && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-1">Инструкция по приготовлению:</h3>
                  <ol className="list-decimal pl-5 whitespace-pre-line">
                    {modal.content.instruction.split('\n').filter((line: string) => line.trim() !== '').map((step: string, idx: number) => (
                      <li key={idx} className="mb-2">{step.trim()}</li>
                    ))}
                  </ol>
                </div>
              )}
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