'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function AdminCustomerDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Customer Profile</h1>
        <p className="text-gray-500">{id}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border rounded-lg shadow-sm p-6 flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">JD</div>
          <div>
            <h2 className="text-xl font-bold">John Doe</h2>
            <p className="text-sm text-gray-600">john@example.com</p>
            <p className="text-sm text-gray-600">+91 9876543210</p>
          </div>
        </div>
        
        <div className="bg-white border rounded-lg shadow-sm p-6 flex flex-col justify-center">
          <p className="text-sm text-gray-500 font-medium uppercase mb-1">Total Orders</p>
          <p className="text-3xl font-bold">12</p>
          <p className="text-xs text-green-600 mt-1">Active customer</p>
        </div>
        
        <div className="bg-white border rounded-lg shadow-sm p-6 flex flex-col justify-center">
          <p className="text-sm text-gray-500 font-medium uppercase mb-1">Total Spent</p>
          <p className="text-3xl font-bold">₹8,450</p>
          <p className="text-xs text-gray-500 mt-1">Avg. value: ₹704/order</p>
        </div>
      </div>

      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <div className="flex border-b">
          <button 
            className={`px-6 py-3 font-medium text-sm ${activeTab === 'orders' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('orders')}
          >
            Order History
          </button>
          <button 
            className={`px-6 py-3 font-medium text-sm ${activeTab === 'addresses' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('addresses')}
          >
            Saved Addresses
          </button>
          <button 
            className={`px-6 py-3 font-medium text-sm ${activeTab === 'custom' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('custom')}
          >
            Custom Cake Requests
          </button>
        </div>

        <div className="p-0">
          {activeTab === 'orders' && (
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-medium border-b">
                <tr>
                  <th className="px-6 py-3">Order #</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Items</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {[1, 2, 3].map(i => (
                  <tr key={i} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4 text-blue-600 font-medium">ORD-839{i}</td>
                    <td className="px-6 py-4">Oct {25 - i}, 2023</td>
                    <td className="px-6 py-4"><span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-xs">Online</span></td>
                    <td className="px-6 py-4">{i + 1} items</td>
                    <td className="px-6 py-4 font-medium">₹{1250 - (i*100)}</td>
                    <td className="px-6 py-4"><span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">Delivered</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'addresses' && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold">Home</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">Default</span>
                </div>
                <p className="text-sm text-gray-600">123 Main Street, Apt 4B<br/>Near Central Park<br/>Cityville, State 12345</p>
              </div>
            </div>
          )}

          {activeTab === 'custom' && (
            <div className="p-6 text-center text-gray-500 py-12">
              No custom cake requests found for this customer.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
