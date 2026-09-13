'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Heart } from 'lucide-react'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const cartItemCount = 0 // Placeholder

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#fffbf5]/90 backdrop-blur shadow-sm text-[#2d1f12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🎂</span>
              <span className="font-bold text-xl text-[#831843]">HomeBakes</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-[#ec4899] transition-colors">Home</Link>
            <Link href="/shop" className="hover:text-[#ec4899] transition-colors">Shop</Link>
            <div className="relative group cursor-pointer flex items-center">
              <span className="hover:text-[#ec4899] transition-colors">Categories</span>
              <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform" />
            </div>
            <Link href="/custom-cake" className="hover:text-[#ec4899] transition-colors">Custom Cakes</Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button aria-label="Search" className="hover:text-[#ec4899] transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link href="/login" aria-label="User account" className="hover:text-[#ec4899] transition-colors">
              <User className="w-5 h-5" />
            </Link>
            <Link href="/cart" aria-label="Shopping cart" className="relative hover:text-[#ec4899] transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#ec4899] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="hover:text-[#ec4899] transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#fffbf5] border-t border-[#e8d5c0]">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 rounded-md hover:bg-[#fce7f3] hover:text-[#ec4899]">Home</Link>
            <Link href="/shop" className="block px-3 py-2 rounded-md hover:bg-[#fce7f3] hover:text-[#ec4899]">Shop</Link>
            <Link href="/custom-cake" className="block px-3 py-2 rounded-md hover:bg-[#fce7f3] hover:text-[#ec4899]">Custom Cakes</Link>
            <Link href="/cart" className="block px-3 py-2 rounded-md hover:bg-[#fce7f3] hover:text-[#ec4899]">Cart ({cartItemCount})</Link>
            <Link href="/account" className="block px-3 py-2 rounded-md hover:bg-[#fce7f3] hover:text-[#ec4899]">My Account</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
