'use client';

import React, { useState } from 'react';
import ProductGallery from '@/components/customer/ProductGallery';
import VariantSelector from '@/components/customer/VariantSelector';
import { Heart, Minus, Plus, ShoppingCart, Star, Clock, AlertTriangle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/utils/formatters';

// Mock Data
const productData = {
  id: '1',
  name: 'Premium Chocolate Truffle Cake',
  category: 'Cakes',
  description: 'Rich, dense, and incredibly fudgy chocolate cake layered with silky dark chocolate ganache. Made with premium Belgian chocolate, this is a true delight for chocolate lovers.',
  rating: 4.8,
  reviewsCount: 124,
  prepTime: '4-6 hours',
  allergens: ['Dairy', 'Gluten'],
  variants: [
    { id: 'v1', name: '0.5 KG', price: 650, inStock: true },
    { id: 'v2', name: '1 KG', price: 1200, inStock: true },
    { id: 'v3', name: '2 KG', price: 2300, inStock: false },
  ],
  images: ['🎂', '🍫', '🍰', '😋']
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [selectedVariantId, setSelectedVariantId] = useState(productData.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  const selectedVariant = productData.variants.find(v => v.id === selectedVariantId) || productData.variants[0];
  const totalPrice = selectedVariant.price * quantity;

  return (
    <div className="bg-white min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-pink-600">Home</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link href="/shop" className="hover:text-pink-600">Shop</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link href="/categories/cakes" className="hover:text-pink-600">{productData.category}</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-gray-900 font-medium truncate">{productData.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div>
            <ProductGallery images={productData.images} productName={productData.name} />
          </div>

          {/* Details */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-bold text-amber-600 uppercase tracking-wider">{productData.category}</span>
              <div className="flex items-center gap-1 text-green-600 text-sm font-semibold bg-green-50 px-2 py-1 rounded">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                In Stock
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{productData.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className={i < Math.floor(productData.rating) ? 'fill-current' : 'text-gray-300'} />
                ))}
              </div>
              <span className="text-sm text-gray-500 underline cursor-pointer">{productData.reviewsCount} Reviews</span>
            </div>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">{productData.description}</p>

            <div className="mb-8 border-t border-gray-100 pt-8">
              <h3 className="font-bold text-gray-900 mb-4">Select Size</h3>
              <VariantSelector 
                variants={productData.variants} 
                selectedId={selectedVariantId} 
                onChange={setSelectedVariantId} 
              />
            </div>

            {/* Custom Message */}
            <div className="mb-8">
              <label className="block font-bold text-gray-900 mb-2">Message on Cake (Optional)</label>
              <input 
                type="text" 
                maxLength={30}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g., Happy Birthday!"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <span className="text-xs text-gray-400 mt-1 block text-right">{message.length}/30</span>
            </div>

            <div className="flex items-center gap-6 mb-8 border-t border-gray-100 pt-8">
              <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-pink-600 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="w-10 text-center font-bold text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-pink-600 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>

              <div className="text-3xl font-extrabold text-gray-900">
                {formatCurrency(totalPrice)}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-pink-500/30 transition-all flex items-center justify-center gap-2">
                <ShoppingCart size={20} /> Add to Cart
              </button>
              <button className="flex-1 bg-gray-900 hover:bg-black text-white py-4 rounded-xl font-bold text-lg transition-all">
                Buy Now
              </button>
              <button className="w-14 h-14 flex-shrink-0 border-2 border-gray-200 text-gray-400 rounded-xl flex items-center justify-center hover:border-pink-200 hover:text-pink-500 transition-colors">
                <Heart size={24} />
              </button>
            </div>

            {/* Badges */}
            <div className="mt-10 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                <Clock size={16} className="text-blue-500" /> Prep time: {productData.prepTime}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-red-50 px-3 py-2 rounded-lg">
                <AlertTriangle size={16} className="text-red-500" /> Allergens: {productData.allergens.join(', ')}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-200 pt-10">
          <div className="flex gap-8 border-b border-gray-200 mb-8">
            {['description', 'ingredients', 'reviews'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-lg font-bold capitalize transition-colors relative ${
                  activeTab === tab ? 'text-pink-600' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-pink-500 rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>

          <div className="py-4">
            {activeTab === 'description' && (
              <div className="prose max-w-none text-gray-600">
                <p>Our Premium Chocolate Truffle Cake is a masterpiece of flavors and textures. Every bite offers a rich, melt-in-your-mouth experience that chocolate aficionados crave.</p>
                <ul className="mt-4 space-y-2">
                  <li>✨ 100% Vegetarian</li>
                  <li>✨ Made with premium Belgian chocolate</li>
                  <li>✨ Freshly baked on order</li>
                  <li>✨ No artificial preservatives</li>
                </ul>
              </div>
            )}
            {activeTab === 'ingredients' && (
              <div className="text-gray-600">
                <p>Refined Wheat Flour, Sugar, Butter, Cocoa Powder (Premium Grade), Dark Chocolate (54%), Fresh Cream, Baking Powder, Baking Soda, Vanilla Extract.</p>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="text-gray-600">
                <p>Customer reviews will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
