'use client'

import { useState, useEffect } from 'react'
import { AdminSidebar } from '@/components/shared/AdminSidebar'
import { Bell, User } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  
  // Simulate auth check
  useEffect(() => {
    const checkAuth = async () => {
      // Logic to check Supabase auth
      setTimeout(() => setIsAuthenticated(true), 500)
    }
    checkAuth()
  }, [])

  if (isAuthenticated === null) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">Loading...</div>
  }

  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">Redirecting to login...</div>
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-gray-900">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 z-10">
          <h1 className="font-semibold text-xl text-gray-800">HomeBakes Admin</h1>
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-gray-700">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-gray-900">
              <User className="w-5 h-5" />
              <span className="text-sm font-medium">Admin User</span>
            </div>
          </div>
        </header>
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
