import { NextResponse } from 'next/server'
import { ProductService } from '@/services/productService'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    
    if (!query) {
      return NextResponse.json({ success: true, data: [] })
    }
    
    const data = await ProductService.searchProducts(query, 10)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error in GET /api/search:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to search products' },
      { status: 500 }
    )
  }
}
