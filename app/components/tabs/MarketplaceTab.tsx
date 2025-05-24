import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, ChevronLeft, ChevronRight } from "lucide-react"
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
  const [paginatedVouchers, setPaginatedVouchers] = useState(marketplaceVouchers)
  const [direction, setDirection] = useState(0)

  const totalPages = Math.ceil(marketplaceVouchers.length / ITEMS_PER_PAGE)

  useEffect(() => {
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
    <div className="mt-4 max-w-6xl mx-auto">
      <Card className="rounded-2xl shadow-md border border-purple-200/60 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300">
        <CardContent className="p-12">
          <h3 className="text-2xl font-extrabold mb-4 flex items-center gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow">
            <Gift className="w-6 h-6 text-purple-500" /> Available Vouchers
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
                  <div key={voucher.id} className="w-full">
                    <Card className="rounded-xl shadow hover:shadow-lg transition border border-purple-100/60 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-50/80 w-full">
                      <CardContent className="p-4 flex flex-col gap-2 items-center w-full">
                        <Gift className="w-8 h-8 text-purple-500" />
                        <span className="font-semibold text-purple-700">{voucher.name}</span>
                        <span className="text-xs text-blue-700">Discount: {voucher.discount}%</span>
                        <span className="text-xs text-pink-600">Price: ${voucher.price}</span>
                        <Button
                          size="sm"
                          className="rounded-lg mt-2 w-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-white font-semibold border-none hover:brightness-110 transition"
                        >
                          Buy / Trade
                        </Button>
                      </CardContent>
                    </Card>
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