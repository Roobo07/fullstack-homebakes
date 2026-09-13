'use client';

import React from 'react';
import { formatCurrency } from '@/utils/formatters';

interface Variant {
  id: string;
  name: string; // e.g., "0.5 KG", "1 KG"
  price: number;
  inStock: boolean;
}

interface VariantSelectorProps {
  variants: Variant[];
  selectedId: string;
  onChange: (id: string) => void;
}

export default function VariantSelector({ variants, selectedId, onChange }: VariantSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {variants.map((variant) => {
        const isSelected = selectedId === variant.id;
        
        return (
          <button
            key={variant.id}
            disabled={!variant.inStock}
            onClick={() => onChange(variant.id)}
            className={`
              relative flex flex-col items-center justify-center px-4 py-3 rounded-xl border-2 transition-all min-w-[100px]
              ${!variant.inStock 
                ? 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed' 
                : isSelected 
                  ? 'bg-pink-50 border-pink-500 shadow-sm' 
                  : 'bg-white border-gray-200 hover:border-pink-300'
              }
            `}
          >
            <span className={`text-sm font-semibold ${isSelected ? 'text-pink-700' : 'text-gray-700'}`}>
              {variant.name}
            </span>
            <span className={`text-xs mt-1 ${isSelected ? 'text-pink-600' : 'text-gray-500'}`}>
              {formatCurrency(variant.price)}
            </span>
            {!variant.inStock && (
              <span className="absolute -top-2 -right-2 bg-gray-200 text-gray-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                Sold Out
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
