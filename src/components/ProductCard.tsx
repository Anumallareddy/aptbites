'use client'

import { Product } from '@/types'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    addToCart(product)

    setTimeout(() => {
      setIsAdding(false)
    }, 600)
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-7xl transition-transform duration-300 hover:scale-105">
        {product.image}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 leading-snug">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>
          <div className="flex items-center">
            <span className="text-yellow-500">⭐</span>
            <span className="text-sm text-gray-600 ml-1 font-semibold">{product.rating}</span>
          </div>
        </div>

        {product.stock !== undefined && product.stock < 20 && (
          <div className="text-xs text-red-600 mb-3 font-medium">
            Only {product.stock} left in stock
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <span className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`${
              isAdding ? 'bg-green-500' : 'bg-primary hover:bg-secondary'
            } text-white px-4 py-2 rounded-lg transition-all text-sm font-semibold shadow-md hover:shadow-lg whitespace-nowrap`}
          >
            {isAdding ? 'Added ✓' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}