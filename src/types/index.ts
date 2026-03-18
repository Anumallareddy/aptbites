export interface Product {
  id: number
  name: string
  price: number
  category: 'Snacks' | 'Beverages' | 'Household'
  image: string
  rating: number
  description?: string
  stock?: number
}

export interface CartItem extends Product {
  quantity: number
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