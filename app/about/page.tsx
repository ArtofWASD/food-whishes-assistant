"use client"
import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] px-4 py-12">
      <div className="max-w-2xl w-full bg-white dark:bg-slate-800 shadow-lg p-8 rounded-2xl flex flex-col items-center gap-6 border border-blue-100 dark:border-slate-700">
        <Image src="/favicon.ico" alt="Food Wishes Assistant" width={64} height={64} className="mb-2" />
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 text-center">О проекте Food Wishes Assistant</h1>
        <p className="text-lg text-gray-700 dark:text-gray-200 text-center">
          Food Wishes Assistant — это современное веб-приложение для подбора и генерации блюд на основе выбранных пользователем продуктов из виртуального холодильника.
        </p>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-left w-full max-w-md">
          <li>Виртуальный холодильник: выбирайте продукты для создания блюд</li>
          <li>Автоматическая генерация рецептов</li>
          <li>Переключение светлой и тёмной темы</li>
          <li>Просмотр информации о продуктах и их пищевой ценности</li>
          <li>Современный адаптивный интерфейс</li>
        </ul>
        <div className="w-full max-w-md">
          <h2 className="text-xl font-semibold mt-4 mb-2">Технологии:</h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
            <li>Next.js (App Router)</li>
            <li>React</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>Framer Motion</li>
          </ul>
        </div>
        <p className="text-center text-gray-500 dark:text-gray-400 mt-4">Проект для быстрого и удобного подбора блюд по продуктам. Наслаждайтесь готовкой!</p>
      </div>
    </main>
  )
} 