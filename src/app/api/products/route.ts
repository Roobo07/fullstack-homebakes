import { NextResponse } from 'next/server'
import { ProductService } from '@/services/productService'
import { requireAdmin } from '@/lib/auth/guards'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    const filters = {
      category: searchParams.get('category') || undefined,
      search: searchParams.get('search') || undefined,
      minPrice: searchParams.has('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.has('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      featured: searchParams.has('featured') ? searchParams.get('featured') === 'true' : undefined,
      page: searchParams.has('page') ? Number(searchParams.get('page')) : 1,
      pageSize: searchParams.has('pageSize') ? Number(searchParams.get('pageSize')) : 12,
      sortBy: searchParams.get('sortBy') || undefined,
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || undefined,
    }

    const data = await ProductService.getProducts(filters)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error in GET /api/products:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin()
    
    const body = await request.json()
    const supabase = await createClient()
    
    // In a real app, validate body with Zod here
    const { data, error } = await supabase
      .from('products')
      .insert(body)
      .select()
      .single()
      
    if (error) throw error
    
    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/products:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
