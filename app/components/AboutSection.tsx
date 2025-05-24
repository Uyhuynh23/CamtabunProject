import { ShieldCheckIcon, ArrowsRightLeftIcon, EyeIcon, BoltIcon, GlobeAltIcon, ChartBarIcon } from "@heroicons/react/24/solid"
import { motion } from "framer-motion"

const features = [
  {
    title: "Trustworthy",
    icon: <ShieldCheckIcon className="h-12 w-12 text-white drop-shadow-[0_0_16px_rgba(34,211,238,0.7)]" />,
    desc: "Every voucher is uniquely verified on the blockchain — no fakes, no duplicates, no fraud.",
  },
  {
    title: "Transparent",
    icon: <EyeIcon className="h-12 w-12 text-white drop-shadow-[0_0_16px_rgba(34,211,238,0.7)]" />,
    desc: "All voucher activities are traceable, helping reduce disputes and build confidence for both buyers and sellers.",
  },
  { 
    title: "Peer-to-Peer Trading",
    icon: <ArrowsRightLeftIcon className="h-12 w-12 text-white drop-shadow-[0_0_16px_rgba(34,211,238,0.7)]" />,
    desc: "Buy and sell vouchers directly with other users, without middlemen — faster, cheaper, more efficient.",
  },
  {
    title: "Smart Automation",
    icon: <BoltIcon className="h-12 w-12 text-white drop-shadow-[0_0_16px_rgba(34,211,238,0.7)]" />,
    desc: "Smart contracts handle voucher rules automatically — usage limits, expiry dates, or product restrictions — with zero hassle.",
  },
  {
    title: "Real-World Usability",
    icon: <GlobeAltIcon className="h-12 w-12 text-white drop-shadow-[0_0_16px_rgba(168,85,247,0.7)]" />,
    desc: "Use your vouchers at physical stores, restaurants, and service providers — where publishers apply vouchers directly through our platform.",
  },
  {
    title: "Insight-Driven",
    icon: <ChartBarIcon className="h-12 w-12 text-white drop-shadow-[0_0_16px_rgba(59,130,246,0.7)]" />,
    desc: "Get smarter with how vouchers are used — whether you're a buyer, seller, or publisher.",
  },
]

export default function AboutSection() {
  return (
    <div className="relative bg-slate-900/90 rounded-3xl px-8 py-8 mb-6 shadow-2xl border-4 border-cyan-400/40 w-full max-w-7xl mx-auto
      before:content-[''] before:absolute before:inset-0 before:rounded-3xl before:border-8 before:border-cyan-400/30 before:blur-lg before:opacity-60 before:pointer-events-none
    ">
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-8 drop-shadow-lg text-center animate-pulse">
        About VoSo
      </h1>
      <span className="block text-2xl font-bold text-cyan-300 mb-10 text-center">
        VoSo is a decentralized voucher marketplace built on <span className="text-purple-400">Solana</span>, designed to make voucher trading easier, safer, and smarter.
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col items-center bg-gradient-to-br from-slate-800/90 via-slate-900/80 to-slate-800/90 rounded-3xl p-8 shadow-2xl border-2 border-cyan-400/30 transition-all duration-300 relative overflow-hidden"
            style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.25)" }}
            whileHover={{ scale: 1.05, y: -8, boxShadow: "0 8px 32px 0 rgba(34,211,238,0.35)" }}
            transition={{ type: "spring", stiffness: 800, damping: 50, duration: 0.1 }}
          >
            <div className="mb-5">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-400 to-purple-500 shadow-xl border-4 border-cyan-300/40 animate-pulse">
                {feature.icon}
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-cyan-200 mb-3 drop-shadow">{feature.title}</h3>
            <p className="text-slate-100 text-base text-center font-medium">{feature.desc}</p>
            <div className="absolute -z-10 inset-0 rounded-3xl blur-2xl opacity-30 bg-gradient-to-br from-cyan-400 via-purple-400 to-blue-400"></div>
          </motion.div>
        ))}
      </div>
      <span className="block text-center text-2xl font-extrabold text-purple-400 mt-10 animate-pulse drop-shadow-lg">
        Join VoSo and experience the future of voucher trading!
      </span>
    </div>
  )
}