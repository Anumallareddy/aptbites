import Link from 'next/link'
import ProductGrid from '@/components/ProductGrid'
import CategorySection from '@/components/CategorySection'

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
              Snacks, drinks, and essentials delivered to your apartment
            </h1>

            <p className="mb-8 text-lg text-white/90">
              Order in minutes. Get it delivered within your community.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/products"
                className="rounded-lg bg-white px-8 py-3 text-center font-semibold text-primary transition hover:bg-gray-100"
              >
                Browse Products
              </Link>

              <a
                href="https://www.instagram.com/aptbites/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white px-8 py-3 text-center font-semibold text-white transition hover:bg-white hover:text-primary"
              >
                Order via Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <CategorySection />
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-14">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              Popular Products
            </h2>

            <Link
              href="/products"
              className="font-semibold text-primary transition hover:text-secondary"
            >
              View all →
            </Link>
          </div>

          <ProductGrid featured={true} showHeader={false} />
        </div>
      </section>

      {/* Pickup */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl rounded-2xl bg-white p-8 shadow-md md:p-10">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                  Need something from another store?
                </h2>

                <p className="mb-6 text-gray-600">
                  We can pick it up and deliver it to your apartment.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/pickup-delivery"
                    className="rounded-lg bg-primary px-6 py-3 text-center font-semibold text-white transition hover:bg-secondary"
                  >
                    Learn More
                  </Link>

                  <a
                    href="https://www.instagram.com/aptbites/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-primary px-6 py-3 text-center font-semibold text-primary transition hover:bg-primary hover:text-white"
                  >
                    Request Pickup
                  </a>
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50 p-6">
                <ul className="space-y-2 text-gray-600">
                  <li>Nearby store pickups</li>
                  <li>Quick apartment deliveries</li>
                  <li>Small grocery runs</li>
                  <li>Simple errands</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl bg-primary p-8 text-center text-white shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">
              Ready to order?
            </h2>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/products"
                className="rounded-lg bg-white px-8 py-3 font-semibold text-primary transition hover:bg-gray-100"
              >
                Browse Products
              </Link>

              <a
                href="https://www.instagram.com/aptbites/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white px-8 py-3 font-semibold text-white transition hover:bg-white hover:text-primary"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}