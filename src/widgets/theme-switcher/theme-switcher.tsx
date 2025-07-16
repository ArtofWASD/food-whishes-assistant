import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'dark') {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  if (!mounted) return null

  return (
    <button
      className="rounded-full my-2 flex items-center justify-center border-2 border-black dark:border-white bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
      onClick={toggleTheme}
      aria-label="Переключить тему"
      style={{ width: 56, height: 34, overflow: 'hidden' }}
    >
      <motion.div
        initial={false}
        animate={{ x: theme === 'light' ? 10 : -10 }}
        transition={{ type: 'spring', stiffness: 150, damping: 50 }}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Image
          src={theme === 'light' ? '/sun.png' : '/moon.png'}
          alt={theme === 'light' ? 'Светлая тема' : 'Тёмная тема'}
          width={24}
          height={24}
          priority
        />
      </motion.div>
    </button>
  )
}

export default ThemeSwitcher 