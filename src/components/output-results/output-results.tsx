import React, { useState } from "react"
import { useAppStore } from "@/src/store/appStore"

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
const OPENROUTER_MODEL = "mistralai/mixtral-8x7b-instruct"
const OPENROUTER_TOKEN = "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"

// Парсинг ответа нейросети на массив рецептов
function parseRecipes(text: string): { line: string, full: string }[] {
  // Разделяем по спецсимволу ===РЕЦЕПТ===
  const parts = text.split(/===РЕЦЕПТ===/).map(s => s.trim()).filter(Boolean)
  if (parts.length > 1) {
    return parts.map(part => {
      const oneLine = part.replace(/\s*\n\s*/g, ' ').replace(/\s+/g, ' ').trim()
      return {
        line: oneLine,
        full: part.trim()
      }
    })
  }
  // Fallback: старое деление
  const fallback = text.split(/(?:\n\s*\n|Рецепт\s*\d*\:)/).map(s => s.trim()).filter(Boolean)
  return fallback.map(part => {
    const oneLine = part.replace(/\s*\n\s*/g, ' ').replace(/\s+/g, ' ').trim()
    return {
      line: oneLine,
      full: part.trim()
    }
  })
}

const OutputResults = () => {
  const { cookPlateItems } = useAppStore()
  const [aiResult, setAiResult] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [modal, setModal] = useState<{ open: boolean, content: string }>({ open: false, content: "" })

  // Промпт на русском
  const prompt = `Предложи несколько простых рецептов из этих продуктов: ${cookPlateItems.map(i => i.name).join(", ")}. Каждый рецепт отделяй строкой ===РЕЦЕПТ===. В каждом рецепте укажи название, краткое описание, БЖУ, ингредиенты и пошаговую инструкцию на русском языке.`

  const handleGetAIRecipe = async () => {
    setLoading(true)
    setError("")
    setAiResult("")
    try {
      const response = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENROUTER_TOKEN}`
        },
        body: JSON.stringify({
          model: OPENROUTER_MODEL,
          messages: [
            { role: "user", content: prompt }
          ]
        })
      })
      if (!response.ok) throw new Error("Ошибка OpenRouter API")
      const data = await response.json()
      const text = data.choices?.[0]?.message?.content || JSON.stringify(data)
      console.log('AI raw result:', text)
      setAiResult(text)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Ошибка запроса к нейросети")
    } finally {
      setLoading(false)
    }
  }

  // Парсим рецепты
  const recipes = aiResult ? parseRecipes(aiResult) : []

  return (
    <div className="p-4 rounded-lg bg-[var(--pastel-green)] bg-opacity-35 min-h-72 dark:bg-[var(--pastel-blue)] dark:text-white overflow-y-auto relative">
      <button
        className="absolute top-2 right-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 shadow-md text-white font-semibold hover:from-blue-500 hover:to-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        onClick={handleGetAIRecipe}
        disabled={loading || cookPlateItems.length === 0}
      >
        {loading ? "Генерация..." : "Получить рецепт от Mixtral (OpenRouter)"}
      </button>
      {error && <div className="text-red-600 mt-4">{error}</div>}
      {/* Список рецептов одной строкой */}
      {recipes.length > 0 && (
        <div className="mt-8 flex flex-col gap-2">
          {recipes.map((r, i) => (
            <div key={i} className="flex items-center bg-white/80 dark:bg-slate-800/80 rounded-lg px-2 py-2 shadow text-base">
              <button
                className="mr-4 px-3 py-1 rounded-lg bg-gradient-to-r from-green-400 to-green-600 shadow text-white font-semibold hover:from-green-500 hover:to-green-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300"
                onClick={() => setModal({ open: true, content: r.full })}
              >
                Подробнее
              </button>
              <span className="truncate">{r.line}</span>
            </div>
          ))}
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
            <div className="whitespace-pre-line text-base">
              {modal.content}
            </div>
          </div>
        </div>
      )}
      {!aiResult && !loading && !error && (
        <div className="mt-8 text-gray-500 text-center">Нажмите кнопку, чтобы получить рецепт на основе выбранных продуктов.</div>
      )}
    </div>
  )
}

export default OutputResults
