import { NextResponse } from 'next/server'
import { ProductService } from '@/services/productService'
import { requireAdmin } from '@/lib/auth/guards'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const data = await ProductService.getProductById(id)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error(`Error in GET /api/products/${id}:`, error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await requireAdmin()
    const body = await request.json()
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('products')
      .update(body)
      .eq('id', id)
      .select()
      .single()
      
    if (error) throw error
    
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error(`Error in PUT /api/products/${id}:`, error)
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await requireAdmin()
    const supabase = await createClient()
    
    // Soft delete
    const { error } = await supabase
      .from('products')
      .update({ active: false })
      .eq('id', id)
      
    if (error) throw error
    
    return NextResponse.json({ success: true, message: 'Product soft-deleted' })
  } catch (error) {
    console.error(`Error in DELETE /api/products/${id}:`, error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}