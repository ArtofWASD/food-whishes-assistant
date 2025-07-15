import React from "react"

/**
 * Универсальная кнопка-иконка для UI
 */
export function IconButton({
  children,
  className = '',
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`flex items-center justify-center rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 bg-transparent ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
} 