'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart()

  const [apartmentNumber, setApartmentNumber] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('morning')
  const [instagramReady, setInstagramReady] = useState(false)

  const BUSINESS_PHONE = '14092768534'
  const INSTAGRAM_URL = 'https://www.instagram.com/aptbites/'

  const subtotal = cartTotal
  const tax = subtotal * 0.0825
  const total = subtotal + tax

  const generateOrderMessage = () => {
    const deliveryTimeText =
      deliveryTime === 'morning'
        ? 'Morning (8:00 AM - 10:00 AM)'
        : 'Evening (6:00 PM - 8:00 PM)'

    let message = `AptBites Order\n\n`
    message += `Name: ${customerName.trim()}\n`
    message += `Apartment: ${apartmentNumber.trim()}\n`
    message += `Phone: ${phoneNumber.trim()}\n`
    message += `Delivery Time: ${deliveryTimeText}\n`
    message += `Payment: Cash / Zelle / Venmo\n\n`
    message += `Items:\n`

    cartItems.forEach((item) => {
      message += `- ${item.quantity} x ${item.name} = $${(
        item.price * item.quantity
      ).toFixed(2)}\n`
    })

    message += `\nSummary:\n`
    message += `Subtotal: $${subtotal.toFixed(2)}\n`
    message += `Tax: $${tax.toFixed(2)}\n`
    message += `Delivery: FREE\n`
    message += `Total: $${total.toFixed(2)}\n`

    return message
  }

  const validateInfo = () => {
    const trimmedName = customerName.trim()
    const trimmedApartment = apartmentNumber.trim()
    const trimmedPhone = phoneNumber.trim()

    if (!trimmedName || !trimmedApartment || !trimmedPhone) {
      alert('Please fill in your name, apartment number, and phone number.')
      return false
    }

    const phoneDigits = trimmedPhone.replace(/\D/g, '')
    if (phoneDigits.length < 10) {
      alert('Please enter a valid phone number.')
      return false
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty.')
      return false
    }

    return true
  }

  const handleSMSCheckout = () => {
    if (!validateInfo()) return

    const message = encodeURIComponent(generateOrderMessage())
    setInstagramReady(false)
    window.location.href = `sms:${BUSINESS_PHONE}?body=${message}`
    clearCart()
  }

  const handleInstagramCheckout = async () => {
    if (!validateInfo()) return

    try {
      await navigator.clipboard.writeText(generateOrderMessage())
      setInstagramReady(true)
      alert('Order copied. Instagram will open now. Paste the order into the DM and send it, then come back and tap "I sent the order".')
    } catch {
      setInstagramReady(true)
      alert('Instagram will open now. Please copy and paste your order into the DM, then come back and tap "I sent the order".')
    }

    window.open(INSTAGRAM_URL, '_blank', 'noopener,noreferrer')
  }

  const handleInstagramOrderSent = () => {
    clearCart()
    setInstagramReady(false)
    alert('Thanks! Your cart has been cleared.')
  }

  const handleKeepCart = () => {
    setInstagramReady(false)
  }

  const renderProductImage = (image: string, name: string) => {
    const isImagePath =
      image.startsWith('/') ||
      image.startsWith('http://') ||
      image.startsWith('https://')

    if (isImagePath) {
      return (
        <div className="flex h-20 w-20 items-center justify-center rounded-lg border bg-white p-2">
          <Image
            src={image}
            alt={name}
            width={64}
            height={64}
            className="h-full w-full object-contain"
          />
        </div>
      )
    }

    return (
      <div className="flex h-20 w-20 items-center justify-center rounded-lg border bg-white p-2 text-4xl">
        {image}
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mb-4 text-6xl">🛒</div>
        <h1 className="mb-4 text-3xl font-bold text-gray-800">Your cart is empty</h1>
        <p className="mb-8 text-gray-600">Add some products to get started.</p>
        <Link
          href="/products"
          className="inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:bg-secondary"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b p-4 last:border-b-0"
              >
                <div className="shrink-0">{renderProductImage(item.image, item.name)}</div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                  {item.category && (
                    <p className="mt-1 text-sm text-gray-400">{item.category}</p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center overflow-hidden rounded-lg border">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-2 transition hover:bg-gray-100"
                      aria-label={`Decrease quantity for ${item.name}`}
                    >
                      −
                    </button>
                    <span className="px-4 text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-2 transition hover:bg-gray-100"
                      aria-label={`Increase quantity for ${item.name}`}
                    >
                      +
                    </button>
                  </div>

                  <span className="min-w-[72px] text-right font-semibold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 transition hover:text-red-600"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              onClick={clearCart}
              className="text-sm font-medium text-red-600 transition hover:text-red-700"
            >
              Clear cart
            </button>
          </div>
        </div>

        <div>
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold text-gray-800">Checkout</h2>

            <div className="space-y-3">
              <input
                placeholder="Your Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
              />

              <input
                placeholder="Apartment Number"
                value={apartmentNumber}
                onChange={(e) => setApartmentNumber(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
              />

              <input
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
              />

              <select
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary"
              >
                <option value="morning">Morning (8:00 AM - 10:00 AM)</option>
                <option value="evening">Evening (6:00 PM - 8:00 PM)</option>
              </select>
            </div>

            <div className="mt-5 rounded-lg border bg-gray-50 p-4 text-sm text-gray-700">
              <div className="mb-2 flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="mb-2 flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="mb-2 flex justify-between">
                <span>Delivery</span>
                <span>FREE</span>
              </div>

              <div className="flex justify-between border-t pt-3 text-base font-semibold text-gray-800">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              Pay with cash, Zelle, or Venmo when your order is confirmed.
            </p>

            <div className="mt-5 space-y-3">
              <button
                onClick={handleSMSCheckout}
                className="w-full rounded-lg bg-primary py-3 font-semibold text-white transition hover:bg-secondary"
              >
                💬 Text Order
              </button>

              <button
                onClick={handleInstagramCheckout}
                className="w-full rounded-lg border border-primary py-3 font-semibold text-primary transition hover:bg-primary hover:text-white"
              >
                📸 Order via Instagram
              </button>
            </div>

            {instagramReady && (
              <div className="mt-4 rounded-lg border border-pink-200 bg-pink-50 p-4">
                <p className="text-sm text-gray-700">
                  Your order message is ready. Paste it into the Instagram DM, send it, then clear your cart.
                </p>

                <div className="mt-3 space-y-2">
                  <button
                    onClick={handleInstagramOrderSent}
                    className="w-full rounded-lg bg-pink-600 py-3 font-semibold text-white transition hover:bg-pink-700"
                  >
                    I sent the order
                  </button>

                  <button
                    onClick={handleKeepCart}
                    className="w-full rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    Keep cart for now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}