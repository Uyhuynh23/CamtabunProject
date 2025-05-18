import React from "react"

export default function HeroSection() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-blue-500/10 blur-2xl opacity-80" />
      </div>
      <h1 className="relative z-10 text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
        Welcome to VoSo
      </h1>
      <p className="relative z-10 mt-6 text-xl md:text-2xl text-slate-200 font-medium max-w-2xl mx-auto drop-shadow">
        The decentralized voucher marketplace on <span className="text-purple-400 font-bold">Solana</span>.<br />
        Trade, redeem, and discover vouchers with trust and transparency.
      </p>
      <div className="relative z-10 mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="#"
          className="px-8 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition"
        >
          Get Started
        </a>
        <a
          href="#about"
          className="px-8 py-3 rounded-2xl bg-slate-800/80 text-cyan-200 font-semibold text-lg border border-cyan-400/40 hover:bg-slate-700 transition"
        >
          Learn More
        </a>
      </div>
    </section>
  )
}