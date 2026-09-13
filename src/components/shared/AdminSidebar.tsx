'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, Package, FolderTree, Warehouse, ShoppingBag, 
  Cake, Receipt, FileText, Users, Truck, CreditCard, 
  FileCheck, Wallet, Clock, BarChart3, PieChart, UserCheck, 
  TrendingUp, Tag, Megaphone, Star, Bell, Settings,
  Menu, X
} from 'lucide-react'
import { useState } from 'react'
import { classNames } from '@/utils/formatters'

const menuGroups = [
  {
    title: 'Overview',
    items: [{ name: 'Dashboard', href: '/admin', icon: LayoutDashboard }]
  },
  {
    title: 'Products',
    items: [
      { name: 'Products', href: '/admin/products', icon: Package },
      { name: 'Categories', href: '/admin/categories', icon: FolderTree },
      { name: 'Inventory', href: '/admin/inventory', icon: Warehouse },
    ]
  },
  {
    title: 'Orders',
    items: [
      { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
      { name: 'Custom Cakes', href: '/admin/custom-cakes', icon: Cake },
    ]
  },
  {
    title: 'Billing & Delivery',
    items: [
      { name: 'New Bill', href: '/admin/billing/new', icon: Receipt },
      { name: 'Bill History', href: '/admin/billing/history', icon: FileText },
      { name: 'Delivery', href: '/admin/delivery', icon: Truck },
    ]
  },
  {
    title: 'Finance & Reports',
    items: [
      { name: 'Payments', href: '/admin/finance/payments', icon: CreditCard },
      { name: 'Daily Closing', href: '/admin/finance/closing', icon: Clock },
      { name: 'Sales Report', href: '/admin/reports/sales', icon: BarChart3 },
    ]
  },
  {
    title: 'Settings',
    items: [
      { name: 'Settings', href: '/admin/settings', icon: Settings },
    ]
  }
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle */}
      <button 
        className="md:hidden fixed bottom-4 right-4 z-50 bg-gray-900 text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <aside className={classNames(
        "bg-gray-900 text-gray-300 h-full flex flex-col transition-all duration-300 z-40 fixed md:relative",
        isOpen ? "w-64" : "w-20",
        isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800 shrink-0">
          {isOpen && <span className="font-bold text-white text-lg truncate">Admin Panel</span>}
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white hidden md:block">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-700">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="px-3">
              {isOpen && <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2 px-3">{group.title}</h3>}
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                  return (
                    <li key={item.name}>
                      <Link 
                        href={item.href}
                        className={classNames(
                          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                          isActive ? "bg-gray-800 text-white" : "hover:bg-gray-800 hover:text-white",
                          !isOpen && "justify-center"
                        )}
                        title={!isOpen ? item.name : undefined}
                      >
                        <item.icon className={classNames("w-5 h-5 shrink-0", isActive ? "text-[#ec4899]" : "")} />
                        {isOpen && <span className="text-sm font-medium">{item.name}</span>}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}
