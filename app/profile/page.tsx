"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/src/store/appStore"
import { useState } from "react"
import { IconButton } from "@/src/ui/icon-button"
import { Button } from "@/src/ui/button"

export default function ProfilePage() {
  const router = useRouter()
  const { favoriteRecipes, removeFavoriteRecipe, favoriteProducts, removeFavoriteProduct } = useAppStore()
  const [tab, setTab] = useState<'profile' | 'favorites' | 'products'>('profile')
  const [modal, setModal] = useState<{ open: boolean, content: string }>({ open: false, content: "" })
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
                  onClick={() => setModal({ open: true, content: r.full })}
                >
                  <Image src="/loupe.png" alt="Подробнее" width={24} height={24} />
                </IconButton>
                <Button
                  className="ml-2 px-3 py-1 rounded-lg bg-gradient-to-r from-green-400 to-green-600 shadow text-white font-semibold hover:from-green-500 hover:to-green-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 hidden md:block"
                  onClick={() => setModal({ open: true, content: r.full })}
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
      {/* Модалка для подробного рецепта */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/40" onClick={() => setModal({ open: false, content: "" })} />
          <div className="bg-white dark:bg-gray-900 px-4 py-6 w-full max-w-xl relative flex flex-col overflow-y-auto max-h-[80vh] z-10 animate-fade-in-up">
            <IconButton
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white z-10"
              onClick={() => setModal({ open: false, content: "" })}
              aria-label="Закрыть"
            >
              <svg width="28" height="28" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6L14 14M14 6L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </IconButton>
            <div className="whitespace-pre-line text-base min-h-12 flex items-center justify-center py-6">
              {modal.content.replace(/===([A-ZА-ЯЁ\s]+?)===/g, (_match, p1) => `${p1.trim().charAt(0).toUpperCase() + p1.trim().slice(1).toLowerCase()}:`)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 