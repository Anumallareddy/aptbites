import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="mt-16 bg-gray-900 py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="AptBites Logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg bg-white p-1 object-contain"
              />
              <h3 className="text-xl font-bold">AptBites</h3>
            </div>

            <p className="mb-4 max-w-sm text-gray-400">
              Snacks, drinks, and everyday essentials delivered right to your apartment.
            </p>

            <a
              href="https://www.instagram.com/aptbites/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-700"
            >
              Order via Instagram
            </a>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 transition hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 transition hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/pickup-delivery" className="text-gray-400 transition hover:text-white">
                  Pickup & Delivery
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 transition hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Morning: 8:00 AM - 10:00 AM</li>
              <li>Evening: 6:00 PM - 8:00 PM</li>
              <li>Cash, Zelle, or Venmo</li>
              <li>
                <a
                  href="mailto:getaptbites@gmail.com"
                  className="transition hover:text-white"
                >
                  getaptbites@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:4092768534"
                  className="transition hover:text-white"
                >
                  409-276-8534
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/aptbites/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 transition hover:text-pink-300"
                >
                  @aptbites
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2026 AptBites. All rights reserved.</p>
          <Link
            href="/admin"
            className="mt-2 inline-block text-xs text-gray-500 transition hover:text-gray-300"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}