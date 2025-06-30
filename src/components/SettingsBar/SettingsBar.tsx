import React, { useEffect, useState } from 'react'

const SettingsBar = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="border-gray-600 border-2 border-dashed p-4 rounded bg-[var(--pastel-blue)] bg-opacity-35 flex flex-col gap-2">
      <div className="flex justify-between items-center mb-2">
        <button
          className="mr-2 px-1 py-1 rounded self-end bg-[var(--pastel-purple)] text-[var(--foreground)] border hover:bg-[var(--pastel-pink)] transition"
          onClick={toggleTheme}
        >
          {theme === 'light' ? '🌞' : '🌙'}
        </button>
      </div>
    </div>
  )
}

export default SettingsBar
