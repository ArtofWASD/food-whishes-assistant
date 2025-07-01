import React from 'react'
import ThemeSwitcher from '../../widgets/ThemeSwitcher/ThemeSwitcher'
import Toggler from '../../widgets/Toggler/Toggler'
import { motion } from 'framer-motion'
import { useAppStore } from '@/src/store/appStore'

const viewModes = [
  { value: 'list', label: 'Список' },
  { value: 'grid', label: 'Плитка 4 в ряд' },
  { value: 'flow', label: 'Все подряд' },
]

const SettingsBar = () => {
  const {
    minCalories, setMinCalories,
    onlyVegetables, setOnlyVegetables,
    bestMacros, setBestMacros,
    viewMode, setViewMode
  } = useAppStore()

  return (
    <div className="rounded-xl bg-[var(--pastel-blue)] bg-opacity-35 flex flex-col gap-2">
      <div className="flex flex-row items-center gap-2 justify-between w-full">
        <div className="flex flex-row items-center gap-2">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, type: 'spring', stiffness: 150, damping: 20 }}>
            <Toggler label="Мин. калорийность" value={minCalories} onChange={setMinCalories} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, type: 'spring', stiffness: 150, damping: 20 }}>
            <Toggler label="Только овощи" value={onlyVegetables} onChange={setOnlyVegetables} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, type: 'spring', stiffness: 150, damping: 20 }}>
            <Toggler label="Лучшее БЖУ" value={bestMacros} onChange={setBestMacros} />
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ type: 'spring', stiffness: 150, damping: 20 }}>
          <ThemeSwitcher />
        </motion.div>
      </div>
    </div>
  )
}

export default SettingsBar
