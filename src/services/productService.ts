import { createClient } from '@/lib/supabase/server'
import type { ProductFilters } from '@/types/api'

export class ProductService {
  static async getProducts(filters: ProductFilters = {}) {
    const supabase = await createClient()
    let query = supabase
      .from('products')
      .select(`
        *,
        category:product_categories(*),
        variants:product_variants(*),
        images:product_images(*)
      `)
      .eq('active', true)
    
    if (filters.category) {
      query = query.eq('category_id', filters.category)
    }
    if (filters.featured !== undefined) {
      query = query.eq('featured', filters.featured)
    }
    if (filters.search) {
      query = query.ilike('name', `%${filters.search}%`)
    }
    if (filters.minPrice !== undefined) {
      query = query.gte('base_price', filters.minPrice)
    }
    if (filters.maxPrice !== undefined) {
      query = query.lte('base_price', filters.maxPrice)
    }
    
    // Sorting
    const sortBy = filters.sortBy || 'created_at'
    const sortOrder = filters.sortOrder === 'asc' ? true : false
    query = query.order(sortBy, { ascending: sortOrder })
    
    // Pagination
    const page = filters.page || 1
    const pageSize = filters.pageSize || 12
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1
    query = query.range(from, to)
    
    // For pagination count
    const { data, error, count } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('active', true)
    
    const { data: resultData, error: resultError } = await query
    
    if (resultError) throw resultError
    return { products: resultData || [], total: count || 0, page, pageSize }
  }
  
  static async getProductById(id: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:product_categories(*),
        variants:product_variants(*, inventory:inventory(*)),
        images:product_images(*),
        reviews:reviews(*, customer:customers(full_name))
      `)
      .eq('id', id)
      .eq('active', true)
      .single()
    
    if (error) throw error
    return data
  }
  
  static async getProductBySlug(slug: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:product_categories(*),
        variants:product_variants(*),
        images:product_images(*),
        reviews:reviews(*, customer:customers(full_name))
      `)
      .eq('slug', slug)
      .eq('active', true)
      .single()
    
    if (error) throw error
    return data
  }
  
  static async getFeaturedProducts(limit: number = 8) {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:product_categories(name, slug),
        variants:product_variants(*),
        images:product_images(*)
      `)
      .eq('active', true)
      .eq('featured', true)
      .limit(limit)
    
    if (error) throw error
    return data || []
  }
  
  static async getCategories() {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .eq('active', true)
      .order('sort_order')
    
    if (error) throw error
    return data || []
  }
  
  static async getCategoryBySlug(slug: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .eq('slug', slug)
      .eq('active', true)
      .single()
    
    if (error) throw error
    return data
  }
  
  static async searchProducts(query: string, limit: number = 10) {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select(`
        id, name, slug, base_price,
        images:product_images(image_url, is_primary),
        variants:product_variants(id, name, selling_price)
      `)
      .eq('active', true)
      .ilike('name', `%${query}%`)
      .limit(limit)
    
    if (error) throw error
    return data || []
  }
}
