'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()

  const [apartmentNumber, setApartmentNumber] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('morning')

  const BUSINESS_PHONE = '14092768534'
  const BUSINESS_EMAIL = 'getaptbites@gmail.com'

  const taxExemptItems = ['Bottled Water', 'Water']

  const subtotal = cartTotal

  const taxableAmount = cartItems.reduce((sum, item) => {
    const isTaxExempt = taxExemptItems.some((exempt) =>
      item.name.toLowerCase().includes(exempt.toLowerCase())
    )
    return sum + (isTaxExempt ? 0 : item.price * item.quantity)
  }, 0)

  const tax = taxableAmount * 0.0825
  const deliveryFee = 0
  const total = subtotal + tax + deliveryFee

  const generateOrderMessage = () => {
    const deliveryTimeText =
      deliveryTime === 'morning' ? 'Morning (8:00 AM - 10:00 AM)' : 'Evening (6:00 PM - 8:00 PM)'

    let message = `AptBites Order\n\n`
    message += `Customer Name: ${customerName}\n`
    message += `Apartment Number: ${apartmentNumber}\n`
    message += `Phone Number: ${phoneNumber}\n`
    message += `Preferred Delivery Time: ${deliveryTimeText}\n\n`
    message += `Order Items:\n`

    cartItems.forEach((item) => {
      message += `- ${item.quantity} x ${item.name} = $${(item.price * item.quantity).toFixed(2)}\n`
    })

    message += `\nOrder Summary:\n`
    message += `Subtotal: $${subtotal.toFixed(2)}\n`
    message += `Tax: $${tax.toFixed(2)}\n`
    message += `Delivery: FREE\n`
    message += `Total: $${total.toFixed(2)}\n\n`
    message += `Payment Method: Cash on Delivery / Zelle / Venmo`

    return message
  }

  const validateInfo = () => {
    if (!customerName.trim() || !apartmentNumber.trim() || !phoneNumber.trim()) {
      alert('Please fill in your name, apartment number, and phone number.')
      return false
    }
    return true
  }

  const handleWhatsAppCheckout = () => {
    if (!validateInfo()) return
    const message = encodeURIComponent(generateOrderMessage())
    window.open(`https://wa.me/${BUSINESS_PHONE}?text=${message}`, '_blank')
  }

  const handleSMSCheckout = () => {
    if (!validateInfo()) return
    const message = encodeURIComponent(generateOrderMessage())
    window.location.href = `sms:${BUSINESS_PHONE}?&body=${message}`
  }

  const handleEmailCheckout = () => {
    if (!validateInfo()) return
    const subject = encodeURIComponent(`AptBites Order - ${customerName} - Apt ${apartmentNumber}`)
    const body = encodeURIComponent(generateOrderMessage())
    window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`
  }

  const handleCopyOrder = async () => {
    if (!validateInfo()) return

    try {
      await navigator.clipboard.writeText(generateOrderMessage())
      alert('Order copied successfully. You can now paste it into WhatsApp, text, or email.')
    } catch {
      alert('Could not copy order. Please try again.')
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Add some products to get started.</p>
        <Link
          href="/products"
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition inline-block font-semibold"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  const hasTaxExemptItems = cartItems.some((item) =>
    taxExemptItems.some((exempt) => item.name.toLowerCase().includes(exempt.toLowerCase()))
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center border-b p-6 last:border-b-0">
                <div className="text-5xl mr-4">{item.image}</div>

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-100 transition"
                    >
                      -
                    </button>

                    <span className="px-4 py-1 border-x font-semibold">{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100 transition"
                    >
                      +
                    </button>
                  </div>

                  <span className="font-semibold w-20 text-right text-primary">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition text-xl"
                    title="Remove from cart"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Delivery Details</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Apartment Number *
                </label>
                <input
                  type="text"
                  value={apartmentNumber}
                  onChange={(e) => setApartmentNumber(e.target.value)}
                  placeholder="e.g. A-205"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Your phone number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Delivery Time
                </label>
                <select
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="morning">Morning (8:00 AM - 10:00 AM)</option>
                  <option value="evening">Evening (6:00 PM - 8:00 PM)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8.25%)</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>

              {hasTaxExemptItems && (
                <div className="text-xs text-gray-500 italic">
                  Water items may be tax-exempt.
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span className="font-semibold text-primary">FREE</span>
              </div>

              <div className="text-xs text-primary bg-green-50 p-2 rounded border border-green-200">
                Free delivery within the apartment community.
              </div>

              <div className="border-t pt-3 flex justify-between text-lg">
                <span className="font-bold">Total</span>
                <span className="font-bold text-primary text-2xl">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 text-center">
                Choose how you want to place your order
              </h3>

              <button
                onClick={handleSMSCheckout}
                className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition text-center font-semibold shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 mb-2"
              >
                <span className="text-2xl">💬</span>
                <span>Order via Text Message</span>
              </button>

              <div className="grid grid-cols-2 gap-2 mb-2">
                <button
                  onClick={handleWhatsAppCheckout}
                  className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition text-center font-semibold shadow flex items-center justify-center space-x-1 text-sm"
                >
                  <span>💬</span>
                  <span>WhatsApp</span>
                </button>

                <button
                  onClick={handleEmailCheckout}
                  className="bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition text-center font-semibold shadow flex items-center justify-center space-x-1 text-sm"
                >
                  <span>📧</span>
                  <span>Email</span>
                </button>
              </div>

              <button
                onClick={handleCopyOrder}
                className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition text-center font-semibold shadow flex items-center justify-center space-x-2 text-sm"
              >
                <span>📋</span>
                <span>Copy Order</span>
              </button>
            </div>

            <div className="mt-3 text-center text-xs text-gray-500 bg-blue-50 p-3 rounded border border-blue-200">
              <p className="font-semibold mb-1">Payment Options</p>
              <p>Cash on delivery, Zelle, or Venmo</p>
            </div>

            <Link
              href="/products"
              className="w-full mt-3 border-2 border-primary text-primary py-3 rounded-lg hover:bg-gray-50 transition text-center font-semibold block"
            >
              Continue Shopping
            </Link>

            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear your cart?')) {
                  clearCart()
                }
              }}
              className="w-full mt-2 text-red-500 text-sm hover:text-red-700 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}