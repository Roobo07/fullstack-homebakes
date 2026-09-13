import { z } from 'zod'

// ==========================================
// Order Validation Schemas
// ==========================================

export const orderItemSchema = z.object({
  product_id: z.string().uuid('Invalid product'),
  variant_id: z.string().uuid('Invalid variant'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  customization_text: z.string().max(500).optional(),
  customization_charge: z.number().min(0).default(0),
})

export const deliveryAddressSchema = z.object({
  address_line: z.string().min(1, 'Address is required'),
  area: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postal_code: z.string().min(5, 'Valid postal code required').max(10),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
})

export const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1, 'At least one item is required'),
  delivery_method: z.enum(['pickup', 'delivery']),
  delivery_address: deliveryAddressSchema.optional(),
  delivery_date: z.string().optional(),
  delivery_time_slot: z.string().optional(),
  special_instructions: z.string().max(1000).optional(),
  coupon_code: z.string().optional(),
  payment_method: z.enum(['cash', 'upi', 'card', 'online', 'other']),
  customer_name: z.string().min(1, 'Name is required'),
  customer_phone: z.string().min(10, 'Valid phone required').max(15),
  customer_email: z.string().email('Valid email required').optional(),
}).refine(
  (data) => {
    if (data.delivery_method === 'delivery') {
      return !!data.delivery_address
    }
    return true
  },
  { message: 'Delivery address is required for home delivery', path: ['delivery_address'] }
)

export const updateOrderStatusSchema = z.object({
  status: z.enum([
    'pending', 'confirmed', 'preparing', 'ready',
    'out_for_delivery', 'delivered', 'cancelled', 'rejected', 'refunded', 'failed'
  ]),
  notes: z.string().optional(),
})

export type CreateOrderInput = z.infer<typeof createOrderSchema>
export type OrderItemInput = z.infer<typeof orderItemSchema>
export type DeliveryAddressInput = z.infer<typeof deliveryAddressSchema>
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>
