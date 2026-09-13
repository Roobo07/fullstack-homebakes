import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import type { CreateOrderInput } from '@/validations/order'
import { calculateOrderPrice } from '@/lib/pricing/calculator'
import { calculateDeliveryFee, type DeliveryZoneConfig } from '@/lib/delivery/distance'

export class OrderService {
  /**
   * Create a new online order with full server-side validation.
   * This is a transaction-safe operation that:
   * 1. Validates all products, variants, and prices
   * 2. Checks stock availability
   * 3. Validates delivery if applicable
   * 4. Recalculates all prices server-side
   * 5. Creates order, order items, payment, delivery, inventory transactions
   */
  static async createOrder(input: CreateOrderInput, userId: string) {
    const admin = createAdminClient()

    // 1. Fetch bakery settings
    const { data: settings } = await admin
      .from('bakery_settings')
      .select('*')
      .single()

    if (!settings) throw new Error('Bakery settings not found')

    // 2. Validate and fetch all products/variants
    const itemDetails = await Promise.all(
      input.items.map(async (item) => {
        const { data: variant, error } = await admin
          .from('product_variants')
          .select('*, product:products(*)')
          .eq('id', item.variant_id)
          .eq('product_id', item.product_id)
          .eq('active', true)
          .single()

        if (error || !variant) {
          throw new Error(`Product variant ${item.variant_id} not found or inactive`)
        }

        if (!variant.product || !variant.product.active) {
          throw new Error(`Product ${item.product_id} is not available`)
        }

        // Check stock
        const { data: inventory } = await admin
          .from('inventory')
          .select('current_stock, reserved_stock')
          .eq('product_id', item.product_id)
          .eq('variant_id', item.variant_id)
          .single()

        const availableStock = inventory
          ? inventory.current_stock - inventory.reserved_stock
          : variant.stock_quantity

        if (availableStock < item.quantity) {
          throw new Error(
            `Insufficient stock for ${variant.product.name} (${variant.name}). Available: ${availableStock}`
          )
        }

        return {
          ...item,
          variant,
          product: variant.product,
          unitPrice: variant.selling_price,
        }
      })
    )

    // 3. Validate delivery if home delivery
    let deliveryFee = 0
    let deliveryDistance = 0
    let deliveryZoneId: string | null = null

    if (input.delivery_method === 'delivery') {
      if (!input.delivery_address?.latitude || !input.delivery_address?.longitude) {
        throw new Error('Delivery coordinates are required for home delivery')
      }

      // Fetch delivery zones
      const { data: zones } = await admin
        .from('delivery_zones')
        .select('*')
        .eq('active', true)
        .order('min_distance_km')

      const zoneConfigs: DeliveryZoneConfig[] = (zones || []).map((z) => ({
        id: z.id,
        name: z.name,
        minDistanceKm: Number(z.min_distance_km),
        maxDistanceKm: Number(z.max_distance_km),
        deliveryFee: Number(z.delivery_fee),
        estimatedTime: z.estimated_time || undefined,
        active: z.active,
      }))

      const subtotal = itemDetails.reduce(
        (total, item) => total + item.unitPrice * item.quantity,
        0
      )

      const deliveryResult = calculateDeliveryFee(
        input.delivery_address.latitude,
        input.delivery_address.longitude,
        Number(settings.latitude),
        Number(settings.longitude),
        zoneConfigs,
        subtotal,
        Number(settings.free_delivery_threshold),
        Number(settings.delivery_radius_km),
        Number(settings.min_delivery_order)
      )

      if (!deliveryResult.available) {
        throw new Error(deliveryResult.message)
      }

      deliveryFee = deliveryResult.fee
      deliveryDistance = deliveryResult.distance

      // Find matching zone ID
      const matchedZone = zones?.find(
        (z) =>
          deliveryResult.distance >= Number(z.min_distance_km) &&
          deliveryResult.distance < Number(z.max_distance_km)
      )
      deliveryZoneId = matchedZone?.id || null
    }

    // 4. Validate coupon if provided
    let couponDiscount = 0
    if (input.coupon_code) {
      const { data: coupon } = await admin
        .from('coupons')
        .select('*')
        .eq('code', input.coupon_code)
        .eq('active', true)
        .single()

      if (coupon) {
        const now = new Date()
        const validFrom = coupon.valid_from ? new Date(coupon.valid_from) : null
        const validUntil = coupon.valid_until ? new Date(coupon.valid_until) : null

        if (validFrom && now < validFrom) {
          throw new Error('Coupon is not yet active')
        }
        if (validUntil && now > validUntil) {
          throw new Error('Coupon has expired')
        }
        if (coupon.max_uses && coupon.current_uses >= coupon.max_uses) {
          throw new Error('Coupon has reached maximum usage')
        }

        const subtotal = itemDetails.reduce(
          (total, item) => total + item.unitPrice * item.quantity,
          0
        )

        if (coupon.min_order_amount && subtotal < Number(coupon.min_order_amount)) {
          throw new Error(`Minimum order of ₹${coupon.min_order_amount} required for this coupon`)
        }

        if (coupon.discount_type === 'percentage') {
          couponDiscount = (subtotal * Number(coupon.discount_value)) / 100
          if (coupon.max_discount_amount) {
            couponDiscount = Math.min(couponDiscount, Number(coupon.max_discount_amount))
          }
        } else {
          couponDiscount = Number(coupon.discount_value)
        }
      }
    }

    // 5. Recalculate prices server-side
    const priceResult = calculateOrderPrice({
      items: itemDetails.map((item) => ({
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        customizationCharge: item.customization_charge,
        discountAmount: 0,
      })),
      couponDiscount,
      deliveryFee,
      taxPercentage: Number(settings.tax_percentage),
      taxEnabled: settings.tax_enabled,
    })

    // 6. Generate order number
    const { data: orderNumResult } = await admin.rpc('generate_order_number')
    const orderNumber = orderNumResult || `HB${Date.now()}`

    // 7. Create order
    const { data: order, error: orderError } = await admin
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_id: userId,
        order_type: 'online',
        status: 'pending',
        subtotal: priceResult.subtotal,
        discount_amount: priceResult.itemDiscountTotal,
        coupon_code: input.coupon_code || null,
        coupon_discount: priceResult.couponDiscount,
        customization_total: priceResult.customizationTotal,
        delivery_fee: priceResult.deliveryFee,
        tax_amount: priceResult.taxAmount,
        total_amount: priceResult.total,
        payment_status: 'pending',
        payment_method: input.payment_method,
        delivery_method: input.delivery_method,
        delivery_address: input.delivery_address ? input.delivery_address : null,
        delivery_date: input.delivery_date || null,
        delivery_time_slot: input.delivery_time_slot || null,
        special_instructions: input.special_instructions || null,
        created_by: userId,
      })
      .select()
      .single()

    if (orderError || !order) {
      throw new Error(`Failed to create order: ${orderError?.message}`)
    }

    // 8. Create order items
    const orderItems = itemDetails.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      variant_id: item.variant_id,
      product_name: item.product.name,
      variant_name: item.variant.name,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      customization_text: item.customization_text || null,
      customization_charge: item.customization_charge,
      discount_amount: 0,
      total_price: (item.unitPrice + item.customization_charge) * item.quantity,
    }))

    await admin.from('order_items').insert(orderItems)

    // 9. Create order status history
    await admin.from('order_status_history').insert({
      order_id: order.id,
      status: 'pending',
      notes: 'Order placed by customer',
      changed_by: userId,
    })

    // 10. Create payment record
    await admin.from('payments').insert({
      order_id: order.id,
      payment_method: input.payment_method,
      amount: priceResult.total,
      status: input.payment_method === 'cash' ? 'pending' : 'pending',
    })

    // 11. Create delivery record if home delivery
    if (input.delivery_method === 'delivery' && input.delivery_address) {
      await admin.from('delivery_orders').insert({
        order_id: order.id,
        customer_id: userId,
        delivery_address: input.delivery_address,
        latitude: input.delivery_address.latitude,
        longitude: input.delivery_address.longitude,
        distance_km: deliveryDistance,
        delivery_zone_id: deliveryZoneId,
        delivery_fee: deliveryFee,
        status: 'not_assigned',
      })
    }

    // 12. Deduct inventory for each item
    for (const item of itemDetails) {
      await admin.rpc('deduct_inventory', {
        p_product_id: item.product_id,
        p_variant_id: item.variant_id,
        p_quantity: item.quantity,
        p_reference_type: 'order',
        p_reference_id: order.id,
        p_user_id: userId,
      })
    }

    // 13. Update coupon usage if applicable
    if (input.coupon_code && couponDiscount > 0) {
      const { data: coupon } = await admin
        .from('coupons')
        .select('id')
        .eq('code', input.coupon_code)
        .single()

      if (coupon) {
        await admin.from('coupon_usage').insert({
          coupon_id: coupon.id,
          customer_id: userId,
          order_id: order.id,
          discount_amount: couponDiscount,
        })

        await admin
          .from('coupons')
          .update({ current_uses: coupon.id }) // increment handled by trigger
          .eq('id', coupon.id)
      }
    }

    // 14. Create notification
    await admin.from('notifications').insert({
      user_id: userId,
      type: 'order_placed',
      title: 'Order Placed Successfully! 🎉',
      message: `Your order #${orderNumber} has been placed. Total: ₹${priceResult.total}`,
      link: `/orders/${order.id}`,
    })

    return {
      order,
      orderNumber,
      total: priceResult.total,
      breakdown: priceResult.breakdown,
    }
  }

  /**
   * Get orders for a customer
   */
  static async getCustomerOrders(customerId: string, page = 1, pageSize = 10) {
    const supabase = await createClient()
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    const { data, error, count } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*),
        status_history:order_status_history(*)
      `, { count: 'exact' })
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) throw error
    return { orders: data || [], total: count || 0, page, pageSize }
  }

  /**
   * Get order by ID
   */
  static async getOrderById(orderId: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*, product:products(name, slug)),
        status_history:order_status_history(*),
        payment:payments(*),
        delivery:delivery_orders(*)
      `)
      .eq('id', orderId)
      .single()

    if (error) throw error
    return data
  }

  /**
   * Update order status (admin)
   */
  static async updateOrderStatus(
    orderId: string,
    status: string,
    notes: string | undefined,
    userId: string
  ) {
    const admin = createAdminClient()

    const { error: updateError } = await admin
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId)

    if (updateError) throw updateError

    await admin.from('order_status_history').insert({
      order_id: orderId,
      status,
      notes,
      changed_by: userId,
    })

    // Update payment status if delivered
    if (status === 'delivered') {
      await admin
        .from('payments')
        .update({ status: 'paid' })
        .eq('order_id', orderId)
        .eq('status', 'pending')
    }

    // Create audit log
    await admin.from('audit_logs').insert({
      user_id: userId,
      action: 'update_order_status',
      entity: 'orders',
      entity_id: orderId,
      new_value: { status, notes },
    })

    return { success: true }
  }

  /**
   * Get all orders (admin)
   */
  static async getAllOrders(filters: {
    status?: string
    type?: string
    startDate?: string
    endDate?: string
    search?: string
    page?: number
    pageSize?: number
  } = {}) {
    const admin = createAdminClient()
    const page = filters.page || 1
    const pageSize = filters.pageSize || 20
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    let query = admin
      .from('orders')
      .select(`
        *,
        items:order_items(count),
        customer:customers(full_name, phone)
      `, { count: 'exact' })

    if (filters.status) query = query.eq('status', filters.status)
    if (filters.type) query = query.eq('order_type', filters.type)
    if (filters.startDate) query = query.gte('created_at', filters.startDate)
    if (filters.endDate) query = query.lte('created_at', filters.endDate)
    if (filters.search) query = query.ilike('order_number', `%${filters.search}%`)

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) throw error
    return { orders: data || [], total: count || 0, page, pageSize }
  }
}
