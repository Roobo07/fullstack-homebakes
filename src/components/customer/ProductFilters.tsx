'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';

export default function ProductFilters() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  
  const categories = ['Cakes', 'Brownies', 'Cupcakes', 'Cookies', 'Desserts', 'Pastries'];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Filters</h2>
        <button className="text-sm text-pink-600 hover:text-pink-700 font-medium">Clear All</button>
      </div>

      {/* Categories */}
      <div className="mb-6 border-b border-gray-100 pb-6">
        <button 
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="flex items-center justify-between w-full mb-4 text-gray-800 font-semibold"
        >
          Categories
          {isCategoryOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {isCategoryOpen && (
          <div className="space-y-3">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-pink-500 focus:ring-pink-500 transition-colors cursor-pointer"
                />
                <span className="text-gray-600 group-hover:text-pink-600 transition-colors">{cat}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6 border-b border-gray-100 pb-6">
        <button 
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="flex items-center justify-between w-full mb-4 text-gray-800 font-semibold"
        >
          Price Range
          {isPriceOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        
        {isPriceOpen && (
          <div className="flex items-center gap-3">
            <input 
              type="number" 
              placeholder="Min" 
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
            <span className="text-gray-400">-</span>
            <input 
              type="number" 
              placeholder="Max" 
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        )}
      </div>

      {/* Availability */}
      <div className="mb-6 border-b border-gray-100 pb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Availability</h3>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-gray-600">In Stock Only</span>
          <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-pink-500 transition-all" />
            <label htmlFor="toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"></label>
          </div>
        </label>
      </div>

      {/* Ratings */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-4">Rating</h3>
        <div className="space-y-3">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-300 text-pink-500 focus:ring-pink-500 transition-colors cursor-pointer"
              />
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
                ))}
                <span className="ml-2 text-sm text-gray-600">& Up</span>
              </div>
            </label>
          ))}
        </div>
      </div>
      
      <button className="w-full mt-8 bg-pink-500 text-white font-semibold py-3 rounded-xl hover:bg-pink-600 transition-colors md:hidden">
        Apply Filters
      </button>
    </div>
  );
}
