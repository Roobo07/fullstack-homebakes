'use client';

import React, { useState } from 'react';
import { Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

export default function CouponsPage() {
  const [coupons, setCoupons] = useState([
    { id: 1, code: 'WELCOME10', type: 'percentage', value: 10, minOrder: 0, maxUses: null, used: 45, validUntil: '2027-12-31', status: 'active' },
    { id: 2, code: 'BIRTHDAY200', type: 'fixed', value: 200, minOrder: 800, maxUses: 100, used: 23, validUntil: '2026-12-31', status: 'active' },
    { id: 3, code: 'FESTIVE15', type: 'percentage', value: 15, minOrder: 500, maxUses: 500, used: 500, validUntil: '2025-11-01', status: 'expired' },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Coupons</h1>
        <button className="bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-pink-700">
          <Plus size={20} />
          Add Coupon
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b text-left">
            <tr>
              <th className="p-4 font-medium text-gray-600">Code</th>
              <th className="p-4 font-medium text-gray-600">Type / Value</th>
              <th className="p-4 font-medium text-gray-600">Min Order</th>
              <th className="p-4 font-medium text-gray-600">Usage</th>
              <th className="p-4 font-medium text-gray-600">Valid Until</th>
              <th className="p-4 font-medium text-gray-600">Status</th>
              <th className="p-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-semibold text-gray-800">{coupon.code}</td>
                <td className="p-4">
                  {coupon.type === 'percentage' ? `${coupon.value}%` : `₹${coupon.value}`} off
                </td>
                <td className="p-4">₹{coupon.minOrder}</td>
                <td className="p-4">{coupon.used} / {coupon.maxUses || '∞'}</td>
                <td className="p-4">{coupon.validUntil}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    coupon.status === 'active' ? 'bg-green-100 text-green-800' :
                    coupon.status === 'expired' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1)}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                  <button className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
