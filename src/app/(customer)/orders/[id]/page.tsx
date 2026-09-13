'use client';

import { useParams } from 'next/navigation';
import OrderTimeline from '@/components/customer/OrderTimeline';

export default function OrderDetailPage() {
  const { id } = useParams();

  return (
    <div className="container mx-auto p-4 max-w-4xl py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Order #{id}</h1>
          <p className="text-gray-500">Placed on {new Date().toLocaleDateString()}</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full text-sm font-semibold border border-yellow-200">Preparing</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Order Status</h2>
            <OrderTimeline currentStep={3} isDelivery={true} />
          </div>

          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Items</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="pb-2">Item</th>
                  <th className="pb-2">Qty</th>
                  <th className="pb-2 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-3">Chocolate Truffle Cake</td>
                  <td className="py-3">1</td>
                  <td className="py-3 text-right">₹500</td>
                </tr>
                <tr>
                  <td className="py-3">Cupcakes (Box of 6)</td>
                  <td className="py-3">2</td>
                  <td className="py-3 text-right">₹600</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Payment Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>₹1,100</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Customization</span><span>₹0</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Discount</span><span className="text-green-600">-₹50</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Delivery Fee</span><span>₹100</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Tax</span><span>₹100</span></div>
              <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                <span>Total</span><span>₹1,250</span>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Delivery Info</h2>
            <p className="text-sm text-gray-700 mb-2"><strong>Address:</strong> 123 Main Street, Apt 4B, Cityville, State 12345</p>
            <p className="text-sm text-gray-700"><strong>Distance:</strong> 4.5 km</p>
          </div>

          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Payment Info</h2>
            <p className="text-sm text-gray-700"><strong>Method:</strong> UPI (Paid)</p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-1 text-sm">Special Instructions</h3>
            <p className="text-sm text-yellow-900">Please write "Happy Birthday John" on the cake. Do not ring doorbell.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
