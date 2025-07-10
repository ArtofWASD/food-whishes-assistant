"use client"
import Image from "next/image"
import { ThemeSwitcher } from "@/src/ui/theme-switcher"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()
  return (
    <div className="relative min-h-[60vh] py-8 flex flex-col items-center justify-center">
      {/* Верхняя панель */}
      <div className="absolute top-4 left-0 w-full flex flex-row justify-between items-center px-2 z-10">
        <ThemeSwitcher />
        <div className="flex flex-row items-center gap-2">
          <button className="group" aria-label="Настройки профиля">
            <Image src="/settings.png" alt="Настройки" width={36} height={36} className="transition-transform group-hover:scale-110" />
          </button>
          <button className="group" aria-label="Выйти из профиля" onClick={() => router.push("/") }>
            <Image src="/previous.png" alt="Выйти" width={36} height={36} className="transition-transform group-hover:scale-110" />
          </button>
        </div>
      </div>
      <Image src="/login.png" alt="Профиль" width={80} height={80} className="mb-4" />
      <h1 className="text-3xl font-bold mb-2">Личный кабинет</h1>
      <p className="text-lg text-gray-700 dark:text-gray-200 mb-4">Добро пожаловать в ваш профиль!</p>
      {/* Здесь в будущем появится информация о пользователе */}
    </div>
  )
} 