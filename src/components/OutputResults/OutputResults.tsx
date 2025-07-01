import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { mockRecipes } from "@/src/api/fake_foods/mock_recipes"

const OutputResults = () => {
  const [opened, setOpened] = useState<number | null>(null)
  return (
    <div className="p-4 rounded-lg bg-[var(--pastel-green)] bg-opacity-35 h-72 dark:bg-[var(--pastel-blue)] dark:text-white overflow-y-auto">
      <ul className="space-y-4">
        {mockRecipes.map(recipe => (
          <li key={recipe.id} className="flex items-center gap-4 bg-white bg-opacity-60 dark:bg-opacity-20 rounded-lg p-2">
            <img src={recipe.image} alt={recipe.title} className="w-16 h-16 object-cover rounded" />
            <div className="flex-1">
              <div className="font-bold text-lg">{recipe.title}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Время: {recipe.time}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Б: {recipe.protein}г, Ж: {recipe.fat}г, У: {recipe.carbs}г, {recipe.calories} ккал</div>
            </div>
            <button
              className="ml-2 px-3 py-1 rounded bg-blue-500 text-white text-xs hover:bg-blue-600 transition"
              onClick={() => setOpened(recipe.id)}
            >
              Открыть рецепт
            </button>
          </li>
        ))}
      </ul>
      <AnimatePresence>
        {opened && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            >
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white text-xl"
                onClick={() => setOpened(null)}
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-2">{mockRecipes.find(r => r.id === opened)?.title}</h2>
              <img src={mockRecipes.find(r => r.id === opened)?.image} alt="" className="w-full h-40 object-cover rounded mb-2" />
              <div className="mb-2">
                <span className="font-semibold">Ингредиенты:</span>
                <ul className="list-disc list-inside text-sm mt-1">
                  {mockRecipes.find(r => r.id === opened)?.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-semibold">Пошаговая инструкция:</span>
                <ol className="list-decimal list-inside text-sm mt-1">
                  {mockRecipes.find(r => r.id === opened)?.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default OutputResults
