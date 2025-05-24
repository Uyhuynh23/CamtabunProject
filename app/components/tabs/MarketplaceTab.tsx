import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, ChevronLeft, ChevronRight, Search } from "lucide-react" // Add Search icon
import { useRouter } from "next/navigation"
import { marketplaceVouchers } from "@/app/data/mockVouchers"
import { useState, useEffect } from "react"

const ITEMS_PER_PAGE = 6

const pageTransition = {
  enter: { opacity: 0, scale: 0.98 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 }
}

export function MarketplaceTab() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredVouchers, setFilteredVouchers] = useState(marketplaceVouchers)
  const [paginatedVouchers, setPaginatedVouchers] = useState(marketplaceVouchers)
  const [direction, setDirection] = useState(0)
  const [openVoucherId, setOpenVoucherId] = useState<number | null>(null)

  const totalPages = Math.ceil(marketplaceVouchers.length / ITEMS_PER_PAGE)

  useEffect(() => {
    const totalPages = Math.ceil(filteredVouchers.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    setPaginatedVouchers(marketplaceVouchers.slice(startIndex, endIndex))
  }, [currentPage])

  const handlePageChange = (pageNumber: number) => {
    const newDirection = pageNumber > currentPage ? 1 : -1
    setDirection(newDirection)
    setCurrentPage(pageNumber)
  }

  return (
      <div className="mt-4 max-w-[1500px] mx-auto">      <Card className="rounded-2xl shadow-md border border-purple-200/60 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300">
        <CardContent className="p-8">
          <h3 className="text-2xl font-extrabold mb-4 flex items-center gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow">
            <Gift className="w-10 h-6 text-purple-500" /> Available Vouchers
          </h3>
          <div className="relative w-full">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentPage}
                variants={pageTransition}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ opacity: { duration: 0.22 }, scale: { duration: 0.22 } }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full"
              >
                {paginatedVouchers.map((voucher, index) => (
                  <div key={voucher.id} className="w-full flex flex-col items-center">
                    {/* Card chỉ chứa hình ảnh hoặc icon */}
                    <Card
                      className="relative w-full min-h-[190px] bg-white/90 rounded-2xl shadow-lg border border-purple-100/60 overflow-hidden group transition hover:scale-[1.015] cursor-pointer"
                      onClick={() => router.push(`/voucher/${voucher.id}`)}
                    >
                      <div className="relative w-full h-[190px]">
                        {voucher.image ? (
                          <img
                            src={voucher.image}
                            alt={voucher.name}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <Gift className="w-16 h-16 text-purple-400 absolute inset-0 m-auto" />
                        )}
                      </div>
                    </Card>
                    {/* Text nằm dưới khung */}
                    <div className="mt-3 text-center w-full max-w-[550px]">
                      <div className="text-xl font-bold text-purple-700">{voucher.name}</div>
                      
                    </div>
                    {/* Details modal/drawer giữ nguyên */}
                    {openVoucherId === voucher.id && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setOpenVoucherId(null)}>
                        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
                          <button className="absolute top-2 right-2 text-gray-400 hover:text-purple-500" onClick={() => setOpenVoucherId(null)}>✕</button>
                          <h2 className="text-2xl font-bold text-purple-700 mb-2">{voucher.name}</h2>
                          <div className="mb-2 text-blue-700 font-semibold">Discount: {voucher.discount}%</div>
                          <div className="mb-2 text-pink-600 font-semibold">Price: ${voucher.price}</div>
                          <div className="mb-2 text-gray-500">ID: {voucher.id}</div>
                          {/* Thêm các thông tin chi tiết khác nếu có */}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-lg border-purple-200 text-purple-700 bg-white/70 hover:bg-purple-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-purple-700 font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-lg border-purple-200 text-purple-700 bg-white/70 hover:bg-purple-50"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}