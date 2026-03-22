'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useEffect, useState } from 'react'

export default function Header() {
  const { cartCount } = useCart()
  const [animateBadge, setAnimateBadge] = useState(false)

  useEffect(() => {
    if (cartCount === 0) return

    setAnimateBadge(true)
    const timer = setTimeout(() => {
      setAnimateBadge(false)
    }, 350)

    return () => clearTimeout(timer)
  }, [cartCount])

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="AptBites Logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg object-contain"
            />
            <span className="text-2xl font-bold text-primary">AptBites</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/" className="text-gray-700 transition hover:text-primary">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 transition hover:text-primary">
              Products
            </Link>
            <Link
              href="/pickup-delivery"
              className="text-gray-700 transition hover:text-primary"
            >
              Pickup & Delivery
            </Link>
            <Link href="/about" className="text-gray-700 transition hover:text-primary">
              About
            </Link>
          </nav>

          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-white transition hover:bg-secondary"
          >
            <ShoppingCart size={18} />
            <span>Cart</span>

            {cartCount > 0 && (
              <span
                className={`flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent px-1 text-xs font-semibold text-white ${
                  animateBadge ? 'animate-cart-bump' : ''
                }`}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}