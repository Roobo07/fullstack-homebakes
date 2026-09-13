'use client'

import React, { useState } from 'react'
import Image from 'next/image'

export default function CustomCakePage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  // Example basic state, in real app use proper form handling (e.g. react-hook-form)
  const [formData, setFormData] = useState({
    cakeType: '',
    flavor: '',
    weight: '',
    shape: 'Round',
    creamType: '',
    color: '',
    toppings: [] as string[],
    decoration: '',
    theme: '',
    message: '',
    specialInstructions: '',
    deliveryDate: '',
    deliveryTime: ''
  })

  const handleNext = () => setStep(prev => Math.min(prev + 1, 5))
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-20 text-center max-w-lg">
        <div className="text-6xl mb-6">🎂</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your custom cake request has been submitted!</h1>
        <p className="text-gray-600 mb-8">We'll get back to you within 24 hours with a quote and confirmation.</p>
        <button onClick={() => window.location.href = '/'} className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition">
          Return Home
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Design Your Custom Cake</h1>
      
      {/* Step Indicator */}
      <div className="flex justify-between items-center mb-10 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= i ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
            {i}
          </div>
        ))}
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">1. Cake Basics</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cake Type</label>
                <select className="w-full border rounded-lg p-2" required>
                  <option value="">Select type...</option>
                  <option>Birthday</option><option>Wedding</option><option>Anniversary</option>
                  <option>Celebration</option><option>Photo Cake</option><option>Tier Cake</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Flavor</label>
                <select className="w-full border rounded-lg p-2" required>
                  <option value="">Select flavor...</option>
                  <option>Chocolate</option><option>Vanilla</option><option>Red Velvet</option>
                  <option>Butterscotch</option><option>Pineapple</option><option>Black Forest</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                <select className="w-full border rounded-lg p-2" required>
                  <option value="">Select weight...</option>
                  <option>0.5 KG</option><option>1 KG</option><option>1.5 KG</option>
                  <option>2 KG</option><option>3 KG</option><option>5 KG</option>
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">2. Design & Decor</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shape</label>
                <select className="w-full border rounded-lg p-2">
                  <option>Round</option><option>Square</option><option>Heart</option>
                  <option>Rectangle</option><option>Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cream Type</label>
                <select className="w-full border rounded-lg p-2">
                  <option>Buttercream</option><option>Whipped Cream</option>
                  <option>Fondant</option><option>Ganache</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
                <input type="text" className="w-full border rounded-lg p-2" placeholder="e.g. Pastel Pink" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">3. Message & Theme</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                <input type="text" className="w-full border rounded-lg p-2" placeholder="e.g. Superhero, Princess, Minimalist" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cake Message (Max 50 chars)</label>
                <input type="text" maxLength={50} className="w-full border rounded-lg p-2" placeholder="e.g. Happy Birthday John!" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                <textarea className="w-full border rounded-lg p-2 h-24" placeholder="Any specific details we should know?"></textarea>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">4. Image & Delivery</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reference Image (Optional)</label>
                <input type="file" accept="image/*" className="w-full border rounded-lg p-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
                  <input type="date" className="w-full border rounded-lg p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
                  <select className="w-full border rounded-lg p-2" required>
                    <option value="">Select time...</option>
                    <option>Morning (10AM - 1PM)</option>
                    <option>Afternoon (1PM - 4PM)</option>
                    <option>Evening (4PM - 7PM)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">5. Review & Submit</h2>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm text-gray-700">
                <p>Please review your custom cake details. Once submitted, our team will review the request and get back to you with pricing details.</p>
                <p className="font-medium mt-4">Estimated Price Range: ₹1500 - ₹3000</p>
                <p className="text-xs text-gray-500">Final price will depend on design complexity and exact weight.</p>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between pt-6 border-t">
            {step > 1 ? (
              <button type="button" onClick={handlePrev} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                Back
              </button>
            ) : <div></div>}
            
            {step < 5 ? (
              <button type="button" onClick={handleNext} className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600">
                Next Step
              </button>
            ) : (
              <button type="submit" className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-lg font-medium hover:from-pink-600 hover:to-rose-500 shadow-md">
                Submit Request
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
