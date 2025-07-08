import React from "react"
import { useAppStore } from "@/src/store/appStore"
import { FoodItemProps } from "@/src/api/types/foods"
import type { parseRecipes } from "@/src/handlers/parseRecipes"
import { motion, AnimatePresence } from "framer-motion"

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
  const { cookPlateItems, aiResult, aiLoading, aiError, parsedRecipes } = useAppStore() as {
    cookPlateItems: FoodItemProps[]
    aiResult: string
    aiLoading: boolean
    aiError: string
    parsedRecipes: ReturnType<typeof parseRecipes>
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
        <div className="mt-8 text-2xl font-bold text-center mb-4">{title}</div>
      )}
      {/* Список рецептов только с названием и кнопкой */}
      {!aiLoading && recipes.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          {recipes.map((r: ReturnType<typeof parseRecipes>[0], i: number) => {
            const name = r.name || 'Без названия';
            return (
              <div key={i} className="flex items-center bg-white/80 dark:bg-slate-800/80 rounded-lg px-2 py-2 shadow text-base">
                <button
                  className="mr-4 px-3 py-1 rounded-lg bg-gradient-to-r from-green-400 to-green-600 shadow text-white font-semibold hover:from-green-500 hover:to-green-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300"
                  onClick={() => setModal({ open: true, content: r.full })}
                >
                  Подробнее
                </button>
                <span className="truncate font-semibold">{name}</span>
              </div>
            )
          })}
        </div>
      )}
      {/* Модальное окно */}
      {modal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-xl relative flex flex-col overflow-y-auto max-h-[80vh]">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gradient-to-r from-gray-200 to-gray-400 rounded-full w-8 h-8 flex items-center justify-center shadow"
              onClick={() => setModal({ open: false, content: "" })}
            >
              ×
            </button>
            <div className="whitespace-pre-line text-base min-h-12 flex items-center justify-center">
              {modal.content}
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
