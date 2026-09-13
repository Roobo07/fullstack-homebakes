import React from 'react';
import Link from 'next/link';
import { ArrowRight, Cake } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-amber-50 to-orange-50 pt-20 pb-28 md:pt-32 md:pb-40 rounded-3xl mx-4 mt-4 shadow-sm border border-white/50">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 transform -rotate-12">🧁</div>
      <div className="absolute bottom-10 left-20 text-5xl opacity-20 transform rotate-12">🍪</div>
      <div className="absolute top-20 right-20 text-7xl opacity-20 transform rotate-12">🎂</div>
      <div className="absolute bottom-20 right-10 text-6xl opacity-20 transform -rotate-12">🥐</div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-pink-100 text-pink-700 text-sm font-semibold mb-6 tracking-wide uppercase">
          Welcome to HomeBakes
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
          Freshly Baked <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-amber-500">
            with Love
          </span>
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Artisanal cakes, decadent brownies, and handcrafted pastries made daily with the finest ingredients to make your celebrations extra special.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/shop" 
            className="w-full sm:w-auto px-8 py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-full font-bold text-lg shadow-lg shadow-pink-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            Shop Now <ArrowRight size={20} />
          </Link>
          <Link 
            href="/custom-cake" 
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 rounded-full font-bold text-lg shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Cake size={20} className="text-pink-500" /> Custom Cake
          </Link>
        </div>
      </div>
    </section>
  );
}
