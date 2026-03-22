'use client'

import { Product } from '@/types'
import { useCart } from '@/context/CartContext'
import { useEffect, useState } from 'react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const isOutOfStock = product.stock === 0
  const isLowStock =
    product.stock !== undefined && product.stock > 0 && product.stock < 20
  const isImagePath = product.image?.startsWith('/')

  const handleAddToCart = () => {
    if (isOutOfStock) return

    addToCart(product)
    setAdded(true)
  }

  useEffect(() => {
    if (!added) return

    const timer = setTimeout(() => {
      setAdded(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [added])

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gray-50 p-5">
        {product.rating >= 4.7 && (
          <div className="absolute left-3 top-3 rounded-full bg-yellow-400 px-2.5 py-1 text-[11px] font-semibold text-gray-900">
            Best Seller
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute right-3 top-3 rounded-full bg-gray-900/80 px-2.5 py-1 text-[11px] font-medium text-white">
            Out of stock
          </div>
        )}

        {isImagePath ? (
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[150px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center text-7xl transition-transform duration-300 group-hover:scale-105">
            {product.image}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex-1">
          <h3 className="line-clamp-2 text-base font-semibold leading-snug text-gray-900">
            {product.name}
          </h3>

          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
              {product.category}
            </span>

            {isLowStock && (
              <span className="text-xs font-medium text-orange-600">
                Only {product.stock} left
              </span>
            )}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={added || isOutOfStock}
            className={`inline-flex min-w-[120px] items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 ${
              isOutOfStock
                ? 'cursor-not-allowed bg-gray-300'
                : added
                ? 'bg-green-600'
                : 'bg-primary hover:scale-[1.02] hover:bg-secondary active:scale-[0.98]'
            }`}
          >
            {isOutOfStock ? 'Unavailable' : added ? 'Added ✓' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}