import React from 'react'
import ThemeSwitcher from '../../widgets/ThemeSwitcher/ThemeSwitcher'

const SettingsBar = () => {
  return (
    <div className=" rounded-xl bg-[var(--pastel-blue)] bg-opacity-35 flex flex-col gap-2">
      <div className="flex flex-row items-center gap-2 justify-end">
        <ThemeSwitcher />
        {/* Здесь могут быть другие элементы настроек */}
      </div>
    </div>
  )
}

export default SettingsBar
