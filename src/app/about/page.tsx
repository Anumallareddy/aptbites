import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <Image
            src="/logo.png"
            alt="AptBites Logo"
            width={160}
            height={160}
            className="mx-auto mb-4 h-40 w-40 object-contain"
            priority
          />
          <h1 className="mb-4 text-5xl font-bold text-gray-800">AptBites</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Snacks, drinks, and everyday essentials delivered right to your apartment.
          </p>
        </div>

        <div className="mb-8 rounded-xl bg-white p-8 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">How it works</h2>
          <p className="mb-3 text-gray-700">
            AptBites makes it easy to order everyday items without leaving your apartment
            community.
          </p>
          <p className="text-gray-700">
            Place your order through Instagram or email and choose a delivery time that
            works for you.
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-gradient-to-br from-primary to-secondary p-6 text-white shadow-lg">
            <div className="mb-3 text-4xl">🚚</div>
            <h3 className="mb-2 text-2xl font-bold">Local Delivery</h3>
            <p>Delivery within your apartment community with simple drop-off options.</p>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-secondary to-primary p-6 text-white shadow-lg">
            <div className="mb-3 text-4xl">📱</div>
            <h3 className="mb-2 text-2xl font-bold">Easy Ordering</h3>
            <p>Order through Instagram or email and we will confirm your delivery window.</p>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-accent to-yellow-500 p-6 text-white shadow-lg">
            <div className="mb-3 text-4xl">💵</div>
            <h3 className="mb-2 text-2xl font-bold">Flexible Payment</h3>
            <p>Pay with cash, Zelle, or Venmo based on what works best for you.</p>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-green-500 to-green-600 p-6 text-white shadow-lg">
            <div className="mb-3 text-4xl">⚡</div>
            <h3 className="mb-2 text-2xl font-bold">Fast Service</h3>
            <p>Morning and evening delivery windows keep ordering simple and reliable.</p>
          </div>
        </div>

        <div className="mb-8 rounded-xl border-2 border-blue-200 bg-blue-50 p-6">
          <h3 className="mb-3 text-xl font-bold text-gray-800">Delivery Times</h3>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Morning:</strong> 8:00 AM - 10:00 AM
            </p>
            <p>
              <strong>Evening:</strong> 6:00 PM - 8:00 PM
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-primary p-8 text-center text-white shadow-lg">
          <h3 className="mb-4 text-2xl font-bold">Ready to order?</h3>
          <p className="mb-6 text-lg">
            Browse products or place your order directly through Instagram or email.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/products"
              className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-primary transition hover:bg-gray-100"
            >
              Browse Products
            </Link>

            <a
              href="https://www.instagram.com/aptbites/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg border border-white px-8 py-3 font-semibold text-white transition hover:bg-white hover:text-primary"
            >
              Order via Instagram
            </a>

            <a
              href="mailto:getaptbites@gmail.com"
              className="inline-block rounded-lg border border-white px-8 py-3 font-semibold text-white transition hover:bg-white hover:text-primary"
            >
              Email AptBites
            </a>
          </div>

          <p className="mt-6 text-sm opacity-90">📧 getaptbites@gmail.com</p>
        </div>
      </div>
    </div>
  )
}