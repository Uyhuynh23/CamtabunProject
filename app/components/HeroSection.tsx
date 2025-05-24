import React from "react"

export default function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="relative w-full px-0 py-12 md:py-20 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Nền kéo dài toàn màn hình với gradient xanh-tím-hồng */}
      <div className="fixed inset-0 -z-10 w-screen h-screen">
        <div className="w-full h-full bg-gradient-to-br from-blue-100 via-purple-200 to-pink-200" />
      </div>
      <div className="w-full max-w-7xl mx-auto px-6">
        <h1 className="relative z-10 text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
          Welcome to <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">VoSo</span>
        </h1>
        <p className="relative z-10 mt-6 text-xl md:text-2xl text-purple-700 font-semibold max-w-2xl mx-auto drop-shadow">
          The decentralized voucher marketplace on <span className="text-pink-600 font-bold">Solana</span>.<br />
          <span className="text-blue-700">Trade, redeem, and discover vouchers with trust and transparency.</span>
        </p>
        <div className="relative z-10 mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onGetStarted}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white font-bold text-lg shadow-lg hover:scale-105 transition"
          >
            Get Started
          </button>
          <a
            href="#about"
            onClick={e => {
              e.preventDefault();
              const aboutSection = document.getElementById("about");
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="px-8 py-3 rounded-2xl bg-white text-purple-600 font-semibold text-lg border border-pink-200 hover:bg-pink-50 transition shadow"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  )
}