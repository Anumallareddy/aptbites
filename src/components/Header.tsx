'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function Header() {
  const { cartCount } = useCart()

  return (
    <header className="bg-white/95 backdrop-blur shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="AptBites Logo"
              className="w-10 h-10 object-contain rounded-lg"
            />
            <div>
              <div className="text-xl font-bold text-primary leading-tight">AptBites</div>
              <div className="text-xs text-gray-500 hidden sm:block">
                Apartment delivery made simple
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition font-medium">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-primary transition font-medium">
              Products
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary transition font-medium">
              About
            </Link>
            <a
              href="https://www.instagram.com/aptbites/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-primary transition font-medium"
            >
              Instagram
            </a>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            <Link href="/cart" className="relative hover:opacity-80 transition">
              <span className="text-2xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition font-semibold"
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}