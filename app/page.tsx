'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import AboutSection from "@/app/components/AboutSection"
import AuthCard from "@/app/components/AuthCard"
import MainTabs from "@/app/components/MainTabs"
import { login } from "@/app/services/authServices"
import HeroSection from "./components/HeroSection"

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export default function VoSo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isPublisher, setIsPublisher] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showAuth, setShowAuth] = useState<"none" | "login" | "register">("none")

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

  if (!isLoggedIn) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-black">
        {/* Nút Login/Register ở góc phải */}
        <div className="absolute top-6 right-8 z-30">
          <button
            className="px-6 py-2 rounded-xl bg-cyan-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition"
            onClick={() => setShowAuth("login")}
          >
            Login / Register
          </button>
        </div>

        {/* Nội dung trang chính */}
        <motion.div
          className="flex flex-col items-center justify-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full"
          >
            <HeroSection />
          </motion.div>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full"
          >
            <AboutSection />
          </motion.div>
        </motion.div>

        {/* Overlay modal cho Auth */}
        {showAuth !== "none" && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3 }}
              className="w-full max-w-xl mx-auto bg-slate-900 rounded-2xl shadow-2xl p-8 relative"
            >
              <button
                className="absolute top-4 right-4 text-cyan-400 text-2xl hover:text-cyan-200 transition"
                onClick={() => setShowAuth("none")}
              >
                ×
              </button>
              <AuthCard
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                error={error}
                registerMode={showAuth === "register"}
                setRegisterMode={mode => setShowAuth(mode ? "register" : "login")}
                handleLogin={handleLogin}
                setError={setError}
              />
            </motion.div>
          </div>
        )}
      </div>
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
            Logout
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