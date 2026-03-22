'use client'

import { useParams } from 'next/navigation'
import ProductGrid from '@/components/ProductGrid'
import Link from 'next/link'

const categoryInfo: Record<string, { name: string; icon: string; description: string }> = {
  snacks: {
    name: 'Snacks',
    icon: '🍿',
    description: 'Chips, chocolates, cookies, and quick bites.',
  },
  beverages: {
    name: 'Beverages',
    icon: '🥤',
    description: 'Cold drinks, juices, water, and more.',
  },
  household: {
    name: 'Household',
    icon: '🧴',
    description: 'Everyday essentials for cleaning, care, and convenience.',
  },
}

export default function CategoryPage() {
  const params = useParams()
  const rawSlug = params.slug
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug
  const category = slug ? categoryInfo[slug] : undefined

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-xl rounded-xl bg-white p-10 shadow-md">
          <div className="mb-4 text-6xl">🔎</div>
          <h1 className="mb-4 text-3xl font-bold text-gray-800">Category not found</h1>
          <p className="mb-8 text-gray-600">
            This category is not available right now.
          </p>
          <Link
            href="/products"
            className="inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:bg-secondary"
          >
            View All Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary to-secondary py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4 flex items-center justify-center">
            <span className="text-7xl md:text-8xl">{category.icon}</span>
          </div>

          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{category.name}</h1>
          <p className="mx-auto max-w-2xl text-lg text-white/90 md:text-xl">
            {category.description}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-6 flex justify-end">
          <Link
            href="/products"
            className="font-semibold text-primary transition hover:text-secondary"
          >
            ← Back to Products
          </Link>
        </div>

        <ProductGrid category={category.name} showHeader={false} />
      </div>
    </div>
  )
}