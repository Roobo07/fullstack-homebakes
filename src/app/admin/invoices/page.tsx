import React from 'react';
import Link from 'next/link';
import { Eye, Download } from 'lucide-react';

export default function InvoicesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Invoices</h1>
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Invoice #</th>
              <th>Order/Bill #</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">INV-1001</td>
              <td>BILL-1001</td>
              <td>Walk-in</td>
              <td>₹1,100</td>
              <td><span className="text-green-600 bg-green-100 px-2 py-1 rounded">Paid</span></td>
              <td>2023-10-01</td>
              <td className="flex space-x-2 py-2">
                <Link href="/admin/invoices/INV-1001" className="text-blue-500"><Eye className="w-4 h-4"/></Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
