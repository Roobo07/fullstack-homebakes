import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth/guards'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .single()
      
    if (error && error.code !== 'PGRST116') throw error
    
    return NextResponse.json({ success: true, data: data || {} })
  } catch (error) {
    console.error('Error in GET /api/settings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdmin()
    const body = await request.json()
    const supabase = await createClient()
    
    // Assuming there's only one settings row (id = 1)
    const { data, error } = await supabase
      .from('settings')
      .upsert({ id: 1, ...body })
      .select()
      .single()
      
    if (error) throw error
    
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error in PUT /api/settings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}
