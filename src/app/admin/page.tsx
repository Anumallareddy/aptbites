'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Product } from '@/types'

type Category = 'Snacks' | 'Beverages' | 'Household'

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'aptbites2026'

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false)
      return
    }

    const fetchProducts = async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true })

      if (error) {
        console.error('Error fetching admin products:', error)
        setProducts([])
      } else {
        setProducts(data || [])
      }

      setLoading(false)
    }

    fetchProducts()
  }, [isAuthenticated])

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

  const handleDelete = async (productId: number) => {
    const confirmDelete = confirm('Are you sure you want to delete this product?')
    if (!confirmDelete) return
  
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId)
  
    if (error) {
      console.error('Error deleting product:', error)
      alert('Failed to delete product')
      return
    }
  
    const { data, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true })
  
    if (fetchError) {
      console.error('Error refreshing products:', fetchError)
    } else {
      setProducts(data || [])
    }
  }

  const handleSave = async () => {
    if (!editingProduct) return
  
    const { error } = await supabase
      .from('products')
      .update({
        name: editingProduct.name,
        price: editingProduct.price,
        category: editingProduct.category,
        image: editingProduct.image,
        rating: editingProduct.rating,
        description: editingProduct.description,
        stock: editingProduct.stock,
      })
      .eq('id', editingProduct.id)
  
    if (error) {
      console.error('Error updating product:', error)
      alert('Failed to update product')
      return
    }
  
    const { data, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true })
  
    if (fetchError) {
      console.error('Error refreshing products:', fetchError)
    } else {
      setProducts(data || [])
    }
  
    setIsEditing(false)
    setEditingProduct(null)
  }

  const handleAdd = async () => {
    if (!editingProduct) return
  
    const { error } = await supabase.from('products').insert([
      {
        name: editingProduct.name,
        price: editingProduct.price,
        category: editingProduct.category,
        image: editingProduct.image,
        rating: editingProduct.rating,
        description: editingProduct.description,
        stock: editingProduct.stock,
      },
    ])
  
    if (error) {
      console.error('Error adding product:', error)
      alert('Failed to add product')
      return
    }
  
    const { data, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true })
  
    if (fetchError) {
      console.error('Error refreshing products:', fetchError)
    } else {
      setProducts(data || [])
    }
  
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

  const handleCategoryChange = (value: string) => {
    if (!editingProduct) return
    setEditingProduct({
      ...editingProduct,
      category: value as Category,
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Admin Login</h2>
          <p className="text-sm text-gray-500 mb-4">
            This is a simple MVP admin login for local product management.
          </p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border p-3 w-full mb-4 rounded-lg"
          />

          <button className="bg-black text-white px-4 py-3 w-full rounded-lg font-semibold">
            Login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button onClick={handleLogout} className="text-red-500 font-medium">
          Logout
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={handleAddNew}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold"
        >
          Add Product
        </button>
      </div>

      {(isEditing || showAddForm) && editingProduct && (
  <div className="bg-white p-6 mb-6 rounded-xl shadow-md">
    <h2 className="text-xl font-bold mb-4 text-gray-800">
      {showAddForm ? 'Add Product' : 'Edit Product'}
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Name
        </label>
        <input
          value={editingProduct.name}
          onChange={(e) =>
            setEditingProduct({ ...editingProduct, name: e.target.value })
          }
          placeholder="Example: Coca-Cola 12 oz Can"
          className="border p-3 w-full rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price
        </label>
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
          placeholder="Example: 1.99"
          className="border p-3 w-full rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          value={editingProduct.category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="border p-3 w-full rounded-lg"
        >
          <option value="Snacks">Snacks</option>
          <option value="Beverages">Beverages</option>
          <option value="Household">Household</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image Path or Emoji
        </label>
        <input
          value={editingProduct.image}
          onChange={(e) =>
            setEditingProduct({ ...editingProduct, image: e.target.value })
          }
          placeholder="Example: /coke.png or 🥤"
          className="border p-3 w-full rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rating
        </label>
        <input
          type="number"
          step="0.1"
          min="0"
          max="5"
          value={editingProduct.rating}
          onChange={(e) =>
            setEditingProduct({
              ...editingProduct,
              rating: parseFloat(e.target.value) || 0,
            })
          }
          placeholder="Example: 4.5"
          className="border p-3 w-full rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Stock
        </label>
        <input
          type="number"
          value={editingProduct.stock ?? 0}
          onChange={(e) =>
            setEditingProduct({
              ...editingProduct,
              stock: parseInt(e.target.value) || 0,
            })
          }
          placeholder="Example: 50"
          className="border p-3 w-full rounded-lg"
        />
      </div>
    </div>

    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Description
      </label>
      <textarea
        value={editingProduct.description ?? ''}
        onChange={(e) =>
          setEditingProduct({
            ...editingProduct,
            description: e.target.value,
          })
        }
        placeholder="Write a short product description"
        className="border p-3 w-full rounded-lg min-h-[100px]"
      />
    </div>

    <div className="flex gap-3 mt-5">
      <button
        onClick={showAddForm ? handleAdd : handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
      >
        Save
      </button>

      <button
        onClick={() => {
          setEditingProduct(null)
          setShowAddForm(false)
          setIsEditing(false)
        }}
        className="bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold"
      >
        Cancel
      </button>
    </div>
  </div>
)}

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        {loading ? (
          <div className="p-6 text-gray-500">Loading products...</div>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Category</th>
                <th className="text-left p-3">Price</th>
                <th className="text-left p-3">Image</th>
                <th className="text-left p-3">Stock</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">${p.price.toFixed(2)}</td>
                  <td className="p-3">{p.image}</td>
                  <td className="p-3">{p.stock ?? 0}</td>
                  <td className="p-3">
                    <button onClick={() => handleEdit(p)} className="mr-3 text-blue-600 font-medium">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-600 font-medium">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}