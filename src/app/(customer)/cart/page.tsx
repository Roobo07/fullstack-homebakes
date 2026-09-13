'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react'
import { useCartStore } from '@/stores/cartStore'
import { formatCurrency } from '@/utils/formatters'

export default function CartPage() {
  // We removed getTotalPrice here because we can just use getSubtotal
  const { items, removeItem, updateQuantity, clearCart, getSubtotal } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
        <div className="mb-8 flex justify-center text-6xl">
          🛍️
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any sweet treats to your cart yet.
        </p>
        <Link 
          href="/shop" 
          className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white px-8 py-3 rounded-full font-medium hover:from-pink-600 hover:to-rose-500 transition-all shadow-md"
        >
          Continue Shopping <ArrowRight size={18} />
        </Link>
      </div>
    )
  }

  const subtotal = getSubtotal()
  const total = subtotal // Total equals subtotal before delivery is added at checkout
  const deliveryFee = 0 

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left column - Cart Items */}
        <div className="flex-grow">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 space-y-6">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="flex gap-4 py-4 border-b border-gray-50 last:border-0 last:pb-0">
                  {/* Image placeholder */}
                  <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-pink-100 to-rose-50 flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                    {/* Fixed: Changed productImage to image */}
                    {(item as any).image || (item as any).productImage ? (
                       <Image src={(item as any).image || (item as any).productImage} alt={item.productName} fill className="object-cover" />
                    ) : (
                      <ShoppingBag className="text-pink-200" size={32} />
                    )}
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">{item.productName}</h3>
                        {item.variantName && (
                          <p className="text-sm text-gray-500 mt-1">{item.variantName}</p>
                        )}
                        {/* Fixed: Changed customization to customizationText */}
                        {item.customizationText && (
                          <p className="text-xs text-pink-600 mt-1 bg-pink-50 inline-block px-2 py-1 rounded">
                            {item.customizationText}
                          </p>
                        )}
                      </div>
                      <div className="font-semibold text-gray-800">
                        {/* Fixed: Used basePrice instead of price just in case */}
                        {formatCurrency(((item as any).price || (item as any).basePrice || 0) * item.quantity)}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                        <button 
                          onClick={() => updateQuantity(item.productId, item.variantId, Math.max(1, item.quantity - 1))}
                          className="p-2 text-gray-500 hover:text-pink-600 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center font-medium text-gray-700">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                          className="p-2 text-gray-500 hover:text-pink-600 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                        title="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-between items-center">
              <Link href="/shop" className="text-sm text-pink-600 font-medium hover:underline flex items-center gap-1">
                <ArrowRight size={16} className="rotate-180" /> Continue Shopping
              </Link>
              <button 
                onClick={clearCart}
                className="text-sm text-gray-500 hover:text-red-500 font-medium transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
        
        {/* Right column - Order Summary */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Order Summary</h2>
            
            <div className="space-y-4 text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-800">{formatCurrency(subtotal)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-sm italic">Calculated at checkout</span>
              </div>
            </div>
            
            {/* Coupon input */}
            <div className="mb-6">
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tag size={16} className="text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Coupon code" 
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 text-sm"
                  />
                </div>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                  Apply
                </button>
              </div>
            </div>
            
            <hr className="border-gray-100 mb-6" />
            
            <div className="flex justify-between items-center mb-8">
              <span className="font-bold text-gray-800">Total</span>
              <span className="text-2xl font-bold text-gray-900">{formatCurrency(total)}</span>
            </div>
            
            <Link 
              href="/checkout"
              className="w-full block text-center bg-gradient-to-r from-pink-500 to-rose-400 text-white py-3 md:py-4 rounded-xl font-bold text-lg hover:from-pink-600 hover:to-rose-500 transition-all shadow-md shadow-pink-500/20 mb-4"
            >
              Proceed to Checkout
            </Link>
            
            <div className="text-center flex items-center justify-center gap-2 text-xs text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}