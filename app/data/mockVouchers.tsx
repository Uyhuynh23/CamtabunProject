export const marketplaceVouchers = [
  {
    id: 1,
    name: "Pizza House",
    description: "Get amazing discounts on Italian pizzas",
    discount: 25,
    expiryDate: "2025-08-31",
    price: 50,
    type: "discount",
    status: "available",
    image: "/images/vouchers/pizza_house.jpg",
    location: "123 Lê Lợi, Quận 1, TP.HCM",
    terms: "Áp dụng cho hóa đơn từ 200k. Không áp dụng ngày lễ, tết.",
    usageLimit: 1,
    validDays: "Thứ 2 - Thứ 6",
    category: "Nhà hàng",
    contact: "028 1234 5678",
    highlight: "Áp dụng toàn menu, không áp dụng combo",
    merchant: "Pizza House",
    owners: [
      { username: "nguyenvana", displayName: "Nguyễn Văn A" },
      { username: "lethic", displayName: "Lê Thị C" }
    ],
    resaleList: [
      { username: "nguyenvana", displayName: "Nguyễn Văn A", price: 48, contact: "0909123456" }
    ]
  },
  {
    id: 2,
    name: "Café Mocha",
    description: "Perfect for coffee lovers at Café Mocha",
    discount: 15,
    expiryDate: "2025-12-31",
    price: 30,
    type: "discount",
    status: "available",
    image: "/images/vouchers/cafe_mocha.jpg",
    location: "45 Nguyễn Huệ, Quận 1, TP.HCM",
    terms: "Áp dụng cho tất cả đồ uống. Không áp dụng với chương trình khác.",
    usageLimit: 2,
    validDays: "Cả tuần",
    category: "Quán cà phê",
    contact: "028 2345 6789",
    highlight: "Tặng thêm 1 bánh cookie khi mua từ 2 ly",
    merchant: "Café Mocha",
    owners: [
      { username: "tranthib", displayName: "Trần Thị B" },
      { username: "phamvanh", displayName: "Phạm Văn H" }
    ],
    resaleList: [
      { username: "tranthib", displayName: "Trần Thị B", price: 28, contact: "0988123456" }
    ]
  },
  {
    id: 3,
    name: "Golden Buffet",
    description: "Exclusive discount for Golden Buffet's premium menu",
    discount: 40,
    expiryDate: "2025-09-30",
    price: 75,
    type: "discount",
    status: "available",
    image: "/images/vouchers/golden_buffet.jpg",
    location: "88 Trần Hưng Đạo, Quận 5, TP.HCM",
    terms: "Áp dụng cho buffet tối. Không áp dụng ngày lễ.",
    usageLimit: 1,
    validDays: "Thứ 2 - Chủ nhật",
    category: "Nhà hàng",
    contact: "028 3456 7890",
    highlight: "Không giới hạn số lượng món ăn",
    merchant: "Golden Buffet",
    owners: [
      { username: "nguyenvana", displayName: "Nguyễn Văn A" }
    ],
    resaleList: []
  },
  {
    id: 4,
    name: "Phở Lý Quốc Sư",
    description: "Special discount for traditional Pho during holidays",
    discount: 20,
    expiryDate: "2025-12-25",
    price: 45,
    type: "discount",
    status: "available",
    image: "/images/vouchers/pho_ly_quoc_su.jpg",
    location: "12 Lý Quốc Sư, Hoàn Kiếm, Hà Nội",
    terms: "Áp dụng cho tất cả các loại phở. Không áp dụng mang về.",
    usageLimit: 1,
    validDays: "Thứ 2 - Thứ 7",
    category: "Nhà hàng",
    contact: "024 1234 5678",
    highlight: "Tặng thêm quẩy khi dùng tại quán",
    merchant: "Phở Lý Quốc Sư",
    owners: [
      { username: "phamvanh", displayName: "Phạm Văn H" }
    ],
    resaleList: []
  },
  {
    id: 5,
    name: "Bún Chả Hà Nội",
    description: "Enjoy authentic Hanoi Bún Chả at a price",
    discount: 30,
    expiryDate: "2025-10-15",
    price: 40,
    type: "discount",
    status: "available",
    image: "/images/vouchers/bun_cha.jpg",
    location: "56 Hàng Mành, Hoàn Kiếm, Hà Nội",
    terms: "Áp dụng cho suất bún chả đặc biệt. Không áp dụng giao hàng.",
    usageLimit: 1,
    validDays: "Thứ 2 - Chủ nhật",
    category: "Nhà hàng",
    contact: "024 2345 6789",
    highlight: "Tặng thêm nem rán khi mua 2 suất",
    merchant: "Bún Chả Hà Nội",
    owners: [
      { username: "lethic", displayName: "Lê Thị C" }
    ],
    resaleList: [
      { username: "lethic", displayName: "Lê Thị C", price: 38, contact: "0912123456" }
    ]
  },
  {
    id: 6,
    name: "Gogi House",
    description: "Grill your favorite meats with a sizzling",
    discount: 35,
    expiryDate: "2025-11-30",
    price: 65,
    type: "discount",
    status: "available",
    image: "/images/vouchers/gogi_bbq.jpg",
    location: "Vincom Đồng Khởi, Quận 1, TP.HCM",
    terms: "Áp dụng cho buffet nướng. Không áp dụng với menu gọi món.",
    usageLimit: 1,
    validDays: "Thứ 2 - Thứ 6",
    category: "Nhà hàng",
    contact: "028 4567 8901",
    highlight: "Tặng thêm 1 phần salad Hàn Quốc",
    merchant: "Gogi House",
    owners: [
      { username: "nguyenvana", displayName: "Nguyễn Văn A" }
    ],
    resaleList: []
  },
  {
    id: 7,
    name: "Highlands Coffee",
    description: "Fresh Vietnamese coffee for early birds",
    discount: 10,
    expiryDate: "2025-06-30",
    price: 25,
    type: "discount",
    status: "available",
    image: "/images/vouchers/highlands.jpg",
    location: "Các chi nhánh Highlands Coffee toàn quốc",
    terms: "Áp dụng cho hóa đơn từ 50k. Không áp dụng với combo.",
    usageLimit: 3,
    validDays: "Cả tuần",
    category: "Quán cà phê",
    contact: "1900 1755",
    highlight: "Tặng thêm topping khi mua size lớn",
    merchant: "Highlands Coffee",
    owners: [
      { username: "phamvanh", displayName: "Phạm Văn H" }
    ],
    resaleList: []
  },
  {
    id: 8,
    name: "Kichi Kichi",
    description: "Enjoy unlimited hotpot at a discounted rate",
    discount: 20,
    expiryDate: "2025-12-01",
    price: 55,
    type: "discount",
    status: "available",
    image: "/images/vouchers/kichi_kichi.jpg",
    location: "Tầng 3, AEON Mall Tân Phú, TP.HCM",
    terms: "Áp dụng cho buffet lẩu băng chuyền. Không áp dụng ngày lễ.",
    usageLimit: 1,
    validDays: "Thứ 2 - Thứ 6",
    category: "Nhà hàng",
    contact: "028 5678 9012",
    highlight: "Không giới hạn nước lẩu và topping",
    merchant: "Kichi Kichi",
    owners: [
      { username: "lethic", displayName: "Lê Thị C" }
    ],
    resaleList: []
  },
  {
    id: 9,
    name: "Texas Chicken",
    description: "Crispy chicken combo for less",
    discount: 18,
    expiryDate: "2025-07-31",
    price: 35,
    type: "discount",
    status: "available",
    image: "/images/vouchers/texas_chicken.jpg",
    location: "BigC Miền Đông, Thủ Đức, TP.HCM",
    terms: "Áp dụng cho combo gà rán. Không áp dụng giao hàng.",
    usageLimit: 2,
    validDays: "Thứ 2 - Chủ nhật",
    category: "Thức ăn nhanh",
    contact: "028 6789 0123",
    highlight: "Tặng thêm khoai tây chiên size lớn",
    merchant: "Texas Chicken",
    owners: [
      { username: "nguyenvana", displayName: "Nguyễn Văn A" },
      { username: "tranthib", displayName: "Trần Thị B" }
    ],
    resaleList: [
      { username: "nguyenvana", displayName: "Nguyễn Văn A", price: 32, contact: "0909123456" },
      { username: "tranthib", displayName: "Trần Thị B", price: 30, contact: "0988123456" }
    ]
  },
  {
    id: 10,
    name: "Baskin Robbins",
    description: "Cool off with your favorite scoop",
    discount: 12,
    expiryDate: "2025-08-15",
    price: 20,
    type: "discount",
    status: "available",
    image: "/images/vouchers/baskin_robbins.jpg",
    location: "Parkson Hùng Vương, Quận 5, TP.HCM",
    terms: "Áp dụng cho tất cả các vị kem. Không áp dụng với chương trình khác.",
    usageLimit: 1,
    validDays: "Cả tuần",
    category: "Thức ăn nhanh",
    contact: "028 7890 1234",
    highlight: "Tặng thêm 1 viên kem khi mua từ 2 viên",
    merchant: "Baskin Robbins",
    owners: [
      { username: "phamvanh", displayName: "Phạm Văn H" }
    ],
    resaleList: []
  }
]
