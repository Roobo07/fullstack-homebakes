'use client';

import React, { useState } from 'react';
import { Truck, Map, Package, CheckCircle } from 'lucide-react';

export default function DeliveriesPage() {
  const [deliveries] = useState([
    { id: 'ORD-1021', customer: 'Alice Smith', address: '123 Park Ave, Mumbai', distance: '2.5 km', fee: 30, status: 'pending' },
    { id: 'ORD-1022', customer: 'Bob Jones', address: '45 Hill Road, Bandra', distance: '6.0 km', fee: 80, status: 'out_for_delivery' },
    { id: 'ORD-1023', customer: 'Charlie Brown', address: '78 Sea Link, Worli', distance: '4.2 km', fee: 50, status: 'delivered' },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Delivery Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full text-blue-600"><Package size={24} /></div>
          <div><p className="text-sm text-gray-500">Total Deliveries</p><p className="text-2xl font-bold">24</p></div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center gap-4">
          <div className="bg-yellow-100 p-3 rounded-full text-yellow-600"><Truck size={24} /></div>
          <div><p className="text-sm text-gray-500">Pending</p><p className="text-2xl font-bold">5</p></div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-full text-purple-600"><Map size={24} /></div>
          <div><p className="text-sm text-gray-500">Out for Delivery</p><p className="text-2xl font-bold">8</p></div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-full text-green-600"><CheckCircle size={24} /></div>
          <div><p className="text-sm text-gray-500">Delivered Today</p><p className="text-2xl font-bold">11</p></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center bg-gray-50">
            <h2 className="font-semibold text-gray-700">Active Deliveries</h2>
            <select className="border rounded px-2 py-1 text-sm bg-white">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Out for Delivery</option>
            </select>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b text-left text-sm text-gray-500">
              <tr>
                <th className="p-4 font-medium">Order #</th>
                <th className="p-4 font-medium">Customer / Address</th>
                <th className="p-4 font-medium">Dist. / Fee</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map(delivery => (
                <tr key={delivery.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-pink-600">{delivery.id}</td>
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{delivery.customer}</div>
                    <div className="text-sm text-gray-500 truncate max-w-[200px]">{delivery.address}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-gray-900">{delivery.distance}</div>
                    <div className="text-sm text-gray-500">₹{delivery.fee}</div>
                  </td>
                  <td className="p-4">
                    <select 
                      defaultValue={delivery.status}
                      className="border rounded px-2 py-1 text-sm bg-white"
                    >
                      <option value="pending">Pending</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden h-96 flex flex-col">
          <div className="p-4 border-b bg-gray-50">
            <h2 className="font-semibold text-gray-700">Delivery Map</h2>
          </div>
          <div className="flex-1 bg-gray-200 flex items-center justify-center text-gray-500 p-6 text-center">
            <div>
              <Map size={48} className="mx-auto mb-2 opacity-50" />
              <p>[Interactive Map Placeholder]</p>
              <p className="text-sm mt-2 opacity-75">Shows delivery pins with optimal routing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
