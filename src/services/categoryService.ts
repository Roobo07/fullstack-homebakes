import { createClient } from '@/lib/supabase/server'

export class CategoryService {
  static async getCategories() {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .order('sort_order')
    
    if (error) throw error
    return data || []
  }
  
  static async getActiveCategories() {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .eq('active', true)
      .order('sort_order')
    
    if (error) throw error
    return data || []
  }
  
  static async getCategoryById(id: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  }
}
