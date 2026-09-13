import React, { Suspense } from 'react';
import ProductCard from '@/components/customer/ProductCard';
import ProductFilters from '@/components/customer/ProductFilters';
import SearchBar from '@/components/customer/SearchBar';

// Mock Data
const allProducts = [
  { id: '1', name: 'Chocolate Truffle Cake', category: 'Cakes', price: 650, rating: 4.8, stockStatus: 'in_stock' as const },
  { id: '2', name: 'Red Velvet Cake', category: 'Cakes', price: 750, rating: 4.9, stockStatus: 'in_stock' as const, isFavorite: true },
  { id: '3', name: 'Black Forest Cake', category: 'Cakes', price: 600, rating: 4.5, stockStatus: 'in_stock' as const },
  { id: '4', name: 'Vanilla Cake', category: 'Cakes', price: 500, rating: 4.2, stockStatus: 'in_stock' as const },
  { id: '5', name: 'Assorted Brownie Box', category: 'Brownies', price: 350, rating: 4.7, stockStatus: 'in_stock' as const },
  { id: '6', name: 'Vanilla Cupcake Pack', category: 'Cupcakes', price: 280, rating: 4.5, stockStatus: 'low_stock' as const },
  { id: '7', name: 'Chocolate Chip Cookies', category: 'Cookies', price: 320, rating: 4.6, stockStatus: 'in_stock' as const },
  { id: '8', name: 'Fruit Tart', category: 'Desserts', price: 150, rating: 4.3, stockStatus: 'out_of_stock' as const },
];

export default function ShopPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = searchParams.q as string;
  
  // Filter products based on search query (mock implementation)
  const filteredProducts = query 
    ? allProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
    : allProducts;

  return (
    <div className="bg-gray-50/30 min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Our Menu</h1>
            <p className="text-gray-500">Discover our delicious range of baked goods</p>
          </div>
          
          <Suspense fallback={<div className="w-64 h-10 bg-gray-200 animate-pulse rounded-full"></div>}>
            <SearchBar />
          </Suspense>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <ProductFilters />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600 font-medium">Showing {filteredProducts.length} products</span>
              <select className="bg-white border border-gray-200 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Arrivals</option>
              </select>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 text-center rounded-2xl border border-gray-100 shadow-sm">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">We couldn't find any products matching your criteria.</p>
                <button className="mt-6 text-pink-600 font-semibold hover:text-pink-700">Clear all filters</button>
              </div>
            )}

            {/* Pagination Placeholder */}
            {filteredProducts.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 hover:border-pink-500 text-gray-500 hover:text-pink-500 transition-colors">1</button>
                  <button className="w-10 h-10 rounded-full flex items-center justify-center border border-pink-500 bg-pink-50 text-pink-600 font-bold">2</button>
                  <button className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 hover:border-pink-500 text-gray-500 hover:text-pink-500 transition-colors">3</button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
