'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { defaultProducts, getProducts } from '@/data/products'
import { Product } from '@/types'

type Category = 'Snacks' | 'Beverages' | 'Household'

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const ADMIN_PASSWORD = 'aptbites2026'

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }

    const loadedProducts = getProducts()
    setProducts(loadedProducts)

    if (!localStorage.getItem('aptbites-products')) {
      localStorage.setItem('aptbites-products', JSON.stringify(defaultProducts))
      setProducts(defaultProducts)
    }
  }, [])

  const saveProducts = (updatedProducts: Product[]) => {
    localStorage.setItem('aptbites-products', JSON.stringify(updatedProducts))
    window.dispatchEvent(new Event('storage'))
    setProducts(updatedProducts)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('adminAuth', 'true')
      setPassword('')
    } else {
      alert('Incorrect password')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('adminAuth')
    setPassword('')
  }

  const handleEdit = (product: Product) => {
    setEditingProduct({ ...product })
    setIsEditing(true)
    setShowAddForm(false)
  }

  const handleDelete = (productId: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    const updatedProducts = products.filter((p) => p.id !== productId)
    saveProducts(updatedProducts)
  }

  const handleSave = () => {
    if (!editingProduct) return

    const updatedProducts = products.map((p) =>
      p.id === editingProduct.id ? editingProduct : p
    )

    saveProducts(updatedProducts)
    setIsEditing(false)
    setEditingProduct(null)
  }

  const handleAdd = () => {
    if (!editingProduct) return

    const maxId = products.length > 0 ? Math.max(...products.map((p) => p.id)) : 0
    const newProduct = { ...editingProduct, id: maxId + 1 }

    saveProducts([...products, newProduct])
    setShowAddForm(false)
    setEditingProduct(null)
  }

  const handleAddNew = () => {
    setEditingProduct({
      id: 0,
      name: '',
      price: 0,
      category: 'Snacks',
      image: '🛒',
      rating: 4.0,
      description: '',
      stock: 0,
    })
    setShowAddForm(true)
    setIsEditing(false)
  }

  // 🔥 FIXED FUNCTION
  const handleCategoryChange = (value: string) => {
    if (!editingProduct) return
    setEditingProduct({
      ...editingProduct,
      category: value as Category,
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow">
          <h2 className="text-xl mb-4">Admin Login</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border p-2 w-full mb-4"
          />
          <button className="bg-black text-white px-4 py-2 w-full">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin</h1>
        <button onClick={handleLogout} className="text-red-500">Logout</button>
      </div>

      <button
        onClick={handleAddNew}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Product
      </button>

      {(isEditing || showAddForm) && editingProduct && (
        <div className="bg-white p-6 mb-6 rounded shadow">
          <input
            value={editingProduct.name}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, name: e.target.value })
            }
            placeholder="Name"
            className="border p-2 w-full mb-2"
          />

          <input
            type="number"
            value={editingProduct.price}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                price: parseFloat(e.target.value) || 0,
              })
            }
            className="border p-2 w-full mb-2"
          />

          {/* ✅ FIXED CATEGORY SELECT */}
          <select
            value={editingProduct.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="border p-2 w-full mb-2"
          >
            <option value="Snacks">Snacks</option>
            <option value="Beverages">Beverages</option>
            <option value="Household">Household</option>
          </select>

          <button
            onClick={showAddForm ? handleAdd : handleSave}
            className="bg-blue-600 text-white px-4 py-2 mr-2"
          >
            Save
          </button>

          <button
            onClick={() => {
              setEditingProduct(null)
              setShowAddForm(false)
              setIsEditing(false)
            }}
            className="bg-gray-400 px-4 py-2"
          >
            Cancel
          </button>
        </div>
      )}

      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t">
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>${p.price}</td>
              <td>
                <button onClick={() => handleEdit(p)} className="mr-2">Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}