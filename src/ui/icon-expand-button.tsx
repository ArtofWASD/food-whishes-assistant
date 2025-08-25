import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IconExpandButtonProps } from "@/src/types"

export const IconExpandButton: React.FC<IconExpandButtonProps> = ({
  icon,
  children,
  expanded,
  onClick,
  className = "",
  onMouseEnter,
  onMouseLeave
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative bg-transparent text-[#08A045] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 ${className}`}
      aria-expanded={expanded}
      style={{ minWidth: 40 }}
    >
      <motion.div
        className="flex items-center border border-transparent hover:border-black rounded-full"
        animate={{
          width: expanded ? 'auto' : 40,
          backgroundColor: 'transparent',
        }}
        transition={{ type: "spring", stiffness: 60, damping: 16, mass: 1.2 }}
        style={{ minWidth: 40, maxWidth: '100%', overflow: 'hidden' }}
      >
        <motion.span
          className="flex items-center justify-center"
          style={{ width: 40, height: 40 }}
          animate={{ scale: expanded ? 1.18 : 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 16, mass: 1.2 }}
        >
          {icon}
        </motion.span>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.span
              key="text"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: -10 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ type: "spring", stiffness: 60, damping: 16, mass: 1.2 }}
              className="whitespace-nowrap text-base font-bold text-black ml-2"
              style={{ pointerEvents: 'none' }}
            >
              {children}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  )
} 