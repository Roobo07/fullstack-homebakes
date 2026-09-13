import React from 'react';
import Link from 'next/link';
import { Plus, List } from 'lucide-react';

export default function BillingOverview() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">POS Billing</h1>
        <div className="flex space-x-2">
          <Link href="/admin/billing/history" className="bg-gray-200 text-gray-800 px-4 py-2 rounded flex items-center">
            <List className="w-4 h-4 mr-2" /> History
          </Link>
          <Link href="/admin/billing/new" className="bg-green-600 text-white px-4 py-2 rounded flex items-center font-semibold shadow">
            <Plus className="w-4 h-4 mr-2" /> New Bill
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Today's Bills</p>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">POS Revenue</p>
          <p className="text-2xl font-bold text-green-600">₹8,450</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Cash Sales</p>
          <p className="text-xl font-bold">₹2,100</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">UPI/Card Sales</p>
          <p className="text-xl font-bold">₹6,350</p>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Bills</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Bill #</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">BILL-1012</td>
              <td>Walk-in</td>
              <td>₹1,100</td>
              <td>UPI</td>
              <td>12:45 PM</td>
              <td><Link href="/admin/billing/BILL-1012" className="text-blue-500">View</Link></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
