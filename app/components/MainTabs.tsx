import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useState } from "react"
// Update the import path below to the correct relative path for MarketplaceTab
import { MarketplaceTab } from "../components/tabs/MarketplaceTab"
import { MyVouchersTab } from "../components/tabs/MyVouchersTab"
import { PublisherTab } from "../components/tabs/PublisherTab"

interface MainTabsProps {
  isPublisher: boolean
  isVerified: boolean
  setIsVerified: (v: boolean) => void
  setIsPublisher: (v: boolean) => void
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
        <TabsTrigger value="marketplace" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white text-slate-200 transition">
          Marketplace
        </TabsTrigger>
        <TabsTrigger value="myVouchers" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white text-slate-200 transition">
          My Vouchers
        </TabsTrigger>
        <TabsTrigger value="publisher" disabled={!isPublisher} className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white text-slate-200 transition">
          Publisher Panel
        </TabsTrigger>
      </TabsList>

      <TabsContent value="marketplace">
        <MarketplaceTab />
      </TabsContent>

      <TabsContent value="myVouchers">
        <MyVouchersTab isPublisher={isPublisher} setIsPublisher={setIsPublisher} />
      </TabsContent>

      <TabsContent value="publisher">
        <PublisherTab isVerified={isVerified} setIsVerified={setIsVerified} />
      </TabsContent>
    </Tabs>
  )
}