import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth/guards'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const user = await requireAuth()
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('favorites')
      .select('*, product:products(*)')
      // Fixed: Added (user as any) to tell TypeScript the ID exists
      .eq('customer_id', (user as any).id)
      
    if (error) throw error
    
    return NextResponse.json({ success: true, data: data || [] })
  } catch (error) {
    console.error('Error in GET /api/favorites:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch favorites' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAuth()
    const { productId } = await request.json()
    
    if (!productId) {
      return NextResponse.json({ success: false, error: 'Product ID is required' }, { status: 400 })
    }
    
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('favorites')
      // Fixed: Added (user as any)
      .insert({ customer_id: (user as any).id, product_id: productId })
      .select()
      .single()
      
    if (error) throw error
    
    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/favorites:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add favorite' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await requireAuth()
    const { productId } = await request.json()
    
    if (!productId) {
      return NextResponse.json({ success: false, error: 'Product ID is required' }, { status: 400 })
    }
    
    const supabase = await createClient()
    const { error } = await supabase
      .from('favorites')
      .delete()
      // Fixed: Added (user as any)
      .eq('customer_id', (user as any).id)
      .eq('product_id', productId)
      
    if (error) throw error
    
    return NextResponse.json({ success: true, message: 'Favorite removed' })
  } catch (error) {
    console.error('Error in DELETE /api/favorites:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to remove favorite' },
      { status: 500 }
    )
  }
}