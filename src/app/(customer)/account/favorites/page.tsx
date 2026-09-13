import Link from 'next/link';

export default function FavoritesPage() {
  const favorites = [
    { id: 1, name: 'Chocolate Truffle Cake', price: 850, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop' },
    { id: 2, name: 'Red Velvet Cupcakes (6)', price: 450, image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=500&auto=format&fit=crop' },
    { id: 3, name: 'Blueberry Cheesecake', price: 950, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&auto=format&fit=crop' },
  ];

  return (
    <div className="container mx-auto p-4 max-w-6xl py-8">
      <h1 className="text-3xl font-bold mb-8">My Favorites</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border">
          <div className="text-gray-400 mb-4 flex justify-center">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">No favorites yet</h2>
          <p className="text-gray-500 mb-6">You haven't saved any items to your favorites.</p>
          <Link href="/shop" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">Browse Menu</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map(item => (
            <div key={item.id} className="bg-white border rounded-xl overflow-hidden hover:shadow-md transition group">
              <div className="relative h-48 w-full bg-gray-200">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm text-red-500 hover:scale-110 transition">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 truncate">{item.name}</h3>
                <p className="text-gray-600 mb-4 font-medium">₹{item.price}</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
