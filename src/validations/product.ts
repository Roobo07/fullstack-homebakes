import { z } from 'zod'

// ==========================================
// Product Validation Schemas
// ==========================================

export const productVariantSchema = z.object({
  name: z.string().min(1, 'Variant name is required'),
  sku: z.string().optional(),
  weight_value: z.number().min(0).optional(),
  weight_unit: z.string().default('kg'),
  size: z.string().optional(),
  selling_price: z.number().min(0, 'Selling price must be positive'),
  cost_price: z.number().min(0).default(0),
  ingredient_cost: z.number().min(0).default(0),
  packaging_cost: z.number().min(0).default(0),
  other_cost: z.number().min(0).default(0),
  stock_quantity: z.number().int().min(0).default(0),
  low_stock_threshold: z.number().int().min(0).default(5),
  is_default: z.boolean().default(false),
  active: z.boolean().default(true),
  sort_order: z.number().int().default(0),
})

export const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(255),
  sku: z.string().optional(),
  category_id: z.string().uuid('Invalid category'),
  description: z.string().optional(),
  ingredients: z.string().optional(),
  allergens: z.string().optional(),
  preparation_time: z.number().int().min(0).optional(),
  base_price: z.number().min(0, 'Base price must be positive'),
  daily_capacity: z.number().int().min(0).optional(),
  weekly_capacity: z.number().int().min(0).optional(),
  featured: z.boolean().default(false),
  customization_available: z.boolean().default(false),
  active: z.boolean().default(true),
  variants: z.array(productVariantSchema).min(1, 'At least one variant is required'),
})

export const updateProductSchema = createProductSchema.partial().extend({
  id: z.string().uuid(),
})

export type CreateProductInput = z.infer<typeof createProductSchema>
export type UpdateProductInput = z.infer<typeof updateProductSchema>
export type ProductVariantInput = z.infer<typeof productVariantSchema>

// ==========================================
// Category Validation
// ==========================================

export const createCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(100),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  description: z.string().optional(),
  image_url: z.string().url().optional().or(z.literal('')),
  sort_order: z.number().int().default(0),
  active: z.boolean().default(true),
})

export type CreateCategoryInput = z.infer<typeof createCategorySchema>
