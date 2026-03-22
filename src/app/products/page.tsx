'use client'

import { useState } from 'react'
import ProductGrid from '@/components/product/ProductGrid'

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('featured')

  const hasFilters = selectedCategory || searchQuery || sortBy !== 'featured'

  const clearFilters = () => {
    setSelectedCategory('')
    setSearchQuery('')
    setSortBy('featured')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        </div>

        <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Category
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Snacks">Snacks</option>
                <option value="Beverages">Beverages</option>
                <option value="Essentials">Essentials</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Search
              </label>
              <input
                type="text"
                placeholder="Search products"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Sort By
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {hasFilters && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="text-sm font-semibold text-primary transition hover:text-secondary"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        <ProductGrid
          category={selectedCategory}
          searchQuery={searchQuery}
          sortBy={sortBy}
        />
      </div>
    </div>
  )
}