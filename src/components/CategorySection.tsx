import Link from 'next/link'

const categories = [
  { id: 1, name: 'Snacks', icon: '🍿', slug: 'snacks' },
  { id: 2, name: 'Beverages', icon: '🥤', slug: 'beverages' },
  { id: 3, name: 'Household', icon: '🧴', slug: 'household' },
]

export default function CategorySection() {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Shop by Category</h2>
        <p className="text-gray-600">
          Browse everyday apartment essentials, snacks, drinks, and household items.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-center border border-gray-100 hover:-translate-y-1"
          >
            <div className="text-5xl mb-3">{category.icon}</div>
            <h3 className="font-semibold text-xl text-gray-800 mb-2">{category.name}</h3>
            <p className="text-sm text-gray-500">Explore {category.name.toLowerCase()} available for delivery</p>
          </Link>
        ))}
      </div>
    </section>
  )
}