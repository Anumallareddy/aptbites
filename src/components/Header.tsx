'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

export default function Header() {
  const { cartCount } = useCart()

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="AptBites Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain rounded-lg"
            />
            <span className="text-2xl font-bold text-primary">AptBites</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-primary transition">
              Products
            </Link>
            <Link href="/pickup-delivery" className="text-gray-700 hover:text-primary transition">
              Pickup Delivery
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary transition">
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative hover:opacity-75 transition">
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