export interface Voucher {
  id: number
  name: string
  description: string
  discount: number
  expiryDate: string
  price: number
  type: 'discount' | 'gift' | 'special'
  status: 'available' | 'expired'
}