import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="AptBites Logo"
                className="w-10 h-10 object-contain rounded-lg bg-white p-1"
              />
              <h3 className="text-xl font-bold">AptBites</h3>
            </div>

            <p className="text-gray-400 mb-4">
              A simple apartment community delivery store for snacks, drinks, and household essentials.
            </p>

            <a
              href="https://wa.me/14092768534"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-semibold"
            >
              Order on WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white transition">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/categories/snacks" className="text-gray-400 hover:text-white transition">
                  Snacks
                </Link>
              </li>
              <li>
                <Link href="/categories/beverages" className="text-gray-400 hover:text-white transition">
                  Beverages
                </Link>
              </li>
              <li>
                <Link href="/categories/household" className="text-gray-400 hover:text-white transition">
                  Household
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Delivery Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Delivery Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Morning: 8:00 AM - 10:00 AM</li>
              <li>Evening: 6:00 PM - 8:00 PM</li>
              <li>Free delivery in the community</li>
              <li>Same-day or next-morning delivery</li>
              <li>Cash, Zelle, or Venmo</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📧 getaptbites@gmail.com</li>
              <li>📱 409-276-8534</li>
              <li>
                💬{' '}
                <a
                  href="https://wa.me/14092768534"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 transition"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                📸{' '}
                <a
                  href="https://www.instagram.com/aptbites/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 transition"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 AptBites. All rights reserved.</p>
          <Link
            href="/admin"
            className="text-xs text-gray-500 hover:text-gray-300 mt-2 inline-block"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}