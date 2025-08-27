"use client"
import Image from "next/image"
import { useAppStore } from "@/src/store/appStore"
import { useState } from "react"
import { IconButton } from "@/src/ui/icon-button"
import { Button } from "@/src/ui/button"
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ParsedRecipe, ModalState } from "@/src/types"

export default function ProfilePage() {
  const { favoriteRecipes, removeFavoriteRecipe, favoriteProducts, removeFavoriteProduct, addFavoriteRecipe } = useAppStore()
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
    <div className="relative min-h-[20vh] py-4 flex flex-col items-center justify-center">
      {/* Аватар и имя — всегда на одной строке, выравнивание по нижней линии */}
      <div className="flex flex-row items-end gap-6 mt-24 mb-6 w-full max-w-xl px-4 justify-start">
        <Image src="/avatar.png" alt="Аватар" width={96} height={96} className="rounded-full border-2 border-blue-400" />
        <span className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white pb-1 align-bottom">Привет, {userMock.name.split(' ')[0]}</span>
      </div>
      {/* Вкладки */}
      <div className="flex flex-row gap-2 mb-6 w-full max-w-xl px-4">
        <Button
          className={`px-4 py-2 rounded-t-lg font-semibold border-b-2 transition-colors ${tab === 'profile' ? 'border-blue-500 text-blue-700 dark:text-blue-300 bg-white dark:bg-slate-800' : 'border-transparent text-gray-500 bg-gray-100 dark:bg-slate-700'}`}
          onClick={() => setTab('profile')}
        >Профиль</Button>
        <Button
          className={`px-4 py-2 rounded-t-lg font-semibold border-b-2 transition-colors ${tab === 'favorites' ? 'border-blue-500 text-blue-700 dark:text-blue-300 bg-white dark:bg-slate-800' : 'border-transparent text-gray-500 bg-gray-100 dark:bg-slate-700'}`}
          onClick={() => setTab('favorites')}
        >Избранное</Button>
        <Button
          className={`px-4 py-2 rounded-t-lg font-semibold border-b-2 transition-colors ${tab === 'products' ? 'border-blue-500 text-blue-700 dark:text-blue-300 bg-white dark:bg-slate-800' : 'border-transparent text-gray-500 bg-gray-100 dark:bg-slate-700'}`}
          onClick={() => setTab('products')}
        >Продукты</Button>
      </div>
      {/* Контент вкладки */}
      {tab === 'profile' && (
        <div className="w-full max-w-xl px-4 flex flex-col items-center">
          <div className="hidden md:flex flex-row items-center gap-4 mb-6 w-full">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{userMock.name}</span>
          </div>
          <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-xl shadow p-6 flex flex-col gap-2 border border-blue-100 dark:border-slate-700">
            <div className="flex flex-row justify-between"><span className="font-semibold text-gray-600 dark:text-gray-300">Email:</span><span>{userMock.email}</span></div>
            <div className="flex flex-row justify-between"><span className="font-semibold text-gray-600 dark:text-gray-300">Город:</span><span>{userMock.city}</span></div>
            <div className="flex flex-row justify-between"><span className="font-semibold text-gray-600 dark:text-gray-300">Телефон:</span><span>{userMock.phone}</span></div>
            <div className="flex flex-row justify-between"><span className="font-semibold text-gray-600 dark:text-gray-300">Дата регистрации:</span><span>{userMock.registered}</span></div>
            <div className="flex flex-row justify-between"><span className="font-semibold text-gray-600 dark:text-gray-300">Статус:</span><span>{userMock.status}</span></div>
          </div>
        </div>
      )}
      {tab === 'favorites' && (
        <div className="w-full max-w-xl px-4 flex flex-col gap-2">
          {favoriteRecipes.length === 0 && (
            <div className="text-gray-500 text-center py-8">Нет избранных рецептов</div>
          )}
          {favoriteRecipes.map((r, i) => (
            <div key={i} className="flex items-center justify-between bg-white/80 dark:bg-slate-800/80 rounded-lg px-2 py-2 shadow text-base">
              <span className="truncate font-semibold max-w-[60%] text-sm md:text-base">
                <span className="block md:hidden">{(r.name || 'Без названия').length > 25 ? (r.name || 'Без названия').slice(0, 25) + '…' : (r.name || 'Без названия')}</span>
                <span className="hidden md:block">{r.name || 'Без названия'}</span>
              </span>
              <div className="flex items-center gap-2">
                <IconButton
                  className="focus:outline-none"
                  aria-label="Удалить из избранного"
                  onClick={() => removeFavoriteRecipe(r)}
                >
                  <Image src="/favorite.png" alt="Удалить из избранного" width={28} height={28} />
                </IconButton>
                {/* Мобильная версия: иконка-лупа, десктоп: кнопка */}
                <IconButton
                  className="ml-2 rounded-lg bg-transparent shadow-none text-white font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 block md:hidden"
                  aria-label="Подробнее"
                  onClick={() => setModal({ open: true, content: r })}
                >
                  <Image src="/loupe.png" alt="Подробнее" width={24} height={24} />
                </IconButton>
                <Button
                  className="ml-2 px-3 py-1 rounded-lg bg-gradient-to-r from-green-400 to-green-600 shadow text-white font-semibold hover:from-green-500 hover:to-green-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 hidden md:block"
                  onClick={() => setModal({ open: true, content: r })}
                >
                  Подробнее
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === 'products' && (
        <div className="w-full max-w-xl px-4 flex flex-col gap-2">
          {favoriteProducts.length === 0 && (
            <div className="text-gray-500 text-center py-8">Нет избранных продуктов</div>
          )}
          {favoriteProducts.map((p) => (
            <div key={p.id} className="flex items-center justify-between bg-white/80 dark:bg-slate-800/80 rounded-lg px-2 py-2 shadow text-base">
              <span className="truncate font-semibold max-w-[60%] text-sm md:text-base flex items-center gap-2">
                <Image src={p.imgUrl} alt={p.name} width={32} height={32} className="rounded-full border border-gray-200 dark:border-gray-700" />
                <span>{p.name}</span>
              </span>
              <div className="flex items-center gap-2">
                <IconButton
                  className="focus:outline-none"
                  aria-label="Удалить из избранного"
                  onClick={() => removeFavoriteProduct(p)}
                >
                  <Image src="/favorite.png" alt="Удалить из избранного" width={28} height={28} />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Модальное окно для подробного рецепта */}
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
                    removeFavoriteRecipe(modal.content!)
                    setModal({ open: false, content: null })
                  }}
                  className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium transition-all duration-200 hover:shadow-lg"
                >
                  💔 Удалить из избранного
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 