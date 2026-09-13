'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  rating?: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  isFavorite?: boolean;
}

export default function ProductCard({
  id,
  name,
  category,
  price,
  rating = 4.5,
  stockStatus,
  isFavorite = false,
}: ProductCardProps) {
  const [favorite, setFavorite] = React.useState(isFavorite);

  const getStatusBadge = () => {
    switch (stockStatus) {
      case 'in_stock':
        return <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">In Stock</span>;
      case 'low_stock':
        return <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">Low Stock</span>;
      case 'out_of_stock':
        return <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">Out of Stock</span>;
    }
  };

  return (
    <div className="relative group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      {getStatusBadge()}
      <button 
        onClick={(e) => {
          e.preventDefault();
          setFavorite(!favorite);
        }}
        className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-pink-50 transition-colors z-10"
      >
        <Heart size={20} className={favorite ? 'fill-pink-500 text-pink-500' : 'text-gray-400'} />
      </button>

      <Link href={`/products/${id}`}>
        <div className="aspect-square w-full bg-gradient-to-br from-pink-100 to-amber-50 flex items-center justify-center relative overflow-hidden">
          <span className="text-6xl group-hover:scale-110 transition-transform duration-300">🎂</span>
        </div>
      </Link>

      <div className="p-4">
        <div className="text-xs text-amber-600 font-medium mb-1 uppercase tracking-wider">{category}</div>
        <Link href={`/products/${id}`}>
          <h3 className="font-semibold text-gray-800 text-lg mb-1 truncate group-hover:text-pink-600 transition-colors">{name}</h3>
        </Link>
        
        <div className="flex items-center mb-3">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className={i < Math.floor(rating) ? 'fill-current' : 'text-gray-300'} />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({rating})</span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="font-bold text-gray-900">
            From {formatCurrency(price)}
          </div>
          <button 
            disabled={stockStatus === 'out_of_stock'}
            className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 disabled:bg-gray-300 transition-colors"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
