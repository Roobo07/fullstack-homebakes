'use client';

import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[]; // URLs or placeholder emojis
  productName: string;
}

export default function ProductGallery({ images = [], productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const displayImages = images.length > 0 ? images : ['🎂', '🧁', '🍰', '🍪'];

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square w-full rounded-2xl bg-gradient-to-br from-pink-50 to-amber-50 flex items-center justify-center border border-gray-100 shadow-sm overflow-hidden">
        <span className="text-9xl transition-transform duration-500 hover:scale-110 cursor-zoom-in">
          {displayImages[selectedIndex]}
        </span>
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {displayImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`flex-shrink-0 w-20 h-20 rounded-xl bg-gradient-to-br from-pink-50 to-amber-50 flex items-center justify-center border-2 transition-all ${
              selectedIndex === idx ? 'border-pink-500 shadow-md' : 'border-transparent hover:border-pink-200'
            }`}
          >
            <span className="text-3xl">{img}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
