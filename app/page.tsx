'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useState } from "react"
import { motion } from "framer-motion"
import AboutSection from "@/app/components/AboutSection"
import AuthCard from "@/app/components/AuthCard"
import MainTabs from "@/app/components/MainTabs"
import { login, register } from "@/app/services/authServices"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function VoSo() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isPublisher, setIsPublisher] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [registerMode, setRegisterMode] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      router.push('/pages/home')
    } else {
      router.push('/pages/login')
    }
  }, [router])

  const handleLogin = async () => {
    setError("")
    const res = await login(email, password)
    if (res.success) {
      setIsLoggedIn(true)
      setIsPublisher(res.user.isPublisher)
    } else {
      setError(res.message || "Login failed")
    }
  }

  const handleRegister = async () => {
    setError("")
    const res = await register(email, password)
    if (res.success) {
      setRegisterMode(false)
      setError("Đăng ký thành công! Vui lòng đăng nhập.")
    } else {
      setError(res.message || "Register failed")
    }
  }

  if (!isLoggedIn) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-black"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.4 }}
      >
        <div className="w-full max-w-xl space-y-8">
          <AboutSection />
          <AuthCard
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={error}
            registerMode={registerMode}
            setRegisterMode={setRegisterMode}
            handleLogin={handleLogin}
            handleRegister={handleRegister}
          />
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-black p-0"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.4 }}
    >
      <div className="p-6 max-w-5xl mx-auto space-y-8">
        {/* Nút Back/Logout */}
        <div className="flex justify-end">
          <button
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition font-semibold"
            onClick={() => setIsLoggedIn(false)}
          >
            Đăng xuất
          </button>
        </div>
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1
            className="text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg
              bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent
              animate-pulse"
          >
            VoSo
          </h1>
          <p className="text-slate-200 text-lg font-medium drop-shadow">Voucher Social Marketplace</p>
        </motion.div>
        <MainTabs
          isPublisher={isPublisher}
          isVerified={isVerified}
          setIsVerified={setIsVerified}
          setIsPublisher={setIsPublisher}
        />
      </div>
    </motion.div>
  )
}