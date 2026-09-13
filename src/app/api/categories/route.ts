import { NextResponse } from 'next/server'
import { CategoryService } from '@/services/categoryService'
import { requireAdmin } from '@/lib/auth/guards'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const data = await CategoryService.getActiveCategories()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error in GET /api/categories:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin()
    const body = await request.json()
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('product_categories')
      .insert(body)
      .select()
      .single()
      
    if (error) throw error
    
    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/categories:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    )
  }
}
