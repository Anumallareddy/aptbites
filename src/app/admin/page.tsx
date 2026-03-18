'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { defaultProducts, getProducts } from '@/data/products'
import { Product } from '@/types'

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
    alert('Product deleted successfully')
  }

  const handleSave = () => {
    if (!editingProduct) return

    const updatedProducts = products.map((p) =>
      p.id === editingProduct.id ? editingProduct : p
    )

    saveProducts(updatedProducts)
    setIsEditing(false)
    setEditingProduct(null)
    alert('Product updated successfully')
  }

  const handleAdd = () => {
    if (!editingProduct) return

    const maxId = products.length > 0 ? Math.max(...products.map((p) => p.id)) : 0
    const newProduct = { ...editingProduct, id: maxId + 1 }
    const updatedProducts = [...products, newProduct]

    saveProducts(updatedProducts)
    setShowAddForm(false)
    setEditingProduct(null)
    alert('Product added successfully')
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔐</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
            <p className="text-gray-600">Enter your password to access the dashboard</p>
          </div>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-primary hover:underline">
              ← Back to Store
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-sm text-gray-600">Manage your products</p>
          </div>

          <div className="flex gap-4">
            <Link
              href="/"
              className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition"
            >
              View Store
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-2">📦</div>
            <div className="text-2xl font-bold text-gray-800">{products.length}</div>
            <div className="text-gray-600">Total Products</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-2">🍿</div>
            <div className="text-2xl font-bold text-gray-800">
              {products.filter((p) => p.category === 'Snacks').length}
            </div>
            <div className="text-gray-600">Snacks</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-2">🥤</div>
            <div className="text-2xl font-bold text-gray-800">
              {products.filter((p) => p.category === 'Beverages').length}
            </div>
            <div className="text-gray-600">Beverages</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-2">🧴</div>
            <div className="text-2xl font-bold text-gray-800">
              {products.filter((p) => p.category === 'Household').length}
            </div>
            <div className="text-gray-600">Household</div>
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={handleAddNew}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition shadow-lg"
          >
            Add New Product
          </button>
        </div>

        {(isEditing || showAddForm) && editingProduct && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">
              {showAddForm ? 'Add New Product' : 'Edit Product'}
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Product Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g. Doritos"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select
                  value={editingProduct.category}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="Snacks">Snacks</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Household">Household</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Emoji Icon</label>
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, image: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg text-2xl"
                  placeholder="🥤"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Rating (1-5)</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={editingProduct.rating}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      rating: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Stock</label>
                <input
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      stock: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={3}
                  placeholder="Product description..."
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={showAddForm ? handleAdd : handleSave}
                className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-secondary transition"
              >
                {showAddForm ? 'Add Product' : 'Save Changes'}
              </button>

              <button
                onClick={() => {
                  setIsEditing(false)
                  setShowAddForm(false)
                  setEditingProduct(null)
                }}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Icon</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Stock</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rating</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-3xl">{product.image}</td>
                    <td className="px-6 py-4 font-medium">{product.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={product.stock !== undefined && product.stock < 20 ? 'text-red-600' : 'text-gray-700'}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">⭐ {product.rating}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {products.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                      No products available yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}