import React from 'react';
import Link from 'next/link';

export default async function BillDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">Bill Details: {id}</h1>
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
        <p className="text-gray-700 dark:text-gray-300"><strong className="text-zinc-900 dark:text-zinc-50">Customer:</strong> Walk-in</p>
        <p className="text-gray-700 dark:text-gray-300"><strong className="text-zinc-900 dark:text-zinc-50">Total:</strong> ₹1,100</p>
        <Link href="/admin/billing" className="text-amber-600 dark:text-amber-500 hover:underline font-medium mt-4 block">
          ← Back to Billing
        </Link>
      </div>
    </div>
  );
}
