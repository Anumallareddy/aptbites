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
  const INSTAGRAM_URL = 'https://www.instagram.com/aptbites/'

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
      deliveryTime === 'morning'
        ? 'Morning (8:00 AM - 10:00 AM)'
        : 'Evening (6:00 PM - 8:00 PM)'

    let message = `AptBites Order\n\n`
    message += `Customer Name: ${customerName}\n`
    message += `Apartment Number: ${apartmentNumber}\n`
    message += `Phone Number: ${phoneNumber}\n`
    message += `Preferred Delivery Time: ${deliveryTimeText}\n\n`
    message += `Order Items:\n`

    cartItems.forEach((item) => {
      message += `- ${item.quantity} x ${item.name} = $${(
        item.price * item.quantity
      ).toFixed(2)}\n`
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

  const handleSMSCheckout = () => {
    if (!validateInfo()) return
    const message = encodeURIComponent(generateOrderMessage())
    window.location.href = `sms:${BUSINESS_PHONE}&body=${message}`
  }

  const handleEmailCheckout = () => {
    if (!validateInfo()) return
    const subject = encodeURIComponent(
      `AptBites Order - ${customerName} - Apt ${apartmentNumber}`
    )
    const body = encodeURIComponent(generateOrderMessage())
    window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`
  }

  const handleInstagramCheckout = async () => {
    if (!validateInfo()) return

    try {
      await navigator.clipboard.writeText(generateOrderMessage())
      alert(
        'Order copied. Instagram will open now. Tap "Message", paste your order, and send it.'
      )
    } catch {
      alert(
        'Instagram will open now. Please copy and paste your order into AptBites DM.'
      )
    }

    // IMPORTANT: use location.href (not window.open)
    window.location.href = INSTAGRAM_URL
  }

  const handleCopyOrder = async () => {
    if (!validateInfo()) return

    try {
      await navigator.clipboard.writeText(generateOrderMessage())
      alert('Order copied successfully. Paste it anywhere to send.')
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
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-lg">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span className="px-4">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>

                  <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>

                  <button onClick={() => removeFromCart(item.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>

            <input
              placeholder="Your Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />

            <input
              placeholder="Apartment Number"
              value={apartmentNumber}
              onChange={(e) => setApartmentNumber(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />

            <input
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />

            <button onClick={handleInstagramCheckout} className="w-full bg-pink-600 text-white py-3 mb-2 rounded">
              📸 Copy Order & Open Instagram
            </button>

            <button onClick={handleSMSCheckout} className="w-full bg-blue-600 text-white py-3 mb-2 rounded">
              💬 Text Order
            </button>

            <button onClick={handleEmailCheckout} className="w-full bg-red-600 text-white py-3 mb-2 rounded">
              📧 Email Order
            </button>

            <button onClick={handleCopyOrder} className="w-full bg-gray-600 text-white py-3 rounded">
              📋 Copy Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}