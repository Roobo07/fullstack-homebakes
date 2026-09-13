'use client';
import { useState } from 'react';

export default function AddressesPage() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="container mx-auto p-4 max-w-4xl py-8 font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Saved Addresses</h1>
        <button 
          onClick={() => setShowAddForm(!showAddForm)} 
          className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition shadow-sm"
        >
          {showAddForm ? 'Cancel' : '+ Add New Address'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm mb-8 animate-in fade-in slide-in-from-top-4">
          <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">Add New Address</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Label (e.g. Home, Work)</label>
                <input type="text" className="w-full border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-amber-500" placeholder="Home" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input type="text" className="w-full border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-amber-500" placeholder="John Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address Line 1</label>
              <input type="text" className="w-full border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-amber-500" placeholder="Flat No., Building, Street" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address Line 2 (Area, Landmark)</label>
              <input type="text" className="w-full border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-amber-500" placeholder="Near XYZ Park" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                <input type="text" className="w-full border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">State</label>
                <input type="text" className="w-full border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-amber-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pincode</label>
                <input type="text" className="w-full border border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-amber-500" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input type="checkbox" id="default" className="rounded text-amber-600 focus:ring-amber-500" />
              <label htmlFor="default" className="text-sm text-gray-700 dark:text-gray-300">Set as default address</label>
            </div>
            <div className="pt-4 flex gap-3">
              <button type="button" className="bg-amber-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-amber-700 transition shadow-sm">Save Address</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-amber-200 bg-amber-50/30 dark:bg-amber-950/10 dark:border-amber-900/50 rounded-xl p-6 relative shadow-sm">
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="text-gray-500 hover:text-amber-600 p-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
            <button className="text-gray-500 hover:text-red-600 p-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50">Home</h3>
            <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 text-xs px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">Default</span>
          </div>
          <p className="text-gray-800 dark:text-gray-200 font-medium mb-1">John Doe</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            123 Main Street, Apt 4B<br/>
            Near Central Park<br/>
            Cityville, State 12345<br/>
            Ph: +91 9876543210
          </p>
        </div>

        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 bg-white dark:bg-zinc-900 relative hover:shadow-sm transition">
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="text-gray-500 hover:text-amber-600 p-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
            <button className="text-gray-500 hover:text-red-600 p-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
          </div>
          <h3 className="font-bold text-lg mb-2 text-zinc-900 dark:text-zinc-50">Work</h3>
          <p className="text-gray-800 dark:text-gray-200 font-medium mb-1">John Doe</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            456 Business Tower, 8th Floor<br/>
            Tech Park<br/>
            Metropolis, State 67890<br/>
            Ph: +91 9876543210
          </p>
          <button className="text-amber-600 dark:text-amber-500 text-sm font-medium mt-3 hover:underline">Set as Default</button>
        </div>
      </div>
    </div>
  );
}
