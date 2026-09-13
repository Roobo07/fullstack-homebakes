import React from 'react';
import { Printer, Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function InvoiceDetail({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Link href="/admin/invoices" className="flex items-center text-blue-600"><ArrowLeft className="w-4 h-4 mr-1"/> Back</Link>
        <div className="flex space-x-2">
          <button className="flex items-center border px-4 py-2 rounded"><Printer className="w-4 h-4 mr-2"/> Print</button>
          <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded"><Download className="w-4 h-4 mr-2"/> Download PDF</button>
        </div>
      </div>
      <div className="bg-white p-8 rounded shadow max-w-4xl mx-auto border">
        <div className="flex justify-between border-b pb-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">HomeBakes</h1>
            <p>123 Bakery Street, Food City</p>
            <p>Phone: +91 9876543210</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-semibold text-gray-600">INVOICE</h2>
            <p><strong># {params.id}</strong></p>
            <p>Date: 2023-10-01</p>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700">Bill To:</h3>
          <p>Walk-in Customer</p>
        </div>
        <table className="w-full text-left mb-6">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-2">Item</th>
              <th className="p-2">Qty</th>
              <th className="p-2 text-right">Price</th>
              <th className="p-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">Chocolate Cake (1KG)</td>
              <td className="p-2">1</td>
              <td className="p-2 text-right">₹1,100</td>
              <td className="p-2 text-right">₹1,100</td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end">
          <div className="w-64">
            <div className="flex justify-between py-1"><span className="font-semibold">Subtotal:</span><span>₹1,100</span></div>
            <div className="flex justify-between py-1"><span className="font-semibold">Tax:</span><span>₹0</span></div>
            <div className="flex justify-between py-2 border-t mt-2 text-xl font-bold"><span>Total:</span><span>₹1,100</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
