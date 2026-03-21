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
    if (product.stock === 0) return

    setIsAdding(true)
    addToCart(product)

    setTimeout(() => {
      setIsAdding(false)
    }, 600)
  }

  const isImagePath = product.image.startsWith('/')

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="relative h-48 bg-white flex items-center justify-center p-4">
        {product.rating >= 4.7 && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-xs px-2 py-1 rounded font-semibold">
            Best Seller
          </div>
        )}

        {isImagePath ? (
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[140px] w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center text-7xl transition-transform duration-300 hover:scale-105">
            {product.image}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 leading-snug">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500 mb-2">
          Image for reference. Actual product may vary slightly.
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {product.category}
          </span>

          {product.stock === 0 ? (
            <span className="text-xs text-red-500 font-medium">Unavailable</span>
          ) : product.stock !== undefined && product.stock < 20 ? (
            <span className="text-xs text-orange-500 font-medium">Low Stock</span>
          ) : (
            <span className="text-xs text-green-600 font-medium">Fresh</span>
          )}
        </div>

        {product.stock === 0 && (
          <div className="text-sm text-red-600 mb-3 font-medium">
            Out of stock
          </div>
        )}

        {product.stock !== undefined && product.stock > 0 && product.stock < 20 && (
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
            disabled={isAdding || product.stock === 0}
            className={`${
              product.stock === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : isAdding
                ? 'bg-green-500'
                : 'bg-primary hover:bg-secondary'
            } text-white px-4 py-2 rounded-lg transition-all text-sm font-semibold shadow-md hover:shadow-lg whitespace-nowrap`}
          >
            {product.stock === 0 ? 'Out of Stock' : isAdding ? 'Added ✓' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}