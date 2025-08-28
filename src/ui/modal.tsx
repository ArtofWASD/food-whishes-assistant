"use client"
import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { IconButton } from './icon-button'
import { ModalProps, ModalAnimationType, ModalSize } from '@/src/types'

// Animation presets based on analyzed patterns
const getAnimationConfig = (animation: ModalAnimationType = 'fade') => {
  const configs = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    'slide-up': {
      initial: { opacity: 0, y: 40, scale: 0.9 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: 40, scale: 0.9 }
    },
    'slide-down': {
      initial: { opacity: 0, y: -40, scale: 0.9 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -40, scale: 0.9 }
    },
    'slide-left': {
      initial: { x: '-100%' },
      animate: { x: 0 },
      exit: { x: '-100%' }
    },
    'slide-right': {
      initial: { x: '100%' },
      animate: { x: 0 },
      exit: { x: '100%' }
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 }
    },
    none: {
      initial: {},
      animate: {},
      exit: {}
    }
  }
  return configs[animation]
}

// Size configurations based on analyzed patterns
const getSizeClasses = (size: ModalSize = 'md') => {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-2xl',
    lg: 'max-w-3xl',
    xl: 'max-w-4xl',
    full: 'max-w-full w-full h-full'
  }
  return sizes[size]
}

// Mobile-specific size classes for screens under 425px
const getMobileSizeClasses = (size: ModalSize = 'md') => {
  const mobileSizes = {
    sm: 'max-w-[95vw]',
    md: 'max-w-[95vw]',
    lg: 'max-w-[95vw]',
    xl: 'max-w-[95vw]',
    full: 'max-w-full w-full h-full'
  }
  return mobileSizes[size]
}

// Default gradient backgrounds based on analyzed patterns
const getGradientBackground = (gradientType?: string) => {
  const gradients = {
    blue: 'bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-50 dark:from-blue-900/30 dark:via-indigo-900/20 dark:to-purple-900/10',
    yellow: 'bg-gradient-to-br from-yellow-100 via-orange-50 to-red-50 dark:from-yellow-900/30 dark:via-orange-900/20 dark:to-red-900/10',
    purple: 'bg-gradient-to-br from-blue-100 via-purple-50 to-pink-50 dark:from-blue-900/30 dark:via-purple-900/20 dark:to-pink-900/10',
    green: 'bg-gradient-to-br from-green-100 via-emerald-50 to-teal-50 dark:from-green-900/30 dark:via-emerald-900/20 dark:to-teal-900/10'
  }
  return gradientType && gradients[gradientType as keyof typeof gradients] 
    ? gradients[gradientType as keyof typeof gradients] 
    : gradients.blue
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  className = '',
  contentClassName = '',
  overlayClassName = '',
  showCloseButton = true,
  closeButtonClassName = '',
  gradientBackground = 'blue',
  backdrop = 'blur',
  animation = 'slide-up',
  animationDuration = 300,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  preventScroll = true,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  role = 'dialog',
  onOpen,
  onClosed
}) => {
  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [closeOnEscape, isOpen, onClose])

  // Handle body scroll prevention
  useEffect(() => {
    if (!preventScroll) return

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      onOpen?.()
    } else {
      document.body.style.overflow = 'unset'
      onClosed?.()
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, preventScroll, onOpen, onClosed])

  const animationConfig = getAnimationConfig(animation)
  const sizeClasses = getSizeClasses(size)
  const gradientClasses = getGradientBackground(gradientBackground)

  // Handle backdrop click
  const handleBackdropClick = () => {
    if (closeOnBackdropClick) {
      onClose()
    }
  }

  // Stop propagation on content click for slide-left animation (settings panel)
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  // For slide-left animation (settings panel), use different layout
  if (animation === 'slide-left') {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed inset-0 z-50 flex bg-black/40 ${overlayClassName}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: animationDuration / 1000 }}
            onClick={handleBackdropClick}
          >
            <motion.div
              className={`bg-white dark:bg-gray-900 shadow-lg w-80 h-full p-6 flex flex-col gap-4 overflow-y-auto ${contentClassName}`}
              initial={animationConfig.initial}
              animate={animationConfig.animate}
              exit={animationConfig.exit}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={handleContentClick}
              role={role}
              aria-labelledby={ariaLabelledBy}
              aria-describedby={ariaDescribedBy}
            >
              {/* Settings panel header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {title}
                </h3>
                {showCloseButton && (
                  <IconButton
                    className={`text-gray-500 hover:text-gray-800 dark:hover:text-white ${closeButtonClassName}`}
                    onClick={onClose}
                    aria-label="Закрыть"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </IconButton>
                )}
              </div>
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  // Standard centered modal layout
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed inset-0 z-50 flex items-center justify-center ${animation === 'slide-up' ? 'p-2 sm:p-4' : 'p-1 sm:p-2'} ${overlayClassName}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: animationDuration / 1000 }}
        >
          {/* Backdrop */}
          <div 
            className={`fixed inset-0 ${backdrop === 'blur' ? 'bg-black/50 backdrop-blur-sm' : backdrop === 'close' ? 'bg-black/60' : 'bg-black/40'}`}
            onClick={handleBackdropClick}
          />
          
          {/* Modal content container */}
          <motion.div
            className={`relative w-full ${getMobileSizeClasses(size)} sm:${sizeClasses} mx-auto ${size === 'full' ? '' : 'max-h-[90vh] sm:max-h-[85vh]'} ${className}`}
            initial={animationConfig.initial}
            animate={animationConfig.animate}
            exit={animationConfig.exit}
            transition={
              animation === 'slide-up' 
                ? { type: 'spring', stiffness: 200, damping: 22 } 
                : { duration: animationDuration / 1000 }
            }
            role={role}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
          >
            {/* Gradient Background (for recipe/product modals) */}
            {gradientBackground && (
              <div className={`absolute inset-0 ${gradientClasses} rounded-2xl blur-sm`}></div>
            )}
            
            {/* Modal content */}
            <div className={`relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-3 sm:p-6 md:p-8 ${size === 'full' ? 'h-full' : 'overflow-y-auto'} ${contentClassName}`}>
              {/* Header with title and close button */}
              {(title || showCloseButton) && (
                <div className="flex items-center justify-between mb-3 sm:mb-6">
                  {title && (
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-1 sm:gap-2">
                      {title}
                    </h2>
                  )}
                  {showCloseButton && (
                    <IconButton
                      type="button"
                      className={`text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-1 ${closeButtonClassName}`}
                      onClick={onClose}
                      aria-label="Закрыть модальное окно"
                    >
                      <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </IconButton>
                  )}
                </div>
              )}
              
              {/* Modal body */}
              <div className={title || showCloseButton ? 'space-y-3 sm:space-y-6' : ''}>
                {children}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal