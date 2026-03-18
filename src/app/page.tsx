import Link from 'next/link'
import ProductGrid from '@/components/ProductGrid'
import CategorySection from '@/components/CategorySection'

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide mb-3 text-white/90">
              Apartment delivery made simple
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              AptBites brings snacks, drinks, and essentials right to your apartment
            </h1>

            <p className="text-lg md:text-xl mb-4 text-white/90">
              A simple community delivery store for apartment living.
            </p>

            <p className="text-base md:text-lg mb-8 text-white/85">
              Order everyday items for your home without leaving your building.
              Fast delivery, flexible payment, and easy ordering through cart, text, Instagram, or email.
            </p>

            <div className="flex gap-3 mb-8 flex-wrap">
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                Free local delivery
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                Morning and evening slots
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
                Cash, Zelle, or Venmo
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block text-center"
              >
                Shop Now
              </Link>

              <a
                href="https://www.instagram.com/aptbites/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition inline-block text-center"
              >
                Order via Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Strip */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="text-gray-700 font-medium">
              🚚 Free delivery within the apartment community
            </div>
            <div className="text-gray-700 font-medium">
              ⏰ Morning: 8:00 AM - 10:00 AM | Evening: 6:00 PM - 8:00 PM
            </div>
            <div className="text-gray-700 font-medium">
              📱 Order through cart, text, Instagram, or email
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Shop by Category</h2>
            <p className="text-gray-600">
              Browse snacks, beverages, and everyday apartment essentials.
            </p>
          </div>

          <CategorySection />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Products</h2>
              <p className="text-gray-600">
                Popular picks from AptBites that residents will love.
              </p>
            </div>

            <Link
              href="/products"
              className="text-primary hover:text-secondary transition font-semibold"
            >
              View all products →
            </Link>
          </div>

          <ProductGrid featured={true} />
        </div>
      </section>

      {/* Why AptBites */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Why AptBites</h2>
            <p className="text-gray-600">
              Built for apartment convenience, not complicated delivery apps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Local Delivery</h3>
              <p className="text-gray-600">
                Fast delivery within the apartment community without extra delivery fees.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="text-4xl mb-4">💵</div>
              <h3 className="text-xl font-semibold mb-2">Flexible Payment</h3>
              <p className="text-gray-600">
                Pay with cash on delivery or use Zelle or Venmo based on what works for you.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Easy Ordering</h3>
              <p className="text-gray-600">
                Browse products, add to cart, and place your order in the way that feels easiest.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram / CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-primary text-white rounded-2xl shadow-lg p-8 md:p-10 text-center">
            <h2 className="text-3xl font-bold mb-4">Follow AptBites and place your next order</h2>
            <p className="text-lg text-white/90 mb-8">
              Stay updated on new products, offers, and apartment delivery updates through Instagram and email.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://www.instagram.com/aptbites/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Order via Instagram
              </a>

              <a
                href="mailto:getaptbites@gmail.com"
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
              >
                Email AptBites
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}