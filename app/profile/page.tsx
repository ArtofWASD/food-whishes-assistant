"use client"
import Image from "next/image"
import { useAppStore } from "@/src/store/appStore"
import { useState } from "react"
import { IconButton } from "@/src/ui/icon-button"
import { Button } from "@/src/ui/button"
import Modal from "@/src/ui/modal"
import { ParsedRecipe, ModalState } from "@/src/types"

export default function ProfilePage() {
  const { favoriteRecipes, removeFavoriteRecipe, favoriteProducts, removeFavoriteProduct } = useAppStore()
  const [tab, setTab] = useState<'profile' | 'favorites' | 'products'>('profile')
  const [modal, setModal] = useState<ModalState<ParsedRecipe>>({ open: false, content: null })
  const userMock = {
    name: "Иван Иванов",
    email: "ivan.ivanov@example.com",
    registered: "2023-01-15",
    status: "Премиум",
    city: "Москва",
    phone: "+7 999 123-45-67"
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Image 
              src="/avatar.png" 
              alt="Аватар" 
              width={80} 
              height={80} 
              className="rounded-full border-4 border-blue-500 shadow-lg" 
            />
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Привет, {userMock.name.split(' ')[0]}!
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Добро пожаловать в ваш профиль
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                  {userMock.status}
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                  Активный пользователь
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Unified Tab Container */}
        <div className="bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
          {/* Tab Headers */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex">
              <Button
                className={`flex-1 py-4 px-6 font-semibold text-center transition-all duration-200 ${
                  tab === 'profile' 
                    ? 'border-t-2 border-l-2 border-r-2 border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-b-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
                onClick={() => setTab('profile')}
              >
                👤 Профиль
              </Button>
              <Button
                className={`flex-1 py-4 px-6 font-semibold text-center transition-all duration-200 ${
                  tab === 'favorites' 
                    ? 'border-t-2 border-l-2 border-r-2 border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-b-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
                onClick={() => setTab('favorites')}
              >
                ❤️ Избранное
              </Button>
              <Button
                className={`flex-1 py-4 px-6 font-semibold text-center transition-all duration-200 ${
                  tab === 'products' 
                    ? 'border-t-2 border-l-2 border-r-2 border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-b-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
                onClick={() => setTab('products')}
              >
                🥘 Продукты
              </Button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
          {tab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                📋 Личная информация
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Email</label>
                    <p className="text-gray-900 dark:text-gray-100 font-semibold">{userMock.email}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Город</label>
                    <p className="text-gray-900 dark:text-gray-100 font-semibold">{userMock.city}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Телефон</label>
                    <p className="text-gray-900 dark:text-gray-100 font-semibold">{userMock.phone}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Дата регистрации</label>
                    <p className="text-gray-900 dark:text-gray-100 font-semibold">{userMock.registered}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Статус аккаунта</label>
                    <p className="text-gray-900 dark:text-gray-100 font-semibold">{userMock.status}</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Статистика</h3>
                    <div className="space-y-1">
                      <p className="text-xs text-blue-600 dark:text-blue-300">Сохранённых рецептов: {favoriteRecipes.length}</p>
                      <p className="text-xs text-blue-600 dark:text-blue-300">Избранных продуктов: {favoriteProducts.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {tab === 'favorites' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                ❤️ Избранные рецепты
                <span className="text-sm bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded-full">
                  {favoriteRecipes.length}
                </span>
              </h2>
              {favoriteRecipes.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🍽️</div>
                  <p className="text-gray-500 dark:text-gray-400 text-lg">Нет избранных рецептов</p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Добавьте рецепты в избранное для быстрого доступа</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {favoriteRecipes.map((r, i) => (
                    <div key={i} className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-red-200 dark:border-red-700 hover:shadow-lg transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-2">
                            {r.name || 'Без названия'}
                          </h3>
                          {r.description && (
                            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                              {r.description.length > 100 ? r.description.slice(0, 100) + '...' : r.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-3 ml-4">
                          <IconButton
                            className="p-2 hover:bg-red-100 dark:hover:bg-red-800 rounded-lg transition-colors"
                            aria-label="Удалить из избранного"
                            onClick={() => removeFavoriteRecipe(r)}
                          >
                            <Image src="/favorite.png" alt="Удалить из избранного" width={24} height={24} />
                          </IconButton>
                          <Button
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                            onClick={() => setModal({ open: true, content: r })}
                          >
                            Подробнее
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {tab === 'products' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                🥘 Избранные продукты
                <span className="text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                  {favoriteProducts.length}
                </span>
              </h2>
              {favoriteProducts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🥕</div>
                  <p className="text-gray-500 dark:text-gray-400 text-lg">Нет избранных продуктов</p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Добавьте продукты в избранное для быстрого доступа</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoriteProducts.map((p) => (
                    <div key={p.id} className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-700 hover:shadow-lg transition-all duration-200">
                      <div className="flex items-center gap-3 mb-3">
                        <Image 
                          src={p.imgUrl} 
                          alt={p.name} 
                          width={48} 
                          height={48} 
                          className="rounded-full border-2 border-green-300 dark:border-green-600 shadow-sm" 
                        />
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base flex-1">
                          {p.name}
                        </h3>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-300 mb-3 space-y-1">
                        <div className="flex justify-between">
                          <span>Калории:</span>
                          <span className="font-medium">{p.callory} ккал</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Белки:</span>
                          <span className="font-medium">{p.proteins}г</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Жиры:</span>
                          <span className="font-medium">{p.fats}г</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Углеводы:</span>
                          <span className="font-medium">{p.carbs}г</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <IconButton
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-800 rounded-lg transition-colors"
                          aria-label="Удалить из избранного"
                          onClick={() => removeFavoriteProduct(p)}
                        >
                          <Image src="/favorite.png" alt="Удалить из избранного" width={20} height={20} />
                        </IconButton>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          </div>
        </div>
      </div>
      {/* Universal Modal for recipe details */}
      <Modal
        isOpen={modal.open}
        onClose={() => setModal({ open: false, content: null })}
        title={`🍽️ ${modal.content?.name || 'Рецепт'}`}
        size="lg"
        gradientBackground="blue"
        animation="slide-up"
      >
        {modal.content && (
          <div className="space-y-6">
            {/* Описание */}
            {modal.content.description && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">📋 Описание</h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                  <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line leading-relaxed">{modal.content.description}</p>
                </div>
              </div>
            )}

            {/* БЖУ */}
            {modal.content.bju && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">⚖️ Пищевая ценность (на порцию)</h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-700">
                  <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line leading-relaxed font-medium">{modal.content.bju}</p>
                </div>
              </div>
            )}

            {/* Ингредиенты */}
            {modal.content.ingredients && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">🥘 Ингредиенты</h3>
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-700">
                  <ul className="space-y-2">
                    {modal.content.ingredients.split('\n').filter((line: string) => line.trim() !== '').map((ingredient: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-200">
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
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">👨‍🍳 Инструкция по приготовлению</h3>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
                  <ol className="space-y-3">
                    {modal.content.instruction.split('\n').filter((line: string) => line.trim() !== '').map((step: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-200">
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
                  removeFavoriteRecipe(modal.content!)
                  setModal({ open: false, content: null })
                }}
                className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium transition-all duration-200 hover:shadow-lg"
              >
                💔 Удалить из избранного
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
} 