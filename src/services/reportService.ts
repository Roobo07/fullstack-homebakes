import { createAdminClient } from '@/lib/supabase/admin'

export class ReportService {
  /**
   * Get sales summary for a date range
   */
  static async getSalesSummary(startDate: string, endDate: string) {
    const admin = createAdminClient()

    // Online orders
    const { data: onlineOrders } = await admin
      .from('orders')
      .select('total_amount, payment_method, status, created_at')
      .eq('order_type', 'online')
      .in('status', ['confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered'])
      .gte('created_at', startDate)
      .lte('created_at', endDate)

    // POS bills
    const { data: posBills } = await admin
      .from('pos_bills')
      .select('total_amount, payment_method, created_at')
      .gte('created_at', startDate)
      .lte('created_at', endDate)

    const onlineRevenue = (onlineOrders || []).reduce(
      (sum, o) => sum + Number(o.total_amount), 0
    )
    const posRevenue = (posBills || []).reduce(
      (sum, b) => sum + Number(b.total_amount), 0
    )
    const totalRevenue = onlineRevenue + posRevenue
    const totalOrders = (onlineOrders?.length || 0) + (posBills?.length || 0)
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

    // Payment method breakdown
    const paymentBreakdown: Record<string, number> = {}
    ;[...(onlineOrders || []), ...(posBills || [])].forEach((item) => {
      const method = item.payment_method || 'other'
      paymentBreakdown[method] = (paymentBreakdown[method] || 0) + Number(item.total_amount)
    })

    return {
      totalRevenue,
      onlineRevenue,
      posRevenue,
      totalOrders,
      onlineOrders: onlineOrders?.length || 0,
      posOrders: posBills?.length || 0,
      avgOrderValue: Math.round(avgOrderValue),
      paymentBreakdown,
    }
  }

  /**
   * Get top-selling products
   */
  static async getTopProducts(startDate: string, endDate: string, limit = 10) {
    const admin = createAdminClient()

    // From online orders
    const { data: onlineItems } = await admin
      .from('order_items')
      .select(`
        product_id, product_name, variant_name,
        quantity, total_price,
        order:orders!inner(created_at, status)
      `)
      .gte('order.created_at', startDate)
      .lte('order.created_at', endDate)
      .in('order.status', ['confirmed', 'preparing', 'ready', 'delivered'])

    // From POS bills
    const { data: posItems } = await admin
      .from('pos_bill_items')
      .select(`
        product_id, product_name, variant_name,
        quantity, total_price,
        bill:pos_bills!inner(created_at)
      `)
      .gte('bill.created_at', startDate)
      .lte('bill.created_at', endDate)

    // Aggregate by product
    const productMap = new Map<string, {
      name: string
      totalQuantity: number
      totalRevenue: number
    }>()

    const allItems = [...(onlineItems || []), ...(posItems || [])]
    allItems.forEach((item) => {
      const key = item.product_id || item.product_name
      const existing = productMap.get(key) || {
        name: item.product_name,
        totalQuantity: 0,
        totalRevenue: 0,
      }
      existing.totalQuantity += item.quantity
      existing.totalRevenue += Number(item.total_price)
      productMap.set(key, existing)
    })

    return Array.from(productMap.values())
      .sort((a, b) => b.totalRevenue - a.totalRevenue)
      .slice(0, limit)
  }

  /**
   * Get profit/loss summary
   */
  static async getProfitLoss(startDate: string, endDate: string) {
    const admin = createAdminClient()

    // Revenue from orders
    const { data: orders } = await admin
      .from('orders')
      .select('total_amount, delivery_fee')
      .in('status', ['confirmed', 'preparing', 'ready', 'delivered'])
      .gte('created_at', startDate)
      .lte('created_at', endDate)

    // Revenue from POS
    const { data: bills } = await admin
      .from('pos_bills')
      .select('total_amount')
      .gte('created_at', startDate)
      .lte('created_at', endDate)

    // Expenses
    const { data: expenses } = await admin
      .from('expenses')
      .select('amount, category')
      .gte('expense_date', startDate.split('T')[0])
      .lte('expense_date', endDate.split('T')[0])

    // Refunds
    const { data: refunds } = await admin
      .from('refunds')
      .select('amount')
      .eq('status', 'processed')
      .gte('created_at', startDate)
      .lte('created_at', endDate)

    const totalRevenue =
      (orders || []).reduce((s, o) => s + Number(o.total_amount), 0) +
      (bills || []).reduce((s, b) => s + Number(b.total_amount), 0)

    const totalExpenses = (expenses || []).reduce(
      (s, e) => s + Number(e.amount), 0
    )
    const totalRefunds = (refunds || []).reduce(
      (s, r) => s + Number(r.amount), 0
    )

    // Expense breakdown by category
    const expenseBreakdown: Record<string, number> = {}
    ;(expenses || []).forEach((e) => {
      expenseBreakdown[e.category] =
        (expenseBreakdown[e.category] || 0) + Number(e.amount)
    })

    const netProfit = totalRevenue - totalExpenses - totalRefunds
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0

    return {
      totalRevenue,
      totalExpenses,
      totalRefunds,
      netProfit,
      profitMargin: Math.round(profitMargin * 100) / 100,
      expenseBreakdown,
    }
  }

  /**
   * Get customer analytics
   */
  static async getCustomerAnalytics(startDate: string, endDate: string) {
    const admin = createAdminClient()

    const { count: totalCustomers } = await admin
      .from('customers')
      .select('*', { count: 'exact', head: true })

    const { count: newCustomers } = await admin
      .from('customers')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startDate)
      .lte('created_at', endDate)

    const { data: topCustomers } = await admin
      .from('customers')
      .select('id, full_name, phone, total_orders, total_spent, average_order_value')
      .order('total_spent', { ascending: false })
      .limit(10)

    return {
      totalCustomers: totalCustomers || 0,
      newCustomers: newCustomers || 0,
      topCustomers: topCustomers || [],
    }
  }

  /**
   * Get daily sales for chart data
   */
  static async getDailySales(startDate: string, endDate: string) {
    const admin = createAdminClient()

    const { data: orders } = await admin
      .from('orders')
      .select('total_amount, created_at')
      .in('status', ['confirmed', 'preparing', 'ready', 'delivered'])
      .gte('created_at', startDate)
      .lte('created_at', endDate)

    const { data: bills } = await admin
      .from('pos_bills')
      .select('total_amount, created_at')
      .gte('created_at', startDate)
      .lte('created_at', endDate)

    // Group by date
    const dailyMap = new Map<string, { online: number; pos: number; total: number }>()

    ;(orders || []).forEach((o) => {
      const date = new Date(o.created_at).toISOString().split('T')[0]
      const existing = dailyMap.get(date) || { online: 0, pos: 0, total: 0 }
      existing.online += Number(o.total_amount)
      existing.total += Number(o.total_amount)
      dailyMap.set(date, existing)
    })

    ;(bills || []).forEach((b) => {
      const date = new Date(b.created_at).toISOString().split('T')[0]
      const existing = dailyMap.get(date) || { online: 0, pos: 0, total: 0 }
      existing.pos += Number(b.total_amount)
      existing.total += Number(b.total_amount)
      dailyMap.set(date, existing)
    })

    return Array.from(dailyMap.entries())
      .map(([date, data]) => ({ date, ...data }))
      .sort((a, b) => a.date.localeCompare(b.date))
  }
}
