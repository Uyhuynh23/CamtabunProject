import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { marketplaceVouchers } from "@/app/data/mockVouchers"
import { useState, useEffect } from "react"

const ITEMS_PER_PAGE = 6


const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const pageTransition = {
  enter: { opacity: 0, scale: 0.98 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 }
}

const categories = ["All", ...Array.from(new Set(marketplaceVouchers.map(v => v.category)))];

export function MarketplaceTab() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredVouchers, setFilteredVouchers] = useState(marketplaceVouchers);
  const [paginatedVouchers, setPaginatedVouchers] = useState(marketplaceVouchers);
  const [direction, setDirection] = useState(0);
  const [openVoucherId, setOpenVoucherId] = useState<number | null>(null);

  // Category filter logic
  const handleCategoryToggle = (cat: string) => {
    if (cat === "All") {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(prev =>
        prev.includes(cat)
          ? prev.filter(c => c !== cat)
          : [...prev, cat]
      );
    }
  };

  // Filter vouchers by search and category
  useEffect(() => {
    const filtered = marketplaceVouchers.filter(v =>
      (selectedCategories.length === 0 || selectedCategories.includes(v.category)) &&
      (v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.description.toLowerCase().includes(search.toLowerCase()))
    );
    setFilteredVouchers(filtered);
    setCurrentPage(1); // Reset to first page on filter/search change
  }, [search, selectedCategories]);

  // Pagination logic
  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setPaginatedVouchers(filteredVouchers.slice(startIndex, endIndex));
  }, [currentPage, filteredVouchers]);

  const totalPages = Math.ceil(filteredVouchers.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    const newDirection = pageNumber > currentPage ? 1 : -1
    setDirection(newDirection)
    setCurrentPage(pageNumber)
  }

  return (
    <motion.div variants={fadeIn} transition={{ delay: 0.15 }}>
    <div className="mt-4 max-w-[1500px] mx-auto">
      {/* Search Bar Centered */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search vouchers..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-2xl px-6 py-3 rounded-2xl border border-purple-300 shadow focus:outline-none focus:ring-2 focus:ring-purple-400 text-center bg-white/90 placeholder:text-purple-400"
        />
      </div>
      {/* Category Filter Centered Below Search */}
      <div className="flex justify-center mb-6">
        <div className="flex gap-2 flex-wrap justify-center">
          {categories.map(cat => (
            <label
              key={cat}
              className={`flex items-center gap-2 px-3 py-2 rounded-full font-semibold border cursor-pointer transition
                ${cat === "All" && selectedCategories.length === 0
                  ? "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white border-none"
                  : cat !== "All" && selectedCategories.includes(cat)
                    ? "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white border-none"
                    : "bg-white border-purple-200 text-purple-700 hover:bg-purple-50"}`}
            >
              <input
                type="checkbox"
                checked={cat === "All" ? selectedCategories.length === 0 : selectedCategories.includes(cat)}
                onChange={() => handleCategoryToggle(cat)}
                className="form-checkbox accent-purple-500"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>
      <Card className="rounded-2xl shadow-md border border-purple-200/60 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300">
        <CardContent className="p-8">
          
          {/* Title */}
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
                {paginatedVouchers.length === 0 ? (
                  <div className="col-span-full text-center text-gray-500 py-12">
                    <Gift className="mx-auto w-12 h-12 text-purple-300 mb-2" />
                    No vouchers found matching your search or filter.
                  </div>
                ) : paginatedVouchers.map((voucher, index) => (
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
                          <img
                            src="/images/default.png"
                            alt="Default Voucher"
                            className="absolute inset-0 w-full h-full object-cover"/>
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
    </motion.div>
  )
}