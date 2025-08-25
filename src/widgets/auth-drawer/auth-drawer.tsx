import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useRouter } from "next/navigation"
import { IconButton } from "@/src/ui/icon-button"
import { Button } from "@/src/ui/button"
import { AuthDrawerProps, LoginForm, RegisterForm, AuthMode } from "@/src/types"

const loginSchema = yup.object({
  email: yup.string().email("Некорректный email").required("Email обязателен"),
  password: yup.string().min(5, "Минимум 5 символов").required("Пароль обязателен"),
})

const registerSchema = yup.object({
  email: yup.string().email("Некорректный email").required("Email обязателен"),
  password: yup.string().min(5, "Минимум 5 символов").required("Пароль обязателен"),
  confirm: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают').required('Подтвердите пароль'),
})

const MOCK_EMAIL = "test@example.com"
const MOCK_PASSWORD = "test12345"

export default function AuthDrawer({ open, onClose }: AuthDrawerProps) {
  const [mode, setMode] = useState<AuthMode>('login')
  const router = useRouter()

  // Login form
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin,
    setValue: setLoginValue,
  } = useForm<LoginForm>({ resolver: yupResolver(loginSchema) })

  // Register form
  const {
    register: regRegister,
    handleSubmit: handleRegSubmit,
    formState: { errors: regErrors },
    reset: resetReg,
  } = useForm<RegisterForm>({ resolver: yupResolver(registerSchema) })

  // Автоматически подставлять тестовые данные при открытии панели
  useEffect(() => {
    if (open && mode === 'login') {
      setLoginValue('email', MOCK_EMAIL)
      setLoginValue('password', MOCK_PASSWORD)
    }
  }, [open, mode, setLoginValue])

  const onLogin = (data: LoginForm) => {
    // Проверка на тестовые данные
    if (data.email === MOCK_EMAIL && data.password === MOCK_PASSWORD) {
      resetLogin()
      onClose()
      router.push('/profile')
      return
    }
    // Можно добавить обработку ошибки
    resetLogin()
    onClose()
  }
  const onRegister = () => {
    // TODO: handle register
    resetReg()
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Затемнение */}
          <div className="fixed inset-0 bg-black/40" onClick={onClose} />
          {/* Слайдер */}
          <motion.div
            className="fixed top-0 right-0 h-full bg-white dark:bg-gray-900 shadow-2xl flex flex-col px-6 py-8"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            style={{ zIndex: 60 }}
          >
            <style>{`
              @media (min-width: 769px) {
                .auth-drawer-width { width: 25vw; max-width: 420px; }
              }
              @media (max-width: 768px) and (min-width: 426px) {
                .auth-drawer-width { width: 50vw; max-width: 90vw; }
              }
              @media (max-width: 425px) {
                .auth-drawer-width { width: 90vw; }
              }
            `}</style>
            <div className="auth-drawer-width" style={{ height: '100vh' }}>
              {/* Кнопка закрытия */}
              <IconButton
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white text-2xl"
                onClick={onClose}
                aria-label="Закрыть"
              >
                ×
              </IconButton>
              {/* Переключатель режимов */}
              <div className="flex justify-center gap-4 mb-8 mt-2">
                <Button
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${mode === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                  onClick={() => setMode('login')}
                >Вход</Button>
                <Button
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${mode === 'register' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                  onClick={() => setMode('register')}
                >Регистрация</Button>
              </div>
              {/* Форма входа */}
              {mode === 'login' && (
                <form onSubmit={handleLoginSubmit(onLogin)} className="flex flex-col gap-4">
                  <input
                    type="email"
                    placeholder="Email"
                    {...loginRegister('email')}
                    className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  {loginErrors.email && <span className="text-red-500 text-sm">{loginErrors.email.message as string}</span>}
                  <input
                    type="password"
                    placeholder="Пароль"
                    {...loginRegister('password')}
                    className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  {loginErrors.password && <span className="text-red-500 text-sm">{loginErrors.password.message as string}</span>}
                  <Button type="submit" className="bg-blue-600 text-white rounded-lg py-2 font-bold hover:bg-blue-700 transition">Войти</Button>
                </form>
              )}
              {/* Форма регистрации */}
              {mode === 'register' && (
                <form onSubmit={handleRegSubmit(onRegister)} className="flex flex-col gap-4">
                  <input
                    type="email"
                    placeholder="Email"
                    {...regRegister('email')}
                    className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  {regErrors.email && <span className="text-red-500 text-sm">{regErrors.email.message as string}</span>}
                  <input
                    type="password"
                    placeholder="Пароль"
                    {...regRegister('password')}
                    className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  {regErrors.password && <span className="text-red-500 text-sm">{regErrors.password.message as string}</span>}
                  <input
                    type="password"
                    placeholder="Подтвердите пароль"
                    {...regRegister('confirm')}
                    className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  {regErrors.confirm && <span className="text-red-500 text-sm">{regErrors.confirm.message as string}</span>}
                  <Button type="submit" className="bg-blue-600 text-white rounded-lg py-2 font-bold hover:bg-blue-700 transition">Зарегистрироваться</Button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 