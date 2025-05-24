'use client'

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { useRouter } from "next/navigation"
// import MainTabs from "@/app/components/MainTabs"
// import { BaseWalletMultiButton } from "@/components/ui/murphy/connect-wallet-button"
// import { ConnectWalletButton } from "@/components/ui/murphy/connect-wallet-button"
// import { WalletProvider } from "@/components/providers/wallet-provider"
// import { Wallet } from "lucide-react"
// import WalletBalance from "@/components/WalletBalance"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import MainTabs from "@/app/components/MainTabs"
import { ConnectWalletButton } from "@/components/ui/murphy/connect-wallet-button"
import { WalletProvider } from "@/components/providers/wallet-provider"
import { Wallet } from "lucide-react"
import WalletBalance from "@/components/WalletBalance"
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
      className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-200 to-pink-200 p-0"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.4 }}
    >
      <div className="p-6 max-w-[1500px] mx-auto space-y-8 white">
        <div className="flex justify-end gap-4">
          <div className="flex items-center gap-2 rounded-xl px-4 py-2 shadow-md border border-purple-200 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50/80 backdrop-blur">
            <WalletProvider>
              <ConnectWalletButton>
                <Wallet className="size-4 mr-2 text-white-400" />
                <span className="text-white-100 font-semibold">Connect Wallet</span>
              </ConnectWalletButton>
              <span className="text-purple-700 font-semibold text-sm">
                <WalletBalance />
              </span>
            </WalletProvider>
          </div>
          <button
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-400 via-pink-300 to-blue-200 text-white hover:brightness-110 transition font-semibold shadow border border-purple-200"
            onClick={handleLogout}
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
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
            VoSo
          </h1>
          <p className="text-purple-700 text-lg font-medium drop-shadow">
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
