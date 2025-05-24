import { ShieldCheckIcon, ArrowsRightLeftIcon, EyeIcon, BoltIcon, GlobeAltIcon, ChartBarIcon } from "@heroicons/react/24/solid"
import { motion } from "framer-motion"

const features = [
  {
    title: "Trustworthy",
    icon: <ShieldCheckIcon className="h-12 w-12 text-blue-500 drop-shadow-[0_0_16px_rgba(59,130,246,0.4)]" />,
    desc: "Every voucher is uniquely verified on the blockchain — no fakes, no duplicates, no fraud.",
  },
  {
    title: "Transparent",
    icon: <EyeIcon className="h-12 w-12 text-cyan-500 drop-shadow-[0_0_16px_rgba(34,211,238,0.4)]" />,
    desc: "All voucher activities are traceable, helping reduce disputes and build confidence for both buyers and sellers.",
  },
  { 
    title: "Peer-to-Peer Trading",
    icon: <ArrowsRightLeftIcon className="h-12 w-12 text-blue-400 drop-shadow-[0_0_16px_rgba(59,130,246,0.4)]" />,
    desc: "Buy and sell vouchers directly with other users, without middlemen — faster, cheaper, more efficient.",
  },
  {
    title: "Smart Automation",
    icon: <BoltIcon className="h-12 w-12 text-cyan-400 drop-shadow-[0_0_16px_rgba(34,211,238,0.4)]" />,
    desc: "Smart contracts handle voucher rules automatically — usage limits, expiry dates, or product restrictions — with zero hassle.",
  },
  {
    title: "Real-World Usability",
    icon: <GlobeAltIcon className="h-12 w-12 text-blue-500 drop-shadow-[0_0_16px_rgba(59,130,246,0.4)]" />,
    desc: "Use your vouchers at physical stores, restaurants, and service providers — where publishers apply vouchers directly through our platform.",
  },
  {
    title: "Insight-Driven",
    icon: <ChartBarIcon className="h-12 w-12 text-cyan-500 drop-shadow-[0_0_16px_rgba(34,211,238,0.4)]" />,
    desc: "Get smarter with how vouchers are used — whether you're a buyer, seller, or publisher.",
  },
]

export default function AboutSection() {
  return (
    <div
      id="about"
      className="relative bg-gradient-to-br from-blue-300 via-purple-200 to-pink-100 rounded-3xl px-8 py-8 mb-6 shadow-xl border-2 border-purple-200/60 w-full max-w-7xl mx-auto backdrop-blur"    >
      <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8 drop-shadow-lg text-center animate-pulse">
        About VoSo
      </h1>
      <span className="block text-2xl font-bold text-purple-700 mb-10 text-center">
        VoSo is a decentralized voucher marketplace built on <span className="text-pink-500">Solana</span>, designed to make voucher trading easier, safer, and smarter.
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col items-center bg-gradient-to-br from-blue-200 via-purpple-350 to-pink-300 rounded-3xl p-8 shadow border border-purple-100/40 transition-all duration-300 relative overflow-hidden"
            style={{ boxShadow: "0 2px 12px 0 rgba(168,85,247,0.06)" }}
            whileHover={{ scale: 1.04, y: -6, boxShadow: "0 6px 20px 0 rgba(168,85,247,0.10)" }}
            transition={{ type: "spring", stiffness: 700, damping: 40, duration: 0.1 }}
          >
            <div className="mb-5">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-blue-200 via-purple-100 to-pink-100 shadow border-2 border-purple-100/30">
                {feature.icon}
              </div>
            </div>
            <h3 className="text-2xl font-extrabold text-purple-700 mb-3 drop-shadow">{feature.title}</h3>
            <p className="text-gray-700 text-base text-center font-medium">{feature.desc}</p>
            <div className="absolute -z-10 inset-0 rounded-3xl blur-lg opacity-10 bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100"></div>
          </motion.div>
        ))}
      </div>
      <span className="block text-center text-2xl font-extrabold text-pink-500 mt-10 animate-pulse drop-shadow-lg">
        Join VoSo and experience the future of voucher trading!
      </span>
    </div>
  )
}