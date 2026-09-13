import React from 'react';
import HeroBanner from '@/components/customer/HeroBanner';
import FeaturedProducts from '@/components/customer/FeaturedProducts';
import CategoryGrid from '@/components/customer/CategoryGrid';
import { Star, Truck, HeartHandshake, BadgeCheck } from 'lucide-react';

export default async function HomePage() {
  // Try to fetch data from Supabase, use fallback if it fails
  // Since we don't have a live connection, we rely on the component's mock data
  
  return (
    <main className="min-h-screen bg-gray-50/30">
      <HeroBanner />
      
      <CategoryGrid />
      
      <FeaturedProducts />

      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-b from-white to-pink-50/50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">Why Choose HomeBakes</h2>
            <div className="w-24 h-1.5 bg-amber-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 text-center">
              <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">Finest ingredients carefully selected to bake the perfect treat.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 text-center">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Same day delivery available for orders placed before 12 PM.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 text-center">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartHandshake size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Made with Love</h3>
              <p className="text-gray-600 text-sm">100% vegetarian, eggless options available for all products.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BadgeCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Custom Designs</h3>
              <p className="text-gray-600 text-sm">Personalized cakes tailored exactly to your dream design.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">Sweet Words from Happy Customers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Priya S.", text: "The chocolate truffle cake was amazing! Melt in mouth perfection. Everyone at the party loved it.", rating: 5 },
              { name: "Rahul M.", text: "Ordered a custom cake for my daughter's birthday. It looked beautiful and tasted even better.", rating: 5 },
              { name: "Anita K.", text: "Best brownies in town. The packaging was beautiful and delivery was on time.", rating: 4 }
            ].map((review, i) => (
              <div key={i} className="bg-pink-50/50 p-8 rounded-3xl relative">
                <div className="flex text-amber-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={20} className="fill-current" />)}
                </div>
                <p className="text-gray-700 italic mb-6">"{review.text}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center font-bold text-pink-700">
                    {review.name.charAt(0)}
                  </div>
                  <span className="font-bold text-gray-900">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
