import React from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Mock Data
const featuredProducts = [
  { id: '1', name: 'Chocolate Truffle Cake', category: 'Cakes', price: 650, rating: 4.8, stockStatus: 'in_stock' as const },
  { id: '2', name: 'Red Velvet Cake', category: 'Cakes', price: 750, rating: 4.9, stockStatus: 'in_stock' as const, isFavorite: true },
  { id: '3', name: 'Assorted Brownie Box', category: 'Brownies', price: 350, rating: 4.7, stockStatus: 'in_stock' as const },
  { id: '4', name: 'Vanilla Cupcake Pack', category: 'Cupcakes', price: 280, rating: 4.5, stockStatus: 'low_stock' as const },
];

export default function FeaturedProducts() {
  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            Signature <span className="text-pink-500 relative inline-block">
              Treats
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-amber-300" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span>
          </h2>
          <p className="text-gray-500">Our most loved baked goods, freshly prepared for you.</p>
        </div>
        <Link href="/shop" className="hidden md:flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700 transition-colors">
          View All <ArrowRight size={18} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
      
      <div className="mt-8 text-center md:hidden">
        <Link href="/shop" className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700 transition-colors bg-pink-50 px-6 py-3 rounded-full">
          View All Products <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
