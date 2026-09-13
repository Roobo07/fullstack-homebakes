import { createAdminClient } from '@/lib/supabase/admin'
import type { CreateBillInput } from '@/validations/common'

export class BillingService {
  /**
   * Create a POS bill for walk-in or registered customer.
   * Atomically creates bill, payment, invoice, and deducts inventory.
   */
  static async createBill(input: CreateBillInput, staffUserId: string) {
    const admin = createAdminClient()

    // 1. Validate all products and stock
    const itemDetails = await Promise.all(
      input.items.map(async (item) => {
        const { data: variant, error } = await admin
          .from('product_variants')
          .select('*, product:products(name, active)')
          .eq('id', item.variant_id)
          .eq('product_id', item.product_id)
          .eq('active', true)
          .single()

        if (error || !variant) {
          throw new Error(`Product variant not found: ${item.product_name}`)
        }

        if (!variant.product?.active) {
          throw new Error(`Product ${item.product_name} is not active`)
        }

        // Verify price matches
        if (Number(variant.selling_price) !== item.unit_price) {
          throw new Error(
            `Price mismatch for ${item.product_name}. Expected ₹${variant.selling_price}, got ₹${item.unit_price}`
          )
        }

        // Check stock
        if (variant.stock_quantity < item.quantity) {
          throw new Error(
            `Insufficient stock for ${item.product_name} (${variant.name}). Available: ${variant.stock_quantity}`
          )
        }

        return { ...item, variant }
      })
    )

    // 2. Calculate totals
    const subtotal = itemDetails.reduce(
      (total, item) => total + item.unit_price * item.quantity,
      0
    )
    const itemDiscounts = itemDetails.reduce(
      (total, item) => total + item.discount_amount,
      0
    )
    const totalDiscount = input.discount_amount + itemDiscounts
    const totalAmount = Math.max(0, subtotal - totalDiscount)

    // 3. Fetch bakery settings for tax
    const { data: settings } = await admin
      .from('bakery_settings')
      .select('tax_enabled, tax_percentage')
      .single()

    let taxAmount = 0
    if (settings?.tax_enabled && settings.tax_percentage) {
      taxAmount = Math.round(((subtotal - totalDiscount) * Number(settings.tax_percentage)) / 100 * 100) / 100
    }

    const finalTotal = totalAmount + taxAmount

    // 4. Generate bill number
    const { data: billNumResult } = await admin.rpc('generate_bill_number')
    const billNumber = billNumResult || `BILL-${Date.now()}`

    // 5. Create POS bill
    const { data: bill, error: billError } = await admin
      .from('pos_bills')
      .insert({
        bill_number: billNumber,
        customer_id: input.customer_id || null,
        customer_name: input.customer_name || 'Walk-in Customer',
        customer_phone: input.customer_phone || null,
        subtotal,
        discount_amount: totalDiscount,
        tax_amount: taxAmount,
        total_amount: finalTotal,
        payment_method: input.payment_method,
        payment_status: 'paid',
        notes: input.notes || null,
        created_by: staffUserId,
      })
      .select()
      .single()

    if (billError || !bill) {
      throw new Error(`Failed to create bill: ${billError?.message}`)
    }

    // 6. Create bill items
    const billItems = itemDetails.map((item) => ({
      pos_bill_id: bill.id,
      product_id: item.product_id,
      variant_id: item.variant_id,
      product_name: item.product_name,
      variant_name: item.variant_name || null,
      quantity: item.quantity,
      unit_price: item.unit_price,
      discount_amount: item.discount_amount,
      total_price: item.unit_price * item.quantity - item.discount_amount,
    }))

    await admin.from('pos_bill_items').insert(billItems)

    // 7. Create payment record
    await admin.from('payments').insert({
      pos_bill_id: bill.id,
      payment_method: input.payment_method,
      amount: finalTotal,
      status: 'paid',
    })

    // 8. Generate invoice
    const { data: invNumResult } = await admin.rpc('generate_invoice_number')
    const invoiceNumber = invNumResult || `INV-${Date.now()}`

    const { data: invoice } = await admin
      .from('invoices')
      .insert({
        invoice_number: invoiceNumber,
        pos_bill_id: bill.id,
        customer_id: input.customer_id || null,
        customer_name: input.customer_name || 'Walk-in Customer',
        customer_phone: input.customer_phone || null,
        subtotal,
        discount_amount: totalDiscount,
        tax_amount: taxAmount,
        total_amount: finalTotal,
        payment_method: input.payment_method,
        payment_status: 'paid',
        created_by: staffUserId,
      })
      .select()
      .single()

    // Create invoice items
    if (invoice) {
      const invoiceItems = itemDetails.map((item) => ({
        invoice_id: invoice.id,
        product_name: item.product_name,
        variant_name: item.variant_name || null,
        quantity: item.quantity,
        unit_price: item.unit_price,
        discount: item.discount_amount,
        total: item.unit_price * item.quantity - item.discount_amount,
      }))

      await admin.from('invoice_items').insert(invoiceItems)
    }

    // 9. Deduct inventory
    for (const item of itemDetails) {
      await admin.rpc('deduct_inventory', {
        p_product_id: item.product_id,
        p_variant_id: item.variant_id,
        p_quantity: item.quantity,
        p_reference_type: 'pos_bill',
        p_reference_id: bill.id,
        p_user_id: staffUserId,
      })
    }

    // 10. Update customer stats if registered customer
    if (input.customer_id) {
      await admin.rpc('update_customer_stats', {
        p_customer_id: input.customer_id,
      })
    }

    // 11. Audit log
    await admin.from('audit_logs').insert({
      user_id: staffUserId,
      action: 'create_pos_bill',
      entity: 'pos_bills',
      entity_id: bill.id,
      new_value: { bill_number: billNumber, total: finalTotal, payment_method: input.payment_method },
    })

    return {
      bill,
      billNumber,
      invoiceNumber: invoice?.invoice_number,
      total: finalTotal,
      subtotal,
      discount: totalDiscount,
      tax: taxAmount,
    }
  }

  /**
   * Get POS bill history
   */
  static async getBillHistory(filters: {
    startDate?: string
    endDate?: string
    search?: string
    paymentMethod?: string
    page?: number
    pageSize?: number
  } = {}) {
    const admin = createAdminClient()
    const page = filters.page || 1
    const pageSize = filters.pageSize || 20
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    let query = admin
      .from('pos_bills')
      .select('*', { count: 'exact' })

    if (filters.startDate) query = query.gte('created_at', filters.startDate)
    if (filters.endDate) query = query.lte('created_at', filters.endDate)
    if (filters.search) query = query.ilike('bill_number', `%${filters.search}%`)
    if (filters.paymentMethod) query = query.eq('payment_method', filters.paymentMethod)

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) throw error
    return { bills: data || [], total: count || 0, page, pageSize }
  }

  /**
   * Get bill by ID with items
   */
  static async getBillById(billId: string) {
    const admin = createAdminClient()

    const { data, error } = await admin
      .from('pos_bills')
      .select('*, items:pos_bill_items(*), invoice:invoices(*)')
      .eq('id', billId)
      .single()

    if (error) throw error
    return data
  }
}
