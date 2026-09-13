'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const [status, setStatus] = useState('Preparing');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Order #{id}</h1>
          <p className="text-gray-500">Placed on Oct 25, 2023 at 10:30 AM (Online)</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded shadow-sm bg-white hover:bg-gray-50 text-gray-700">Print Invoice</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
              <h2 className="font-bold text-lg">Order Items</h2>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-semibold">{status}</span>
            </div>
            <div className="p-4">
              <table className="w-full text-left">
                <thead className="border-b text-gray-500 text-sm">
                  <tr>
                    <th className="pb-2 font-medium">Item</th>
                    <th className="pb-2 font-medium">Price</th>
                    <th className="pb-2 font-medium text-center">Qty</th>
                    <th className="pb-2 font-medium text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-3">
                      <p className="font-medium">Chocolate Truffle Cake</p>
                      <p className="text-xs text-gray-500">Variant: 1kg, Eggless</p>
                    </td>
                    <td className="py-3">₹500</td>
                    <td className="py-3 text-center">1</td>
                    <td className="py-3 text-right font-medium">₹500</td>
                  </tr>
                  <tr>
                    <td className="py-3">
                      <p className="font-medium">Red Velvet Cupcakes</p>
                    </td>
                    <td className="py-3">₹300</td>
                    <td className="py-3 text-center">2</td>
                    <td className="py-3 text-right font-medium">₹600</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="mt-4 pt-4 border-t flex justify-end">
                <div className="w-64 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>₹1,100</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Delivery Fee</span><span>₹100</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Tax</span><span>₹50</span></div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                    <span>Total</span><span>₹1,250</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-lg shadow-sm p-4">
            <h2 className="font-bold text-lg mb-4">Update Status</h2>
            <div className="flex gap-4">
              <select 
                className="border p-2 rounded w-full max-w-xs"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Payment Confirmed">Payment Confirmed</option>
                <option value="Preparing">Preparing</option>
                <option value="Ready">Ready</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update Status</button>
            </div>
          </div>

        </div>

        <div className="space-y-6">
          <div className="bg-white border rounded-lg shadow-sm p-4">
            <h2 className="font-bold text-lg mb-3">Customer Info</h2>
            <p className="font-medium">John Doe</p>
            <p className="text-gray-600 text-sm">john@example.com</p>
            <p className="text-gray-600 text-sm">+91 9876543210</p>
            <button className="text-blue-600 text-sm font-medium mt-2 hover:underline">View Profile</button>
          </div>

          <div className="bg-white border rounded-lg shadow-sm p-4">
            <h2 className="font-bold text-lg mb-3">Delivery Info</h2>
            <div className="bg-blue-50 text-blue-800 p-2 rounded text-sm mb-3 font-medium">Home Delivery</div>
            <p className="text-sm font-medium">Scheduled for:</p>
            <p className="text-sm text-gray-600 mb-3">Oct 26, 2023 | 11:00 AM - 1:00 PM</p>
            
            <p className="text-sm font-medium">Address:</p>
            <p className="text-sm text-gray-600">123 Main Street, Apt 4B<br/>Cityville, State 12345</p>
          </div>

          <div className="bg-white border rounded-lg shadow-sm p-4">
            <h2 className="font-bold text-lg mb-3">Payment Info</h2>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Method</span>
              <span className="font-medium text-sm">UPI Online</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Status</span>
              <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-semibold">Paid</span>
            </div>
          </div>
          
          <div className="bg-white border rounded-lg shadow-sm p-4">
            <h2 className="font-bold text-lg mb-3">Internal Notes</h2>
            <textarea 
              className="w-full border rounded p-2 text-sm" 
              rows={3} 
              placeholder="Add notes for staff..."
            ></textarea>
            <button className="mt-2 text-sm bg-gray-100 px-3 py-1.5 rounded hover:bg-gray-200 w-full font-medium">Save Note</button>
          </div>
        </div>
      </div>
    </div>
  );
}
