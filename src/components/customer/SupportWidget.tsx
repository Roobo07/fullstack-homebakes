'use client'

import { useState } from 'react'
import { MessageCircle, Phone, MessageSquare, Cake, Package, HelpCircle, X } from 'lucide-react'
import Link from 'next/link'
import { classNames } from '@/utils/formatters'

export function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const supportLinks = [
    { name: 'Call Bakery', icon: Phone, href: 'tel:+919876543210' },
    { name: 'WhatsApp', icon: MessageSquare, href: 'https://wa.me/919876543210' },
    { name: 'Custom Cake', icon: Cake, href: '/custom-cake' },
    { name: 'Track Order', icon: Package, href: '/account/orders' },
    { name: 'General Support', icon: HelpCircle, href: '/contact' },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-4 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-5 fade-in-20">
          <div className="bg-[#fce7f3] p-4 text-[#831843]">
            <h3 className="font-semibold text-lg">Hi there! 👋</h3>
            <p className="text-sm opacity-90">How can we help you today?</p>
          </div>
          <div className="p-2 space-y-1">
            {supportLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#faf5f0] rounded-xl transition-colors text-gray-700"
              >
                <link.icon className="w-5 h-5 text-[#db2777]" />
                <span className="font-medium text-sm">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95",
          isOpen ? "bg-gray-800 text-white" : "bg-[#ec4899] text-white"
        )}
        aria-label="Toggle support menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  )
}
