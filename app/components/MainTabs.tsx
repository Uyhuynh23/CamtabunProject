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
      <TabsList className="grid w-full grid-cols-3 rounded-2xl bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 shadow-inner mb-2 border border-purple-200/60">
        <TabsTrigger
          value="marketplace"
          className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:via-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white text-purple-700 font-semibold transition"
        >
          Marketplace
        </TabsTrigger>
        <TabsTrigger
          value="myVouchers"
          className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:via-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white text-purple-700 font-semibold transition"
        >
          My Vouchers
        </TabsTrigger>
        <TabsTrigger
          value="publisher"
          disabled={!isPublisher}
          className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:via-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white text-purple-700 font-semibold transition"
        >
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