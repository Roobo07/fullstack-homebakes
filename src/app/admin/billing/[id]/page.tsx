import React from 'react';
import Link from 'next/link';

export default function BillDetail({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bill Details: {params.id}</h1>
      <div className="bg-white p-6 rounded shadow">
        <p>Customer: Walk-in</p>
        <p>Total: ₹1,100</p>
        <Link href="/admin/billing" className="text-blue-500 mt-4 block">Back to Billing</Link>
      </div>
    </div>
  );
}
