import React from 'react';
import Link from 'next/link';
import { Eye, Printer } from 'lucide-react';

export default function BillingHistory() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Bill History</h1>
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Bill #</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">BILL-1012</td>
              <td>Walk-in</td>
              <td>1</td>
              <td>₹1,100</td>
              <td>UPI</td>
              <td>2023-10-01</td>
              <td className="flex space-x-2 py-2">
                <Link href="/admin/billing/BILL-1012" className="text-blue-500"><Eye className="w-4 h-4"/></Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
