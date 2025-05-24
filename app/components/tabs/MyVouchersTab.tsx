import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

interface MyVouchersTabProps {
  isPublisher: boolean
  setIsPublisher: (value: boolean) => void
}

export function MyVouchersTab({ isPublisher, setIsPublisher }: MyVouchersTabProps) {
  const router = useRouter()
  const [visibleVouchers, setVisibleVouchers] = useState(2)
  const totalVouchers = 6

  const handleShowMore = () => {
    setVisibleVouchers(prev => Math.min(prev + 2, totalVouchers))
  }

  return (
    <motion.div variants={fadeIn} transition={{ delay: 0.15 }}>
          <Card className="mt-4 rounded-2xl shadow-md border border-purple-200/60 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300">
            <CardContent className="p-8 space-y-6">
              <h3 className="text-2xl font-extrabold flex items-center gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow">
                <CheckCircle className="w-6 h-6 text-green-400" /> Your Vouchers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2].map((v) => (
                  <Card key={v} className="rounded-xl shadow border border-purple-100/60 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-50/80">
                    <CardContent className="p-4 flex flex-col gap-1">
                      <span className="font-medium text-purple-800">Voucher #{v}</span>
                      <span className="text-xs text-purple-500">Expires: 2025-12-31</span>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline" className="rounded-lg border-purple-200 text-purple-700 bg-white/70 hover:bg-purple-50">
                          Show QR
                        </Button>
                        <Button size="sm" className="rounded-lg bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-white border-none hover:brightness-110">
                          Redeem
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button onClick={() => setIsPublisher(true)} className="w-full sm:w-auto rounded-xl shadow bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-white font-semibold hover:brightness-110 transition mt-4">
                Become a Publisher
              </Button>
            </CardContent>
          </Card>
        </motion.div>
  )
}