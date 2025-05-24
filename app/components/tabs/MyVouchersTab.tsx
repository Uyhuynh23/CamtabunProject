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

interface MyVouchersTabProps {
  currentUser: { email: string; displayName: string; isPublisher: boolean }
}

export function MyVouchersTab({ currentUser }: MyVouchersTabProps) {
  const router = useRouter()
  // Lấy các voucher mà user hiện tại sở hữu
  const myVouchers = marketplaceVouchers.filter(v =>
    v.owners?.some(o => o.username === currentUser.email)
  )

  return (
    <motion.div variants={fadeIn} transition={{ delay: 0.15 }}>
      <Card className="mt-4 rounded-2xl shadow-md border border-purple-200/60 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300">
        <CardContent className="p-8 space-y-6">
          <h3 className="text-2xl font-extrabold flex items-center gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow">
            <CheckCircle className="w-6 h-6 text-green-400" /> Your Vouchers
          </h3>
          {myVouchers.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <Gift className="mx-auto w-12 h-12 text-purple-300 mb-2" />
              You don't own any vouchers yet.
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