import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, CheckCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { useState } from "react"

interface MainTabsProps {
  isPublisher: boolean
  isVerified: boolean
  setIsVerified: (v: boolean) => void
  setIsPublisher: (v: boolean) => void
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function MainTabs({
  isPublisher,
  isVerified,
  setIsVerified,
  setIsPublisher,
}: MainTabsProps) {
  const [tab, setTab] = useState("marketplace")

  return (
    <Tabs defaultValue="marketplace" value={tab} onValueChange={setTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3 rounded-2xl bg-slate-800/70 shadow-inner mb-2">
        <TabsTrigger value="marketplace" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white text-slate-200 transition">Marketplace</TabsTrigger>
        <TabsTrigger value="myVouchers" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white text-slate-200 transition">My Vouchers</TabsTrigger>
        <TabsTrigger value="publisher" disabled={!isPublisher} className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white text-slate-200 transition">Publisher Panel</TabsTrigger>
      </TabsList>

      {/* Marketplace Tab */}
      <TabsContent value="marketplace">
        <motion.div variants={fadeIn} transition={{ delay: 0.1 }}>
          <Card className="mt-4 rounded-2xl shadow-md border border-slate-800 bg-slate-900/80">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-white">
                <Gift className="w-6 h-6 text-primary" /> Available Vouchers
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((v) => (
                  <Card key={v} className="rounded-xl shadow hover:shadow-lg transition border border-slate-800 bg-gradient-to-br from-slate-800/80 to-blue-900/80">
                    <CardContent className="p-4 flex flex-col gap-2 items-center">
                      <Gift className="w-8 h-8 text-primary" />
                      <span className="font-medium text-white">Voucher #{v}</span>
                      <span className="text-xs text-slate-400">Discount: 10%</span>
                      <Button size="sm" className="rounded-lg mt-2 w-full">Buy / Trade</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </TabsContent>

      {/* My Vouchers Tab */}
      <TabsContent value="myVouchers">
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
      </TabsContent>

      {/* Publisher Tab */}
      <TabsContent value="publisher">
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
      </TabsContent>
    </Tabs>
  )
}