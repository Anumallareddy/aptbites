'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Product, CartItem, CartContextType } from '@/types'

const CART_STORAGE_KEY = 'aptbites-cart'

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)

        const sanitizedCart = Array.isArray(parsedCart)
          ? parsedCart
              .filter(
                (item) =>
                  item &&
                  typeof item.id === 'number' &&
                  typeof item.quantity === 'number' &&
                  typeof item.name === 'string' &&
                  typeof item.price === 'number' &&
                  typeof item.image === 'string'
              )
              .map((item) => ({
                id: item.id,
                quantity: item.quantity,
                name: item.name,
                price: item.price,
                image: item.image,
                category: item.category,
              }))
          : []

        setCartItems(sanitizedCart)
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error)
      localStorage.removeItem(CART_STORAGE_KEY)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error)
    }
  }, [cartItems, isLoaded])

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [
        ...prevItems,
        {
          id: product.id,
          quantity: 1,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
        },
      ]
    })
  }

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}