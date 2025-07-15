import React, { useState } from 'react'
import Image from 'next/image'
import Toggler from '../../widgets/toggler/toggler'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/src/store/appStore'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import AuthDrawer from "../../widgets/auth-drawer/auth-drawer"
import { IconButton } from "@/src/ui/icon-button"

const SettingsBar = () => {
  const {
    selectedMeal, setSelectedMeal,
  } = useAppStore()
  const [open, setOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <div className="rounded-xl bg-[var(--pastel-blue)] bg-opacity-35 flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center w-full relative min-h-12 h-12">
        {/* Тогглеры для выбора приёма пищи на md+ */}
        <div className="hidden md:flex flex-row gap-4">
          <Toggler label="Завтрак" value={selectedMeal === 'breakfast'} onChange={() => setSelectedMeal('breakfast')} />
          <Toggler label="Обед" value={selectedMeal === 'lunch'} onChange={() => setSelectedMeal('lunch')} />
          <Toggler label="Ужин" value={selectedMeal === 'dinner'} onChange={() => setSelectedMeal('dinner')} />
        </div>
        {/* Menu icon for mobile */}
        <IconButton
          className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 p-1"
          onClick={() => setOpen(true)}
          aria-label="Открыть меню настроек"
        >
          <Bars3Icon className="w-7 h-7 text-blue-700" />
        </IconButton>
        {/* Кнопка входа в личный кабинет */}
        <IconButton
          className="flex items-center group md:mr-2 md:static md:translate-y-0 absolute right-2 top-1/2 -translate-y-1/2"
          aria-label="Личный кабинет"
          onClick={() => setAuthOpen(true)}
        >
          <Image src="/login.png" alt="Войти" width={32} height={32} className="w-8 h-8 transition-transform group-hover:scale-110" />
        </IconButton>
      </div>
      {/* Модальное окно с тогглерами */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-xs p-6 relative flex flex-col gap-4"
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            >
              <IconButton
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
                onClick={() => setOpen(false)}
                aria-label="Закрыть меню"
              >
                <XMarkIcon className="w-7 h-7" />
              </IconButton>
              {/* Тогглеры для выбора приёма пищи */}
              <Toggler label="Завтрак" value={selectedMeal === 'breakfast'} onChange={() => setSelectedMeal('breakfast')} />
              <Toggler label="Обед" value={selectedMeal === 'lunch'} onChange={() => setSelectedMeal('lunch')} />
              <Toggler label="Ужин" value={selectedMeal === 'dinner'} onChange={() => setSelectedMeal('dinner')} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Sllide секция для авторизации */}
      <AuthDrawer open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  )
}

export default SettingsBar
