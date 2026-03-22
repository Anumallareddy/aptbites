export interface Product {
  id: number
  name: string
  price: number
  category: 'Snacks' | 'Beverages' | 'Essentials'
  image: string
  rating: number
  description?: string
  stock?: number
}

export interface CartItem {
  id: number
  quantity: number
  name: string
  price: number
  image: string
  category?: 'Snacks' | 'Beverages' | 'Essentials'
}

export interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  cartCount: number
  cartTotal: number
}