'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import MainTabs from "@/app/components/MainTabs"

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

export default function HomePage() {
  const router = useRouter()
  const [isPublisher, setIsPublisher] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/pages/login')
    } else {
      const userData = JSON.parse(user)
      setIsPublisher(userData.isPublisher)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/pages/login')
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
        <div className="flex justify-end">
          <button
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition font-semibold"
            onClick={handleLogout}
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
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-pulse">
            VoSo
          </h1>
          <p className="text-slate-200 text-lg font-medium drop-shadow">
            Voucher Social Marketplace
          </p>
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