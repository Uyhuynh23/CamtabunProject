import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { marketplaceVouchers } from "@/app/data/mockVouchers"
import { useState, useEffect } from "react"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const ITEMS_PER_PAGE = 6


export function MarketplaceTab() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const [paginatedVouchers, setPaginatedVouchers] = useState(marketplaceVouchers)
  
  const totalPages = Math.ceil(marketplaceVouchers.length / ITEMS_PER_PAGE)

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    setPaginatedVouchers(marketplaceVouchers.slice(startIndex, endIndex))
  }, [currentPage])

  // First, modify the transition variants
  const pageTransition = {
    enter: (direction: number) => ({
      x: direction > 0 ? '50%' : '-50%', // Reduced distance to travel
      opacity: 0.5, // Start with some visibility
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '50%' : '-50%', // Reduced distance to travel
      opacity: 0,
      scale: 0.98
    })
  }

  const voucherTransition = {
    enter: (direction: number) => ({
      x: direction > 0 ? '50%' : '-50%',
      opacity: 0.5,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '50%' : '-50%',
      opacity: 0,
      scale: 0.98
    })
  }

  const [direction, setDirection] = useState(0)

  const handlePageChange = (pageNumber: number) => {
    const newDirection = pageNumber > currentPage ? 1 : -1
    setDirection(newDirection)
    setCurrentPage(pageNumber)
  }
  
  return (
    <div className="mt-4">
      <Card className="rounded-2xl shadow-md border border-slate-800 bg-slate-900/80">
        <CardContent className="p-8">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-white">
            <Gift className="w-6 h-6 text-primary" /> Available Vouchers
          </h3>
          
          <div className="relative" style={{ minHeight: '500px' }}> {/* Add container with fixed height */}
            <AnimatePresence mode="sync" custom={direction}>
              <motion.div
                key={currentPage}
                custom={direction}
                variants={pageTransition}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 500, damping: 30 },
                  opacity: { duration: 0.15 },
                  scale: { duration: 0.15 }
                }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 absolute top-0 left-0 w-full" /* Add absolute positioning */
              >
                {paginatedVouchers.map((voucher, index) => (
                  <motion.div
                    key={voucher.id}
                    custom={direction}
                    variants={voucherTransition}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 500, damping: 30 },
                      opacity: { duration: 0.15 },
                      scale: { duration: 0.15 },
                      delay: index * 0.01 // Reduced delay between items
                    }}
                  >
                    <Card className="rounded-xl shadow hover:shadow-lg transition border border-slate-800 bg-gradient-to-br from-slate-800/80 to-blue-900/80">
                      <CardContent className="p-4 flex flex-col gap-2 items-center">
                        <Gift className="w-8 h-8 text-primary" />
                        <span className="font-medium text-white">{voucher.name}</span>
                        <span className="text-xs text-slate-400">Discount: {voucher.discount}%</span>
                        <span className="text-xs text-slate-400">Price: ${voucher.price}</span>
                        <Button size="sm" className="rounded-lg mt-2 w-full">Buy / Trade</Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Keep pagination outside the relative container */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-lg"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <span className="text-sm text-slate-400">
                Page {currentPage} of {totalPages}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-lg"
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