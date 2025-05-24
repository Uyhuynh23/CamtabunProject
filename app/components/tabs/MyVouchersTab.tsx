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
          <Card className="mt-4 rounded-2xl shadow-md border border-slate-800 bg-slate-900/80">
            <CardContent className="p-8 space-y-6">
              <h3 className="text-2xl font-semibold flex items-center gap-2 text-white">
                <CheckCircle className="w-6 h-6 text-green-500" /> Your Vouchers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2].map((v) => (
                  <Card key={v} className="rounded-xl shadow border border-slate-800 bg-gradient-to-br from-slate-800/80 to-blue-900/80">
                    <CardContent className="p-4 flex flex-col gap-1">
                      <span className="font-medium text-white">Voucher #{v}</span>
                      <span className="text-xs text-slate-400">Expires: 2025-12-31</span>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline" className="rounded-lg">Show QR</Button>
                        <Button size="sm" className="rounded-lg">Redeem</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button onClick={() => setIsPublisher(true)} className="w-full sm:w-auto rounded-xl shadow hover:scale-105 transition mt-4">
                Become a Publisher
              </Button>
            </CardContent>
          </Card>
        </motion.div>
  )
}