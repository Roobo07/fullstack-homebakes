'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)
  const [announcement, setAnnouncement] = useState<string | null>(null)

  useEffect(() => {
    // Simulate fetching from DB
    const fetchAnnouncement = async () => {
      // setAnnouncement(null) // if none
      setAnnouncement('🎉 Special Offer: Get 10% off on all Custom Cakes this week! Use code CAKE10')
    }
    fetchAnnouncement()
  }, [])

  if (!isVisible || !announcement) return null

  return (
    <div className="bg-[#fbbf24] text-[#831843] px-4 py-2 text-sm font-medium relative flex items-center justify-center animate-in slide-in-from-top">
      <p className="text-center pr-6">{announcement}</p>
      <button 
        onClick={() => setIsVisible(false)} 
        className="absolute right-4 hover:text-black transition-colors"
        aria-label="Dismiss announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
