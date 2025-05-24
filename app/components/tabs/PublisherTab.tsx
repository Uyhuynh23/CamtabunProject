import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift } from "lucide-react"
import { Label } from "@/components/ui/label"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

interface PublisherTabProps {
  isVerified: boolean
  setIsVerified: (value: boolean) => void
}

export function PublisherTab({ isVerified, setIsVerified }: PublisherTabProps) {
  return (
     <motion.div variants={fadeIn} transition={{ delay: 0.2 }}>
          <Card className="mt-4 rounded-2xl shadow-md border border-slate-800 bg-slate-900/80">
            <CardContent className="p-8 space-y-6">
              <h3 className="text-2xl font-semibold flex items-center gap-2 text-white">
                <Gift className="w-6 h-6 text-primary" /> Publisher Dashboard
              </h3>

              {!isVerified ? (
                <div className="space-y-4 text-center">
                  <p className="text-sm text-slate-400">
                    Verify your identity to issue vouchers.
                  </p>
                  <Button onClick={() => setIsVerified(true)} className="rounded-xl shadow hover:scale-105 transition">
                    Verify via Smart Contract (future)
                  </Button>
                </div>
              ) : (
                <motion.div
                  className="space-y-8"
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  transition={{ delay: 0.25 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card className="rounded-xl bg-gradient-to-br from-blue-900/80 to-slate-900/80 border border-slate-800">
                      <CardContent className="p-4 text-center">
                        <span className="text-lg font-bold text-primary">120</span>
                        <div className="text-xs text-slate-400">Total Issued</div>
                      </CardContent>
                    </Card>
                    <Card className="rounded-xl bg-gradient-to-br from-green-900/80 to-blue-900/80 border border-slate-800">
                      <CardContent className="p-4 text-center">
                        <span className="text-lg font-bold text-green-400">75</span>
                        <div className="text-xs text-slate-400">Total Redeemed</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newVoucher" className="font-medium text-white">Create New Voucher</Label>
                    <input id="newVoucher" placeholder="Voucher name or reward" className="rounded-xl bg-slate-800/80 text-white border-slate-700 px-3 py-2 w-full" />
                    <Button className="rounded-xl mt-2">Create</Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="redeem" className="font-medium text-white">Redeem Voucher</Label>
                    <input id="redeem" placeholder="Voucher code or QR data" className="rounded-xl bg-slate-800/80 text-white border-slate-700 px-3 py-2 w-full" />
                    <Button className="rounded-xl mt-2">Redeem</Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
  )
}