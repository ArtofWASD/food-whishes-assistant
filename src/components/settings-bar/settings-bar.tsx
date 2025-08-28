"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import Toggler from '../../widgets/toggler/toggler'
import { useAppStore } from '@/src/store/appStore'

import AuthDrawer from "../../widgets/auth-drawer/auth-drawer"
import { IconButton } from "@/src/ui/icon-button"
import { ThemeSwitcher } from '@/src/ui/theme-switcher'
import { IconExpandButton } from '@/src/ui/icon-expand-button'
import Modal from '@/src/ui/modal'
import { useRouter, usePathname } from 'next/navigation'

const SettingsBar = () => {
  const {
    selectedMeal, setSelectedMeal,
    lowestMacro, setLowestMacro,
  } = useAppStore()

  const [authOpen, setAuthOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [aboutExpanded, setAboutExpanded] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const isMain = pathname === '/'
  const isIconOnlyBack = pathname === '/profile' || pathname === '/about'

  return (
    <div className="bg-[var(--pastel-blue)] bg-opacity-35 flex flex-col gap-2 shadow-[0_4px_16px_0_rgba(0,0,0,0.10)]">
      <div className="flex flex-row justify-between items-center w-full relative min-h-12 h-12">
        {/* Левая часть: кнопка настроек и кнопка "На главную" */}
        <div className="flex flex-row gap-4">
          {/* Кнопка настроек */}
          {isMain && (
            <IconButton
              className="flex items-center group"
              aria-label="Настройки"
              onClick={() => setSettingsOpen(true)}
            >
              <Image src="/settings.png" alt="Настройки" width={32} height={32} className="w-8 h-8 transition-transform group-hover:scale-110" />
            </IconButton>
          )}
          {!isMain && (
            isIconOnlyBack ? (
              <IconButton
                onClick={() => router.push('/')}
                aria-label="На главную"
              >
                <Image src="/previous.png" alt="Назад" width={28} height={28} />
              </IconButton>
            ) : (
              <IconExpandButton
                icon={<Image src="/previous.png" alt="Назад" width={28} height={28} />}
                expanded={aboutExpanded}
                onClick={() => router.push('/')}
                onMouseEnter={() => setAboutExpanded(true)}
                onMouseLeave={() => setAboutExpanded(false)}
              >
                На главную
              </IconExpandButton>
            )
          )}
        </div>

        {/* Кнопки справа */}
        <div className="flex flex-row items-center gap-2 absolute right-2 top-1/2 -translate-y-1/2 md:static md:translate-y-0">
          <ThemeSwitcher />
          {/* Кнопка входа в личный кабинет */}
          <IconButton
            className="flex items-center group md:mr-2"
            aria-label="Личный кабинет"
            onClick={() => setAuthOpen(true)}
          >
            <Image src="/login.png" alt="Войти" width={32} height={32} className="w-8 h-8 transition-transform group-hover:scale-110" />
          </IconButton>
        </div>
      </div>

      
      {/* Universal Modal for settings panel (slide-left animation) */}
      <Modal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        title="Настройки"
        animation="slide-left"
        closeOnBackdropClick={true}
        gradientBackground=""
      >
        {/* Тогглеры для выбора приёма пищи */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200">Приём пищи</h4>
          <div className="flex flex-col gap-2">
            <Toggler label="Завтрак" value={selectedMeal === 'breakfast'} onChange={() => setSelectedMeal(selectedMeal === 'breakfast' ? null : 'breakfast')} />
            <Toggler label="Обед" value={selectedMeal === 'lunch'} onChange={() => setSelectedMeal(selectedMeal === 'lunch' ? null : 'lunch')} />
            <Toggler label="Ужин" value={selectedMeal === 'dinner'} onChange={() => setSelectedMeal(selectedMeal === 'dinner' ? null : 'dinner')} />
          </div>
        </div>
        
        {/* Тогглеры для выбора минимального БЖУ */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200">Минимальное содержание</h4>
          <div className="flex flex-col gap-2">
            <Toggler label="Минимум белков" value={lowestMacro === 'protein'} onChange={() => setLowestMacro(lowestMacro === 'protein' ? null : 'protein')} />
            <Toggler label="Минимум жиров" value={lowestMacro === 'fat'} onChange={() => setLowestMacro(lowestMacro === 'fat' ? null : 'fat')} />
            <Toggler label="Минимум углеводов" value={lowestMacro === 'carbs'} onChange={() => setLowestMacro(lowestMacro === 'carbs' ? null : 'carbs')} />
          </div>
        </div>
      </Modal>
      {/* Sllide секция для авторизации */}
      <AuthDrawer open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  )
}

export default SettingsBar
