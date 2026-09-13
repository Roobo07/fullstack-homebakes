import React from 'react';
import Link from 'next/link';

const categories = [
  { id: 'cakes', name: 'Cakes', emoji: '🎂', count: 24, color: 'bg-pink-100', hoverColor: 'hover:bg-pink-200' },
  { id: 'brownies', name: 'Brownies', emoji: '🟫', count: 12, color: 'bg-amber-100', hoverColor: 'hover:bg-amber-200' },
  { id: 'cupcakes', name: 'Cupcakes', emoji: '🧁', count: 18, color: 'bg-purple-100', hoverColor: 'hover:bg-purple-200' },
  { id: 'cookies', name: 'Cookies', emoji: '🍪', count: 15, color: 'bg-orange-100', hoverColor: 'hover:bg-orange-200' },
  { id: 'desserts', name: 'Desserts', emoji: '🍮', count: 10, color: 'bg-rose-100', hoverColor: 'hover:bg-rose-200' },
  { id: 'pastries', name: 'Pastries', emoji: '🥐', count: 8, color: 'bg-yellow-100', hoverColor: 'hover:bg-yellow-200' },
];

export default function CategoryGrid() {
  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Shop by Category</h2>
        <div className="w-24 h-1.5 bg-pink-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {categories.map((category) => (
          <Link 
            key={category.id} 
            href={`/categories/${category.id}`}
            className="group flex flex-col items-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-4 transition-colors ${category.color} ${category.hoverColor}`}>
              {category.emoji}
            </div>
            <h3 className="font-bold text-gray-800 group-hover:text-pink-600 transition-colors">{category.name}</h3>
            <span className="text-xs text-gray-500 mt-1">{category.count} items</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
