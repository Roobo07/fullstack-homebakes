import React from 'react';
import { Plus } from 'lucide-react';

export default function ExpensesPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Expenses</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center">
          <Plus className="w-4 h-4 mr-2" /> Add Expense
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-500">Total Expenses</p>
          <p className="text-2xl font-bold">₹45,000</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-500">This Month</p>
          <p className="text-2xl font-bold">₹12,500</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-gray-500">Top Category</p>
          <p className="text-2xl font-bold">Ingredients</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">2023-10-01</td>
              <td>Ingredients</td>
              <td>Flour and Sugar</td>
              <td>₹2,500</td>
              <td>UPI</td>
              <td className="text-blue-500 cursor-pointer">Edit</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
