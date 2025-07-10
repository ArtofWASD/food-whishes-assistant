"use client"
import React from "react"

/**
 * Универсальная кнопка для UI
 */
export function Button({ children, className = '', ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-5 py-2 rounded-full border-black/20 border-[1.5px] font-semibold shadow-md ring-1 ring-white/40 bg-gradient-to-br from-pastelBlue/70 via-pastelPink/60 to-pastelGreen/60 backdrop-blur-md bg-opacity-60 text-gray-800 dark:text-white transition-all duration-200 focus:outline-none hover:bg-opacity-80 hover:from-pastelBlue/90 hover:to-pastelGreen/80 hover:via-pastelPink/80 hover:shadow-[0_0_10px_3px_#bcdffbcc] ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
} 