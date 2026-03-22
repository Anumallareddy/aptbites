import Link from 'next/link'

const categories = [
  { id: 1, name: 'Snacks', icon: '🍿', slug: 'snacks' },
  { id: 2, name: 'Beverages', icon: '🥤', slug: 'beverages' },
  { id: 3, name: 'Essentials', icon: '🧴', slug: 'Essentials' },
]

export default function CategorySection() {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Shop by Category
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-3 text-5xl transition-transform duration-200 group-hover:scale-110">
              {category.icon}
            </div>

            <h3 className="text-base font-semibold text-gray-800">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  )
}