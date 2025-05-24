'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import AboutSection from "@/app/components/AboutSection"
import AuthCard from "@/app/components/AuthCard"
import HeroSection from "@/app/components/HeroSection"
import { login, register } from "@/app/services/authServices"
import { BaseWalletMultiButton } from "@/components/ui/murphy/connect-wallet-button";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showAuth, setShowAuth] = useState<"none" | "login" | "register">("none")

  const handleLogin = async () => {
    setError("")
    const res = await login(email, password)
    if (res.success) {
      localStorage.setItem('user', JSON.stringify(res.user))
      router.push('/pages/home')
    } else {
      setError(res.message || "Login failed")
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-purple-200 to-pink-200">
      <div className="absolute top-6 right-8 z-30">
        <button
          className="px-6 py-2 rounded-xl bg-cyan-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition"
          onClick={() => setShowAuth("login")}
        >
          Login / Register
        </button>
      </div>

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
          <HeroSection onGetStarted={() => setShowAuth("login")} />
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
              setError={setError}
              registerMode={showAuth === "register"}
              setRegisterMode={mode => setShowAuth(mode ? "register" : "login")}
              handleLogin={handleLogin}
            />
            
          </motion.div>
        </div>
      )}
    </div>
  )
}