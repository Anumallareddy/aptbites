'use client'

import { useEffect, useMemo, useState } from 'react'
import ProductCard from './ProductCard'
import { supabase } from '@/lib/supabase/client'
import { Product } from '@/types'

interface ProductGridProps {
  featured?: boolean
  category?: string
  searchQuery?: string
  sortBy?: string
  showHeader?: boolean
}

export default function ProductGrid({
  featured = false,
  category,
  searchQuery = '',
  sortBy = 'featured',
  showHeader = true,
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)

      const { data, error } = await supabase.from('products').select('*')

      if (error) {
        console.error('Error fetching products:', error)
        setProducts([])
        setLoading(false)
        return
      }

      setProducts(data || [])
      setLoading(false)
    }

    fetchProducts()
  }, [])

  const displayProducts = useMemo(() => {
    let filtered = [...products]

    if (featured) {
      filtered = filtered.filter((p) => p.rating >= 4.5)
    }

    if (category) {
      filtered = filtered.filter((p) => p.category === category)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          (p.category || '').toLowerCase().includes(query)
      )
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return filtered
  }, [products, featured, category, searchQuery, sortBy])

  const getTitle = () => {
    if (featured) return 'Featured Products'
    if (category) return category
    if (searchQuery) return 'Search Results'
    return 'Available Products'
  }

  const getSubtitle = () => {
    if (loading) return 'Loading products...'
    if (searchQuery) {
      return `${displayProducts.length} item${displayProducts.length !== 1 ? 's' : ''} found`
    }
    return `${displayProducts.length} item${displayProducts.length !== 1 ? 's' : ''} available`
  }

  if (loading) {
    return (
      <section>
        {showHeader && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{getTitle()}</h2>
            <p className="mt-1 text-sm text-gray-600">{getSubtitle()}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
            >
              <div className="h-52 animate-pulse bg-gray-100" />
              <div className="space-y-3 p-4">
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
                <div className="h-4 w-1/3 animate-pulse rounded bg-gray-100" />
                <div className="mt-4 flex items-center justify-between">
                  <div className="h-6 w-16 animate-pulse rounded bg-gray-100" />
                  <div className="h-10 w-28 animate-pulse rounded-xl bg-gray-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (displayProducts.length === 0) {
    return (
      <section>
        {showHeader && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{getTitle()}</h2>
            <p className="mt-1 text-sm text-gray-600">{getSubtitle()}</p>
          </div>
        )}

        <div className="rounded-2xl border border-gray-100 bg-white px-6 py-14 text-center shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">No products found</h3>
          <p className="mt-2 text-sm text-gray-500">
            Try a different search or browse another category.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section>
      {showHeader && (
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{getTitle()}</h2>
            <p className="mt-1 text-sm text-gray-600">{getSubtitle()}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}