import React from 'react';
import ProductCard from '@/components/customer/ProductCard';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

// Mock Data
const allProducts = [
  { id: '1', name: 'Chocolate Truffle Cake', category: 'Cakes', price: 650, rating: 4.8, stockStatus: 'in_stock' as const },
  { id: '2', name: 'Red Velvet Cake', category: 'Cakes', price: 750, rating: 4.9, stockStatus: 'in_stock' as const },
  { id: '3', name: 'Black Forest Cake', category: 'Cakes', price: 600, rating: 4.5, stockStatus: 'in_stock' as const },
  { id: '4', name: 'Vanilla Cake', category: 'Cakes', price: 500, rating: 4.2, stockStatus: 'in_stock' as const },
];

const categoryInfo = {
  cakes: { name: 'Cakes', emoji: '🎂', desc: 'Beautifully crafted cakes for every celebration.' },
  brownies: { name: 'Brownies', emoji: '🟫', desc: 'Fudgy, gooey, and rich chocolate brownies.' },
  cupcakes: { name: 'Cupcakes', emoji: '🧁', desc: 'Bite-sized joy available in multiple flavors.' },
};

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categoryInfo[params.slug as keyof typeof categoryInfo] || { name: params.slug, emoji: '🍰', desc: 'Explore our delicious offerings.' };

  return (
    <div className="bg-gray-50/30 min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-pink-600">Home</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link href="/categories" className="hover:text-pink-600">Categories</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-gray-900 font-medium capitalize">{category.name}</span>
        </div>

        {/* Category Header */}
        <div className="bg-white rounded-3xl p-10 md:p-16 mb-12 text-center border border-pink-100 shadow-sm relative overflow-hidden">
          <div className="absolute -top-10 -right-10 text-9xl opacity-10">{category.emoji}</div>
          <div className="absolute -bottom-10 -left-10 text-9xl opacity-10">{category.emoji}</div>
          
          <div className="relative z-10">
            <span className="text-6xl mb-6 inline-block">{category.emoji}</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 capitalize">{category.name}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{category.desc}</p>
          </div>
        </div>

        {/* Products */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-600 font-medium">Showing {allProducts.length} items</span>
          <select className="bg-white border border-gray-200 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
