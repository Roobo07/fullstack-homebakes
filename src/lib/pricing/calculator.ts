/**
 * Server-side pricing calculator.
 * 
 * IMPORTANT: This module is used to recalculate all prices server-side
 * before creating orders. Never trust client-side price calculations.
 */

export interface PriceLineItem {
  unitPrice: number
  quantity: number
  customizationCharge: number
  discountAmount: number
}

export interface PriceCalculationInput {
  items: PriceLineItem[]
  couponDiscount: number
  deliveryFee: number
  taxPercentage: number
  taxEnabled: boolean
}

export interface PriceCalculationResult {
  subtotal: number
  customizationTotal: number
  itemDiscountTotal: number
  couponDiscount: number
  deliveryFee: number
  taxableAmount: number
  taxAmount: number
  total: number
  breakdown: {
    label: string
    amount: number
    type: 'add' | 'subtract'
  }[]
}

/**
 * Calculate the complete price breakdown for an order.
 * This function must be called server-side before creating any order.
 */
export function calculateOrderPrice(input: PriceCalculationInput): PriceCalculationResult {
  // Calculate subtotal from items
  const subtotal = input.items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  )

  // Calculate customization charges
  const customizationTotal = input.items.reduce(
    (total, item) => total + item.customizationCharge * item.quantity,
    0
  )

  // Calculate item-level discounts
  const itemDiscountTotal = input.items.reduce(
    (total, item) => total + item.discountAmount,
    0
  )

  // Coupon discount (capped at subtotal + customization - item discounts)
  const maxCouponDiscount = subtotal + customizationTotal - itemDiscountTotal
  const couponDiscount = Math.min(input.couponDiscount, maxCouponDiscount)

  // Taxable amount (after all discounts, before delivery)
  const taxableAmount = Math.max(
    0,
    subtotal + customizationTotal - itemDiscountTotal - couponDiscount
  )

  // Tax calculation
  let taxAmount = 0
  if (input.taxEnabled && input.taxPercentage > 0) {
    taxAmount = Math.round((taxableAmount * input.taxPercentage) / 100 * 100) / 100
  }

  // Total
  const total = Math.max(0, taxableAmount + taxAmount + input.deliveryFee)

  // Build breakdown
  const breakdown: PriceCalculationResult['breakdown'] = [
    { label: 'Subtotal', amount: subtotal, type: 'add' },
  ]

  if (customizationTotal > 0) {
    breakdown.push({ label: 'Customization', amount: customizationTotal, type: 'add' })
  }

  if (itemDiscountTotal > 0) {
    breakdown.push({ label: 'Item Discount', amount: itemDiscountTotal, type: 'subtract' })
  }

  if (couponDiscount > 0) {
    breakdown.push({ label: 'Coupon Discount', amount: couponDiscount, type: 'subtract' })
  }

  if (taxAmount > 0) {
    breakdown.push({
      label: `Tax (${input.taxPercentage}%)`,
      amount: taxAmount,
      type: 'add',
    })
  }

  if (input.deliveryFee > 0) {
    breakdown.push({ label: 'Delivery Fee', amount: input.deliveryFee, type: 'add' })
  }

  breakdown.push({ label: 'Total', amount: total, type: 'add' })

  return {
    subtotal,
    customizationTotal,
    itemDiscountTotal,
    couponDiscount,
    deliveryFee: input.deliveryFee,
    taxableAmount,
    taxAmount,
    total,
    breakdown,
  }
}

/**
 * Calculate individual line item total.
 */
export function calculateLineItemTotal(item: PriceLineItem): number {
  return (item.unitPrice + item.customizationCharge) * item.quantity - item.discountAmount
}

/**
 * Validate that the client-provided total matches server calculation.
 * Returns true if totals match within a small tolerance (for floating point).
 */
export function validateClientTotal(
  clientTotal: number,
  serverTotal: number,
  tolerance: number = 1 // ₹1 tolerance for rounding
): boolean {
  return Math.abs(clientTotal - serverTotal) <= tolerance
}
