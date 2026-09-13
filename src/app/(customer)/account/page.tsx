import Link from 'next/link';

export default function AccountDashboardPage() {
  return (
    <div className="container mx-auto p-4 max-w-5xl py-8 font-sans">
      <h1 className="text-3xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">Welcome back, John! 👋</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Manage your orders, addresses, and account details here.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase">Total Orders</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">12</p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg text-amber-600 dark:text-amber-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase">Total Spent</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">₹8,450</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-lg text-emerald-600 dark:text-emerald-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase">Pending Orders</p>
            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">1</p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-lg text-amber-600 dark:text-amber-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[
          { title: 'Orders', href: '/orders', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z', desc: 'View order history and track status' },
          { title: 'Profile', href: '/account/profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', desc: 'Manage your personal details' },
          { title: 'Addresses', href: '/account/addresses', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z', desc: 'Saved delivery addresses' },
          { title: 'Favorites', href: '/account/favorites', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', desc: 'Your saved favorite items' },
          { title: 'Custom Cakes', href: '/custom-cakes', icon: 'M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z', desc: 'Your custom cake requests' }
        ].map(link => (
          <Link key={link.title} href={link.href} className="group p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:shadow-md transition hover:border-amber-300 dark:hover:border-amber-700">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-2 bg-gray-50 dark:bg-zinc-800 rounded-lg group-hover:bg-amber-50 dark:group-hover:bg-amber-950/40 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-amber-600 dark:group-hover:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={link.icon} /></svg>
              </div>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">{link.title}</h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm ml-12">{link.desc}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">Recent Orders</h2>
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 dark:bg-zinc-800/70 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-6 py-4 font-semibold">Order #</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Items</th>
              <th className="px-6 py-4 font-semibold">Total</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {[1, 2, 3].map((i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                <td className="px-6 py-4 text-amber-600 dark:text-amber-400 font-medium"><Link href="/orders/ORD-8392">ORD-839{i}</Link></td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">Oct {25 - i}, 2023</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{i + 1} items</td>
                <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100">₹{1250 - (i * 100)}</td>
                <td className="px-6 py-4"><span className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full text-xs font-semibold">Delivered</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
