'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

type Category = 'Snacks' | 'Beverages' | 'Essentials'

type AdminProduct = {
  id: number
  name: string
  price: number
  category: Category
  image: string
  rating: number
  description: string
  stock: number
}

type ProductRow = {
  id: number
  name: string
  price: number
  category: Category
  image?: string | null
  rating?: number | null
  description?: string | null
  stock?: number | null
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const mapRowToProduct = (row: ProductRow): AdminProduct => ({
    id: row.id,
    name: row.name ?? '',
    price: typeof row.price === 'number' ? row.price : 0,
    category: (row.category as Category) ?? 'Snacks',
    image: row.image ?? '🛒',
    rating: typeof row.rating === 'number' ? row.rating : 4,
    description: row.description ?? '',
    stock: typeof row.stock === 'number' ? row.stock : 0,
  })

  useEffect(() => {
    let mounted = true

    const initAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!mounted) return
        setIsAuthenticated(!!session)
      } catch (error) {
        console.error('Session restore error:', error)
        if (!mounted) return
        setIsAuthenticated(false)
      } finally {
        if (mounted) {
          setAuthLoading(false)
        }
      }
    }

    initAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return
      setIsAuthenticated(!!session)
      setAuthLoading(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
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
        const mapped = ((data as ProductRow[]) || []).map(mapRowToProduct)
        setProducts(mapped)
      }

      setLoading(false)
    }

    if (!isAuthenticated) {
      setProducts([])
      setLoading(false)
      return
    }

    fetchProducts()
  }, [isAuthenticated])

  const getAccessToken = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    return session?.access_token ?? null
  }

  const refreshProducts = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error('Error fetching admin products:', error)
      setProducts([])
    } else {
      const mapped = ((data as ProductRow[]) || []).map(mapRowToProduct)
      setProducts(mapped)
    }

    setLoading(false)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Login error:', error)
      alert(error.message || 'Login failed')
      return
    }

    setEmail('')
    setPassword('')
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Logout error:', error)
      alert(error.message || 'Logout failed')
    }
  }

  const handleEdit = (product: AdminProduct) => {
    setEditingProduct({ ...product })
    setIsEditing(true)
    setShowAddForm(false)
  }

  const handleDelete = async (productId: number) => {
    const confirmDelete = confirm('Are you sure you want to delete this product?')
    if (!confirmDelete) return

    const accessToken = await getAccessToken()

    if (!accessToken) {
      alert('You must be logged in')
      return
    }

    const res = await fetch(`/api/admin/products?id=${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('Error deleting product:', data)
      alert(data.error || 'Failed to delete product')
      return
    }

    await refreshProducts()
  }

  const handleSave = async () => {
    if (!editingProduct) return

    const accessToken = await getAccessToken()

    if (!accessToken) {
      alert('You must be logged in')
      return
    }

    const res = await fetch('/api/admin/products', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        id: String(editingProduct.id),
        name: editingProduct.name,
        price: editingProduct.price,
        category: editingProduct.category,
        image_url: editingProduct.image,
        description: editingProduct.description,
        stock: editingProduct.stock,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('Error updating product:', data)
      alert(data.error || 'Failed to update product')
      return
    }

    await refreshProducts()
    setIsEditing(false)
    setEditingProduct(null)
  }

  const handleAdd = async () => {
    if (!editingProduct) return

    const accessToken = await getAccessToken()

    if (!accessToken) {
      alert('You must be logged in')
      return
    }

    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: editingProduct.name,
        price: editingProduct.price,
        category: editingProduct.category,
        image_url: editingProduct.image,
        description: editingProduct.description,
        stock: editingProduct.stock,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('Error adding product:', data)
      alert(data.error || 'Failed to add product')
      return
    }

    await refreshProducts()
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
      rating: 4,
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

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-md">
          <h2 className="text-xl font-bold text-gray-800">Checking session...</h2>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-2 text-2xl font-bold text-gray-800">Admin Login</h2>
          <p className="mb-4 text-sm text-gray-500">
            Sign in with your Supabase admin account.
          </p>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin email"
            className="mb-3 w-full rounded-lg border p-3"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mb-4 w-full rounded-lg border p-3"
            required
          />

          <button className="w-full rounded-lg bg-black px-4 py-3 font-semibold text-white">
            Login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button onClick={handleLogout} className="font-medium text-red-500">
          Logout
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={handleAddNew}
          className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white"
        >
          Add Product
        </button>
      </div>

      {(isEditing || showAddForm) && editingProduct && (
        <div className="mb-6 rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            {showAddForm ? 'Add Product' : 'Edit Product'}
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
                placeholder="Example: Coca-Cola 12 oz Can"
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: Number(e.target.value),
                  })
                }
                placeholder="2.99"
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={editingProduct.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full rounded-lg border p-3"
              >
                <option value="Snacks">Snacks</option>
                <option value="Beverages">Beverages</option>
                <option value="Essentials">Essentials</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Image / Emoji / URL
              </label>
              <input
                value={editingProduct.image}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, image: e.target.value })
                }
                placeholder="🛒 or image URL"
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                value={editingProduct.stock}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    stock: Number(e.target.value),
                  })
                }
                placeholder="10"
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Rating
              </label>
              <input
                type="number"
                step="0.1"
                value={editingProduct.rating}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    rating: Number(e.target.value),
                  })
                }
                placeholder="4.5"
                className="w-full rounded-lg border p-3"
                disabled
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={editingProduct.description}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    description: e.target.value,
                  })
                }
                placeholder="Describe the product"
                className="min-h-[120px] w-full rounded-lg border p-3"
              />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={showAddForm ? handleAdd : handleSave}
              className="rounded-lg bg-black px-4 py-2 font-semibold text-white"
            >
              {showAddForm ? 'Add Product' : 'Save Changes'}
            </button>

            <button
              onClick={() => {
                setIsEditing(false)
                setShowAddForm(false)
                setEditingProduct(null)
              }}
              className="rounded-lg border border-gray-300 px-4 py-2 font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-xl bg-white shadow-md">
        <div className="border-b border-gray-200 p-4">
          <h2 className="text-xl font-bold text-gray-800">Products</h2>
        </div>

        {loading ? (
          <div className="p-6 text-gray-500">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="p-6 text-gray-500">No products found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-50">
                <tr className="text-left text-sm text-gray-600">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-gray-100 align-top">
                    <td className="px-4 py-3 text-sm text-gray-700">{product.id}</td>
                    <td className="px-4 py-3 text-2xl">{product.image}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{product.name}</td>
                    <td className="px-4 py-3 text-gray-700">{product.category}</td>
                    <td className="px-4 py-3 text-gray-700">${product.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-gray-700">{product.stock}</td>
                    <td className="max-w-xs px-4 py-3 text-gray-700">{product.description}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="rounded-md bg-red-600 px-3 py-1 text-sm text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}