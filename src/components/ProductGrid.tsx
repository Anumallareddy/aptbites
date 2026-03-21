'use client'

import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import { supabase } from '@/lib/supabase/client'
import { Product } from '@/types'

interface ProductGridProps {
  featured?: boolean
  category?: string
  searchQuery?: string
  sortBy?: string
}

export default function ProductGrid({
  featured = false,
  category,
  searchQuery = '',
  sortBy = 'featured',
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*')

      console.log('SUPABASE DATA:', data)
      console.log('SUPABASE ERROR:', error)

      if (error) {
        console.error('Error fetching products:', error)
        return
      }

      setProducts(data || [])
    }

    fetchProducts()
  }, [])

  let displayProducts = [...products]

  if (featured) {
    displayProducts = displayProducts.filter((p) => p.rating >= 4.5)
  }

  if (category) {
    displayProducts = displayProducts.filter((p) => p.category === category)
  }

  if (searchQuery) {
    displayProducts = displayProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  switch (sortBy) {
    case 'price-low':
      displayProducts.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      displayProducts.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      displayProducts.sort((a, b) => b.rating - a.rating)
      break
    default:
      break
  }

  if (displayProducts.length === 0) {
    return (
      <div className="text-center py-14 bg-white rounded-xl shadow-sm border border-gray-100">
        <p className="text-gray-500 text-lg">No products found matching your search.</p>
      </div>
    )
  }

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {featured ? 'Featured Products' : 'Available Products'}
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            {displayProducts.length} item{displayProducts.length !== 1 ? 's' : ''} available
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}