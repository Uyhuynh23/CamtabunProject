import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift } from "lucide-react"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

interface PublisherTabProps {
  isVerified: boolean
  setIsVerified: (value: boolean) => void
}

export function PublisherTab({ isVerified, setIsVerified }: PublisherTabProps) {

  const router = useRouter();

  return (
    <motion.div variants={fadeIn} transition={{ delay: 0.2 }}>
      <Card className="mt-4 rounded-2xl shadow-md border border-purple-200/60 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300">
        <CardContent className="p-8 space-y-6">
          <h3 className="text-2xl font-extrabold flex items-center gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow">
            <Gift className="w-6 h-6 text-purple-500" /> Publisher Dashboard
          </h3>

          {!isVerified ? (
            <div className="space-y-4 text-center">
              <p className="text-sm text-purple-700">
                Verify your identity to issue vouchers.
              </p>
              <Button onClick={() => setIsVerified(true)} className="rounded-xl shadow bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-white font-semibold hover:brightness-110 transition">
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
                <Card className="rounded-xl bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100 border border-purple-100/60">
                  <CardContent className="p-4 text-center">
                    <span className="text-lg font-bold text-purple-700">120</span>
                    <div className="text-xs text-purple-500">Total Issued</div>
                  </CardContent>
                </Card>
                <Card className="rounded-xl bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 border border-purple-100/60">
                  <CardContent className="p-4 text-center">
                    <span className="text-lg font-bold text-pink-500">75</span>
                    <div className="text-xs text-purple-500">Total Redeemed</div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">

                <Label className="font-medium text-purple-700">Create Voucher</Label>
                <div className="flex gap-4">
                  <Button
                    className="flex-1 rounded-xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white font-semibold hover:brightness-110 transition"
                    onClick={() => router.push("/pages/nfts")}
                  >
                    Create NFT Voucher
                  </Button>
                  <Button
                    className="flex-1 rounded-xl bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white font-semibold hover:brightness-110 transition"
                    onClick={() => router.push("/pages/cnfts")}
                  >
                    Create cNFT Voucher
                  </Button>
                </div>

              </div>

              <div className="space-y-2">
                <Label htmlFor="redeem" className="font-medium text-purple-700">Redeem Voucher</Label>
                <input id="redeem" placeholder="Voucher code or QR data" className="rounded-xl bg-white/70 text-purple-700 border-purple-200 px-3 py-2 w-full" />
                <Button className="rounded-xl mt-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-white font-semibold hover:brightness-110 transition">Redeem</Button>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}