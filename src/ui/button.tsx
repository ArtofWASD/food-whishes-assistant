"use client"
import React from "react"

/**
 * Универсальная кнопка для UI
 */
export function Button({ children, className = '', ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-5 py-2 rounded-xl border-black/10 border font-semibold shadow-sm ring-1 ring-white/30 bg-pastelBlue bg-opacity-70 dark:bg-pastelBlue dark:bg-opacity-60 text-gray-800 dark:text-gray-100 transition-all duration-200 focus:outline-none hover:bg-pastelBlue hover:bg-opacity-90 dark:hover:bg-pastelBlue dark:hover:bg-opacity-80 ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
} 