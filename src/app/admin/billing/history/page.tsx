import React from 'react';
import Link from 'next/link';
import { Eye } from 'lucide-react';

export default function BillingHistory() {
  return (
    <div className="p-6 max-w-7xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">Bill History</h1>
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400">
              <th className="py-3 px-4 font-semibold">Bill #</th>
              <th className="py-3 px-4 font-semibold">Customer</th>
              <th className="py-3 px-4 font-semibold">Items</th>
              <th className="py-3 px-4 font-semibold">Total</th>
              <th className="py-3 px-4 font-semibold">Payment</th>
              <th className="py-3 px-4 font-semibold">Date</th>
              <th className="py-3 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
              <td className="py-3 px-4 font-medium text-amber-600 dark:text-amber-400">BILL-1012</td>
              <td className="py-3 px-4 text-zinc-800 dark:text-zinc-200">Walk-in</td>
              <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">1</td>
              <td className="py-3 px-4 text-zinc-900 dark:text-zinc-100 font-medium">₹1,100</td>
              <td className="py-3 px-4">
                <span className="bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 text-xs px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800 font-semibold">
                  UPI
                </span>
              </td>
              <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">2023-10-01</td>
              <td className="py-3 px-4">
                <Link 
                  href="/admin/billing/BILL-1012" 
                  className="p-2 inline-flex items-center text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-lg transition-colors"
                  title="View Bill"
                >
                  <Eye className="w-4 h-4"/>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
