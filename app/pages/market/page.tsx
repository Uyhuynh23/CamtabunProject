'use client'

import { useState } from "react"
import { ConnectWalletButton } from "@/components/ui/murphy/connect-wallet-button"
import { WalletProvider } from "@/components/providers/wallet-provider"
import { Wallet } from "lucide-react"

export default function MarketPage() {
  const [search, setSearch] = useState("")

  const DUMMY_VOUCHERS = [
    { id: 1, title: "Discount 10%", image: "/images/voucher1.png", publisher: "ShopA" },
    { id: 2, title: "Free Shipping", image: "/images/voucher2.png", publisher: "ShopB" },
    { id: 3, title: "Buy 1 Get 1", image: "/images/voucher3.png", publisher: "ShopC" },
    { id: 4, title: "Summer Sale 20% Off", image: "/images/voucher4.png", publisher: "ShopA" },
    { id: 5, title: "Exclusive Member Deal", image: "/images/voucher5.png", publisher: "ShopD" },
    { id: 6, title: "Flash Sale 50% Off", image: "/images/voucher6.png", publisher: "ShopE" },
    { id: 7, title: "Holiday Special", image: "/images/voucher7.png", publisher: "ShopF" },
    { id: 8, title: "Weekend Saver", image: "/images/voucher8.png", publisher: "ShopB" },
    { id: 9, title: "Student Discount", image: "/images/voucher9.png", publisher: "ShopG" },
    { id: 10, title: "Birthday Bonus", image: "/images/voucher10.png", publisher: "ShopH" },
  ]

  const filtered = DUMMY_VOUCHERS.filter(v =>
    v.title.toLowerCase().includes(search.toLowerCase())
  )

  // Dummy logout handler, replace with your real logic
  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.href = "/pages/login"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-black p-0">
      <div className="max-w-3xl mx-auto p-6">
        <div className="flex justify-end gap-4 mb-6">
          <WalletProvider>
            <ConnectWalletButton>
              <Wallet className="size-4 mr-2" />
              Connect Wallet
            </ConnectWalletButton>
          </WalletProvider>
          <button
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition font-semibold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Marketplace</h1>
        <input
          className="w-full p-2 rounded mb-6 border border-slate-700 bg-slate-900 text-white"
          placeholder="Search vouchers..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-slate-400">No vouchers found.</div>
          )}
          {filtered.map(voucher => (
            <div key={voucher.id} className="bg-slate-800 rounded-xl shadow p-4 flex flex-col items-center">
              <img
                src={voucher.image}
                alt={voucher.title}
                className="w-28 h-28 object-cover mb-3 rounded"
              />
              <div className="font-semibold text-white">{voucher.title}</div>
              <div className="text-sm text-slate-300 mb-2">Publisher: {voucher.publisher}</div>
              <button className="mt-1 px-4 py-2 rounded bg-cyan-500 text-white font-bold hover:bg-cyan-600 transition">
                Buy / Trade
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}