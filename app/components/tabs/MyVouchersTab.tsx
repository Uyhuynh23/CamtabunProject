import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, QrCode, Gift } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { marketplaceVouchers } from "@/app/data/mockVouchers"
import { mockUsers } from "@/app/data/mockUsers"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const categories = ["All", ...Array.from(new Set(marketplaceVouchers.map(v => v.category)))];

interface MyVouchersTabProps {
  currentUser: { email: string; displayName: string; isPublisher: boolean }
}

export function MyVouchersTab({ currentUser }: MyVouchersTabProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Hàm xử lý chọn category
  const handleCategoryToggle = (cat: string) => {
    if (cat === "All") {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(prev =>
        prev.includes(cat)
          ? prev.filter(c => c !== cat)
          : [...prev, cat]
      );
    }
  };

  // Danh sách voucher gốc của user
  const ownedVouchers = marketplaceVouchers.filter(v =>
    v.owners?.some(o => o.username === currentUser.email)
  );

  // Danh sách voucher sau khi filter/search
  const myVouchers = ownedVouchers.filter(v =>
    (selectedCategories.length === 0 || selectedCategories.includes(v.category)) &&
    (v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <motion.div variants={fadeIn} transition={{ delay: 0.15 }}>
      {/* Search Bar Centered */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search vouchers..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-2xl px-6 py-3 rounded-2xl border border-purple-300 shadow focus:outline-none focus:ring-2 focus:ring-purple-400 text-center bg-white/90 placeholder:text-purple-400"
          // ↑ max-w-2xl cho dài hơn, bg-white/90 để nổi bật hơn
        />
      </div>
      {/* Category Filter Centered Below Search */}
      <div className="flex justify-center mb-6">
        <div className="flex gap-2 flex-wrap justify-center">
          {categories.map(cat => (
            <label
              key={cat}
              className={`flex items-center gap-2 px-3 py-2 rounded-full font-semibold border cursor-pointer transition
                ${cat === "All" && selectedCategories.length === 0
                  ? "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white border-none"
                  : cat !== "All" && selectedCategories.includes(cat)
                    ? "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white border-none"
                    : "bg-white border-purple-200 text-purple-700 hover:bg-purple-50"}`}
            >
              <input
                type="checkbox"
                checked={cat === "All" ? selectedCategories.length === 0 : selectedCategories.includes(cat)}
                onChange={() => handleCategoryToggle(cat)}
                className="form-checkbox accent-purple-500"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>
      <Card className="mt-4 rounded-2xl shadow-md border border-purple-200/60 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300">
        <CardContent className="p-8 space-y-6">
          <h3 className="text-2xl font-extrabold flex items-center gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow">
            <CheckCircle className="w-6 h-6 text-green-400" /> Your Vouchers
          </h3>
          {ownedVouchers.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <Gift className="mx-auto w-12 h-12 text-purple-300 mb-2" />
              You don't own any vouchers yet.
            </div>
          ) : myVouchers.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <Gift className="mx-auto w-12 h-12 text-purple-300 mb-2" />
              No vouchers found matching your search or filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {myVouchers.map((voucher) => (
                <Card
                  key={voucher.id}
                  className="rounded-xl shadow border border-purple-100/60 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-50/80 hover:scale-[1.02] transition"
                >
                  <CardContent className="p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={voucher.image}
                        alt={voucher.name}
                        className="w-12 h-12 rounded-lg object-cover border border-purple-100"
                      />
                      <div>
                        <span className="font-semibold text-purple-800">{voucher.name}</span>
                        <div className="text-xs text-purple-500">Expires: {voucher.expiryDate}</div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-lg border-purple-200 text-purple-700 bg-white/70 hover:bg-purple-50 flex items-center gap-1"
                      >
                        <QrCode className="w-4 h-4" /> Show QR
                      </Button>
                      <Button
                        size="sm"
                        className="rounded-lg bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-white border-none hover:brightness-110 flex items-center gap-1"
                      >
                        Redeem
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}