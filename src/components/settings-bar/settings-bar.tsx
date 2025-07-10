import React, { useState } from 'react'
import ThemeSwitcher from '../../widgets/theme-switcher/theme-switcher'
import Toggler from '../../widgets/toggler/toggler'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/src/store/appStore'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import AuthDrawer from "../../widgets/auth-drawer/auth-drawer"

const SettingsBar = () => {
  const {
    minCalories, setMinCalories,
    onlyVegetables, setOnlyVegetables,
    bestMacros, setBestMacros,
  } = useAppStore()
  const [open, setOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <div className="rounded-xl bg-[var(--pastel-blue)] bg-opacity-35 flex flex-col gap-2">
      <div className="flex flex-row justify-end items-center w-full relative">
        {/* Menu icon for mobile */}
        <button
          className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 p-1"
          onClick={() => setOpen(true)}
          aria-label="Открыть меню настроек"
        >
          <Bars3Icon className="w-7 h-7 text-blue-700" />
        </button>
        {/* Кнопка входа в личный кабинет */}
        <button
          className="mr-2 flex items-center group"
          aria-label="Личный кабинет"
          onClick={() => setAuthOpen(true)}
        >
          <img src="/login.png" alt="Войти" className="w-8 h-8 transition-transform group-hover:scale-110" />
        </button>
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
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
                onClick={() => setOpen(false)}
                aria-label="Закрыть меню"
              >
                <XMarkIcon className="w-7 h-7" />
              </button>
              <Toggler label="Мин. калорийность" value={minCalories} onChange={setMinCalories} />
              <Toggler label="Только овощи" value={onlyVegetables} onChange={setOnlyVegetables} />
              <Toggler label="Лучшее БЖУ" value={bestMacros} onChange={setBestMacros} />
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
