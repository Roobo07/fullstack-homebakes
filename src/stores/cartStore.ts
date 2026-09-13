'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  productId: string
  variantId: string
  productName: string
  variantName: string
  unitPrice: number
  quantity: number
  imageUrl?: string
  customizationText?: string
  customizationCharge: number
  maxStock: number
}

interface CartState {
  items: CartItem[]
  couponCode: string | null
  couponDiscount: number
  deliveryMethod: 'pickup' | 'delivery' | null
  deliveryFee: number
  deliveryAddress: {
    addressLine: string
    area: string
    city: string
    state: string
    postalCode: string
    latitude: number | null
    longitude: number | null
  } | null
  deliveryDate: string | null
  deliveryTimeSlot: string | null
  specialInstructions: string

  // Actions
  addItem: (item: CartItem) => void
  removeItem: (productId: string, variantId: string) => void
  updateQuantity: (productId: string, variantId: string, quantity: number) => void
  updateCustomization: (productId: string, variantId: string, text: string, charge: number) => void
  setCoupon: (code: string | null, discount: number) => void
  setDeliveryMethod: (method: 'pickup' | 'delivery' | null) => void
  setDeliveryFee: (fee: number) => void
  setDeliveryAddress: (address: CartState['deliveryAddress']) => void
  setDeliveryDate: (date: string | null) => void
  setDeliveryTimeSlot: (slot: string | null) => void
  setSpecialInstructions: (instructions: string) => void
  clearCart: () => void

  // Computed
  getItemCount: () => number
  getSubtotal: () => number
  getCustomizationTotal: () => number
  getTotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      couponDiscount: 0,
      deliveryMethod: null,
      deliveryFee: 0,
      deliveryAddress: null,
      deliveryDate: null,
      deliveryTimeSlot: null,
      specialInstructions: '',

      addItem: (item) =>
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.productId === item.productId && i.variantId === item.variantId
          )

          if (existingIndex >= 0) {
            const updatedItems = [...state.items]
            const existing = updatedItems[existingIndex]
            const newQuantity = Math.min(existing.quantity + item.quantity, item.maxStock)
            updatedItems[existingIndex] = { ...existing, quantity: newQuantity }
            return { items: updatedItems }
          }

          return { items: [...state.items, item] }
        }),

      removeItem: (productId, variantId) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.variantId === variantId)
          ),
        })),

      updateQuantity: (productId, variantId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (i) => !(i.productId === productId && i.variantId === variantId)
              ),
            }
          }

          return {
            items: state.items.map((i) =>
              i.productId === productId && i.variantId === variantId
                ? { ...i, quantity: Math.min(quantity, i.maxStock) }
                : i
            ),
          }
        }),

      updateCustomization: (productId, variantId, text, charge) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.variantId === variantId
              ? { ...i, customizationText: text, customizationCharge: charge }
              : i
          ),
        })),

      setCoupon: (code, discount) =>
        set({ couponCode: code, couponDiscount: discount }),

      setDeliveryMethod: (method) =>
        set({ deliveryMethod: method }),

      setDeliveryFee: (fee) =>
        set({ deliveryFee: fee }),

      setDeliveryAddress: (address) =>
        set({ deliveryAddress: address }),

      setDeliveryDate: (date) =>
        set({ deliveryDate: date }),

      setDeliveryTimeSlot: (slot) =>
        set({ deliveryTimeSlot: slot }),

      setSpecialInstructions: (instructions) =>
        set({ specialInstructions: instructions }),

      clearCart: () =>
        set({
          items: [],
          couponCode: null,
          couponDiscount: 0,
          deliveryMethod: null,
          deliveryFee: 0,
          deliveryAddress: null,
          deliveryDate: null,
          deliveryTimeSlot: null,
          specialInstructions: '',
        }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.unitPrice * item.quantity,
          0
        )
      },

      getCustomizationTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.customizationCharge * item.quantity,
          0
        )
      },

      getTotal: () => {
        const state = get()
        const subtotal = state.getSubtotal()
        const customization = state.getCustomizationTotal()
        const delivery = state.deliveryFee
        const discount = state.couponDiscount
        return Math.max(0, subtotal + customization + delivery - discount)
      },
    }),
    {
      name: 'homebakes-cart',
      partialize: (state) => ({
        items: state.items,
        couponCode: state.couponCode,
        couponDiscount: state.couponDiscount,
        deliveryMethod: state.deliveryMethod,
        deliveryFee: state.deliveryFee,
        deliveryAddress: state.deliveryAddress,
        deliveryDate: state.deliveryDate,
        deliveryTimeSlot: state.deliveryTimeSlot,
        specialInstructions: state.specialInstructions,
      }),
    }
  )
)
