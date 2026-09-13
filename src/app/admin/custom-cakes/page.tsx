import React from 'react';
import Link from 'next/link';
import { Search, Eye, Filter } from 'lucide-react';

export default function CustomCakesPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Custom Cake Requests</h1>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">Request #</th>
              <th>Customer</th>
              <th>Cake Type</th>
              <th>Weight</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">REQ-1001</td>
              <td>John Doe</td>
              <td>Birthday Fondant</td>
              <td>2 KG</td>
              <td><span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800">Under Review</span></td>
              <td>2023-10-01</td>
              <td>
                <Link href="/admin/custom-cakes/REQ-1001" className="text-blue-500 flex items-center"><Eye className="w-4 h-4 mr-1"/> View</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
