"use client"
import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] px-4 py-12">
      <div className="max-w-3xl w-full bg-white dark:bg-slate-800 shadow-lg p-8 rounded-2xl flex flex-col items-center gap-6 border border-blue-100 dark:border-slate-700">
        <Image src="/favicon.ico" alt="Food Wishes Assistant" width={64} height={64} className="mb-2" />
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 text-center">Food Wishes Assistant</h1>
        <p className="text-lg text-gray-700 dark:text-gray-200 text-center">
          Ваш персональный помощник в создании вкусных блюд из имеющихся продуктов
        </p>
        
        <div className="w-full max-w-lg space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">🧠 Умный подбор рецептов</h3>
            <p className="text-gray-600 dark:text-gray-300">Получайте персонализированные рецепты на основе продуктов, которые есть у вас дома</p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-500">
            <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">🥗 Контроль питания</h3>
            <p className="text-gray-600 dark:text-gray-300">Отслеживайте пищевую ценность и калорийность ваших блюд для здорового образа жизни</p>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border-l-4 border-purple-500">
            <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">⚡ Экономия времени</h3>
            <p className="text-gray-600 dark:text-gray-300">Больше не нужно думать "что приготовить?" — просто выберите продукты и получите готовые идеи</p>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border-l-4 border-orange-500">
            <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">💰 Сокращение отходов</h3>
            <p className="text-gray-600 dark:text-gray-300">Используйте все продукты эффективно и сократите количество выбрасываемой еды</p>
          </div>
          
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border-l-4 border-indigo-500">
            <h3 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">🎨 Удобный интерфейс</h3>
            <p className="text-gray-600 dark:text-gray-300">Интуитивно понятное управление с поддержкой тёмной темы для комфортного использования</p>
          </div>
        </div>
        
        <p className="text-center text-gray-500 dark:text-gray-400 mt-6 font-medium">Превратите готовку в удовольствие с Food Wishes Assistant!</p>
      </div>
    </main>
  )
} 