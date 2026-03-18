'use client'

import { useParams } from 'next/navigation'
import ProductGrid from '@/components/ProductGrid'
import Link from 'next/link'

const categoryInfo: Record<string, { name: string; icon: string; description: string }> = {
  snacks: {
    name: 'Snacks',
    icon: '🍿',
    description: 'Chips, chocolates, cookies, and quick bites for anytime cravings.',
  },
  beverages: {
    name: 'Beverages',
    icon: '🥤',
    description: 'Cold drinks, juices, water, and other refreshing essentials.',
  },
  household: {
    name: 'Household',
    icon: '🧴',
    description: 'Everyday apartment essentials for cleaning, care, and convenience.',
  },
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const category = categoryInfo[slug]

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-10">
          <div className="text-6xl mb-4">🔎</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Category not found</h1>
          <p className="text-gray-600 mb-8">
            The category you are looking for is not available right now.
          </p>
          <Link
            href="/products"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition inline-block font-semibold"
          >
            View All Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="text-7xl md:text-8xl">{category.icon}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.name}</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            {category.description}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Browse {category.name}</h2>
            <p className="text-gray-600 mt-1">
              Explore available items in this category and add them to your cart.
            </p>
          </div>

          <Link
            href="/products"
            className="text-primary hover:text-secondary transition font-semibold"
          >
            ← Back to All Products
          </Link>
        </div>

        <ProductGrid category={category.name} />
      </div>
    </div>
  )
}