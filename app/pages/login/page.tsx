'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import AboutSection from "@/app/components/AboutSection"
import AuthCard from "@/app/components/AuthCard"
import { login, register } from "@/app/services/authServices"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [registerMode, setRegisterMode] = useState(false)

  const handleLogin = async () => {
    setError("")
    const res = await login(email, password)
    if (res.success) {
      localStorage.setItem('user', JSON.stringify(res.user))
      router.push('/pages/home')  // Updated path
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