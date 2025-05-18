import HeroSection from "@/app/components/HeroSection"

export default function AboutSection() {
  return (
    <div className="relative bg-slate-900/90 rounded-3xl px-8 py-8 mb-6 shadow-2xl border-4 border-cyan-400/40
      w-full max-w-7xl mx-auto
      before:content-[''] before:absolute before:inset-0 before:rounded-3xl before:border-8 before:border-cyan-400/30 before:blur-lg before:opacity-60 before:pointer-events-none
      ">
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-4 drop-shadow-lg text-center animate-pulse">
        About VoSo
      </h1>
      <p className="text-slate-100 text-lg space-y-2 font-medium">
        <span className="block text-2xl font-bold text-cyan-300 mb-4 text-center">
          VoSo is a decentralized voucher marketplace built on <span className="text-purple-400">Solana</span>, designed to make voucher trading easier, safer, and smarter.
        </span>
        <ul className="list-disc pl-8 space-y-2 mb-4 text-base">
          <li>
            <span className="font-semibold text-cyan-400">🔐 Trustworthy:</span> Every voucher is uniquely verified on the blockchain — no fakes, no duplicates, no fraud.
          </li>
          <li>
            <span className="font-semibold text-cyan-400">🔄 Transparent:</span> All voucher activities are traceable, helping reduce disputes and build confidence for both buyers and sellers.
          </li>
          <li>
            <span className="font-semibold text-cyan-400">💸 Peer-to-Peer Trading:</span> Buy and sell vouchers directly with other users, without middlemen — faster, cheaper, more efficient.
          </li>
          <li>
            <span className="font-semibold text-cyan-400">⛓️ Smart Automation:</span> Smart contracts handle voucher rules automatically — usage limits, expiry dates, or product restrictions — with zero hassle.
          </li>
          <li>
            <span className="font-semibold text-cyan-400">🌐 Real-World Usability:</span> Use your vouchers at physical stores, restaurants, and service providers — where publishers apply vouchers directly through our platform.
          </li>
          <li>
            <span className="font-semibold text-cyan-400">📊 Insight-Driven:</span> Get smarter with how vouchers are used — whether you're a buyer, seller, or publisher.
          </li>
        </ul>
        <span className="block text-center text-2xl font-extrabold text-purple-400 mt-6 animate-pulse drop-shadow-lg">
          Join VoSo and experience the future of voucher trading!
        </span>
      </p>
    </div>
  )
}