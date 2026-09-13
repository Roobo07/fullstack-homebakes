'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/utils/formatters';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Mock results
  const results = query.length > 1 ? [
    { id: '1', name: 'Chocolate Truffle Cake', price: 650 },
    { id: '2', name: 'Red Velvet Cake', price: 750 },
  ] : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-lg z-50">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search for cakes, desserts..."
          className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-white transition-all"
        />
        <Search className="absolute left-3.5 text-gray-400" size={18} />
        {query && (
          <button 
            onClick={() => { setQuery(''); setIsOpen(false); }}
            className="absolute right-3.5 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {isOpen && query.length > 1 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {results.length > 0 ? (
            <ul>
              {results.map((result) => (
                <li key={result.id}>
                  <Link 
                    href={`/products/${result.id}`}
                    className="flex items-center justify-between px-4 py-3 hover:bg-pink-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-gray-800 font-medium">{result.name}</span>
                    <span className="text-pink-600 font-semibold">{formatCurrency(result.price)}</span>
                  </Link>
                </li>
              ))}
              <li className="border-t border-gray-100 p-2 text-center">
                <Link 
                  href={`/shop?q=${query}`}
                  className="text-sm font-semibold text-pink-600 hover:text-pink-700 block py-2"
                  onClick={() => setIsOpen(false)}
                >
                  View all results for "{query}"
                </Link>
              </li>
            </ul>
          ) : (
            <div className="p-6 text-center text-gray-500">
              No products found matching "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
