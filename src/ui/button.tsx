"use client"
import React from "react"

/**
 * Универсальная кнопка для UI
 */
export function Button({ children, className = '', ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
} 