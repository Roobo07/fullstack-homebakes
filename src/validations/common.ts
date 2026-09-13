import { z } from 'zod'

// ==========================================
// POS Billing Validation Schemas
// ==========================================

export const posBillItemSchema = z.object({
  product_id: z.string().uuid('Invalid product'),
  variant_id: z.string().uuid('Invalid variant'),
  product_name: z.string().min(1),
  variant_name: z.string().optional(),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  unit_price: z.number().min(0, 'Price must be positive'),
  discount_amount: z.number().min(0).default(0),
})

export const createBillSchema = z.object({
  items: z.array(posBillItemSchema).min(1, 'At least one item is required'),
  customer_id: z.string().uuid().optional(), // Optional for walk-in
  customer_name: z.string().default('Walk-in Customer'),
  customer_phone: z.string().optional(),
  discount_amount: z.number().min(0).default(0),
  payment_method: z.enum(['cash', 'upi', 'card', 'other']),
  notes: z.string().optional(),
})

export type CreateBillInput = z.infer<typeof createBillSchema>
export type PosBillItemInput = z.infer<typeof posBillItemSchema>

// ==========================================
// Delivery Validation Schemas
// ==========================================

export const deliveryCalculationSchema = z.object({
  latitude: z.number().min(-90).max(90, 'Invalid latitude'),
  longitude: z.number().min(-180).max(180, 'Invalid longitude'),
  order_subtotal: z.number().min(0).default(0),
})

export const deliveryZoneSchema = z.object({
  name: z.string().min(1, 'Zone name is required'),
  min_distance_km: z.number().min(0),
  max_distance_km: z.number().min(0),
  delivery_fee: z.number().min(0),
  estimated_time: z.string().optional(),
  active: z.boolean().default(true),
  sort_order: z.number().int().default(0),
}).refine(
  (data) => data.max_distance_km > data.min_distance_km,
  { message: 'Max distance must be greater than min distance', path: ['max_distance_km'] }
)

export type DeliveryCalculationInput = z.infer<typeof deliveryCalculationSchema>
export type DeliveryZoneInput = z.infer<typeof deliveryZoneSchema>

// ==========================================
// Common Validation Schemas
// ==========================================

export const emailSchema = z.string().email('Invalid email address')
export const phoneSchema = z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number')
export const uuidSchema = z.string().uuid('Invalid ID')
export const priceSchema = z.number().min(0, 'Price must be positive')
export const quantitySchema = z.number().int().min(0, 'Quantity must be non-negative')
export const dateSchema = z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date')

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(12),
})

export const dateRangeSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
}).refine(
  (data) => {
    if (data.startDate && data.endDate) {
      return new Date(data.startDate) <= new Date(data.endDate)
    }
    return true
  },
  { message: 'Start date must be before end date' }
)

// ==========================================
// Expense Validation
// ==========================================

export const createExpenseSchema = z.object({
  category: z.enum([
    'ingredients', 'packaging', 'electricity', 'delivery',
    'staff', 'rent', 'equipment', 'marketing', 'other'
  ]),
  description: z.string().min(1, 'Description is required').max(500),
  amount: z.number().min(0.01, 'Amount must be positive'),
  expense_date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date'),
  payment_method: z.string().optional(),
  reference: z.string().optional(),
  notes: z.string().max(1000).optional(),
})

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>

// ==========================================
// Coupon Validation
// ==========================================

export const createCouponSchema = z.object({
  code: z.string().min(3, 'Code must be at least 3 characters').max(20)
    .regex(/^[A-Z0-9]+$/, 'Code must be uppercase alphanumeric'),
  description: z.string().optional(),
  discount_type: z.enum(['percentage', 'fixed']),
  discount_value: z.number().min(0.01, 'Discount value must be positive'),
  min_order_amount: z.number().min(0).default(0),
  max_discount_amount: z.number().min(0).optional(),
  max_uses: z.number().int().min(1).optional(),
  per_user_limit: z.number().int().min(1).default(1),
  valid_from: z.string().optional(),
  valid_until: z.string().optional(),
  product_ids: z.array(z.string().uuid()).optional(),
  category_ids: z.array(z.string().uuid()).optional(),
  active: z.boolean().default(true),
})

export type CreateCouponInput = z.infer<typeof createCouponSchema>

// ==========================================
// Review Validation
// ==========================================

export const createReviewSchema = z.object({
  product_id: z.string().uuid(),
  order_id: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  review_text: z.string().max(1000).optional(),
  image_url: z.string().url().optional(),
})

export type CreateReviewInput = z.infer<typeof createReviewSchema>

// ==========================================
// Daily Cash Closing Validation
// ==========================================

export const dailyCashClosingSchema = z.object({
  closing_date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date'),
  opening_amount: z.number().min(0),
  actual_amount: z.number().min(0),
  notes: z.string().optional(),
})

export type DailyCashClosingInput = z.infer<typeof dailyCashClosingSchema>

// ==========================================
// Refund Validation
// ==========================================

export const createRefundSchema = z.object({
  order_id: z.string().uuid(),
  payment_id: z.string().uuid().optional(),
  refund_type: z.enum(['full', 'partial', 'cancellation']),
  amount: z.number().min(0.01, 'Refund amount must be positive'),
  reason: z.string().min(1, 'Reason is required').max(500),
  notes: z.string().max(1000).optional(),
})

export type CreateRefundInput = z.infer<typeof createRefundSchema>

// ==========================================
// Settings Validation
// ==========================================

export const updateSettingsSchema = z.object({
  bakery_name: z.string().min(1).max(100).optional(),
  logo_url: z.string().url().optional().or(z.literal('')),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  whatsapp: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postal_code: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  opening_hours: z.record(z.unknown()).optional(),
  delivery_radius_km: z.number().min(0).optional(),
  min_delivery_order: z.number().min(0).optional(),
  free_delivery_threshold: z.number().min(0).optional(),
  tax_percentage: z.number().min(0).max(100).optional(),
  tax_name: z.string().optional(),
  tax_enabled: z.boolean().optional(),
  currency: z.string().optional(),
  currency_symbol: z.string().optional(),
  invoice_prefix: z.string().optional(),
  social_links: z.record(z.string()).optional(),
  payment_methods: z.array(z.string()).optional(),
  timezone: z.string().optional(),
})

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>
