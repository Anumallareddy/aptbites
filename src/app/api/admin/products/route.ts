import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { supabaseAdmin } from '@/lib/supabase/admin'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const adminEmail = process.env.ADMIN_EMAIL!

type ProductPayload = {
  id?: string
  name?: string
  category?: string
  price?: number
  image_url?: string
  stock?: number
  description?: string
}

function getUserClient(accessToken: string) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  })
}

async function requireAdmin(request: NextRequest) {
  const authHeader = request.headers.get('authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      ok: false as const,
      response: NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      ),
    }
  }

  const token = authHeader.substring(7).trim()

  if (!token) {
    return {
      ok: false as const,
      response: NextResponse.json(
        { error: 'Missing access token' },
        { status: 401 }
      ),
    }
  }

  const userClient = getUserClient(token)

  const {
    data: { user },
    error,
  } = await userClient.auth.getUser()

  if (error || !user) {
    console.error('requireAdmin auth error:', error)
    return {
      ok: false as const,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    }
  }

  if (!user.email || user.email !== adminEmail) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: 'Forbidden' }, { status: 403 }),
    }
  }

  return {
    ok: true as const,
    user,
  }
}

function validateCreatePayload(body: ProductPayload) {
  if (!body.name || typeof body.name !== 'string' || !body.name.trim()) {
    return 'Product name is required'
  }

  if (!body.category || typeof body.category !== 'string' || !body.category.trim()) {
    return 'Category is required'
  }

  if (typeof body.price !== 'number' || Number.isNaN(body.price)) {
    return 'Price must be a valid number'
  }

  if (typeof body.stock !== 'number' || Number.isNaN(body.stock)) {
    return 'Stock must be a valid number'
  }

  return null
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request)
  if (!auth.ok) return auth.response

  try {
    const body: ProductPayload = await request.json()
    console.log('POST /api/admin/products body:', body)

    const validationError = validateCreatePayload(body)
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const payload = {
      name: body.name!.trim(),
      category: body.category!.trim(),
      price: body.price!,
      image: body.image_url?.trim() || null,
      stock: body.stock!,
      description: body.description?.trim() || null,
    }

    console.log('Insert payload:', payload)

    const { data, error } = await supabaseAdmin
      .from('products')
      .insert([payload])
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('POST route error:', error)
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}

export async function PUT(request: NextRequest) {
  const auth = await requireAdmin(request)
  if (!auth.ok) return auth.response

  try {
    const body: ProductPayload = await request.json()
    console.log('PUT /api/admin/products body:', body)

    if (!body.id || typeof body.id !== 'string') {
      return NextResponse.json({ error: 'Product id is required' }, { status: 400 })
    }

    const updates: Record<string, unknown> = {}

    if (typeof body.name === 'string') updates.name = body.name.trim()
    if (typeof body.category === 'string') updates.category = body.category.trim()
    if (typeof body.price === 'number' && !Number.isNaN(body.price)) updates.price = body.price
    if (typeof body.stock === 'number' && !Number.isNaN(body.stock)) updates.stock = body.stock
    if (typeof body.image_url === 'string') updates.image = body.image_url.trim()
    if (typeof body.description === 'string') updates.description = body.description.trim()

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
    }

    console.log('Update payload:', { id: body.id, updates })

    const { data, error } = await supabaseAdmin
      .from('products')
      .update(updates)
      .eq('id', body.id)
      .select()
      .single()

    if (error) {
      console.error('Supabase update error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('PUT route error:', error)
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAdmin(request)
  if (!auth.ok) return auth.response

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Product id is required' }, { status: 400 })
    }

    console.log('DELETE /api/admin/products id:', id)

    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase delete error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('DELETE route error:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 400 })
  }
}