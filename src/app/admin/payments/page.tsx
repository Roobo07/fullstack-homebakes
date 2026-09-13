import React from 'react';

export default function PaymentsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Payments</h1>
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Date</th>
              <th>Order/Bill #</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">2023-10-01</td>
              <td>BILL-1001</td>
              <td>Walk-in</td>
              <td>₹1,100</td>
              <td>UPI</td>
              <td><span className="text-green-600 bg-green-100 px-2 py-1 rounded">Paid</span></td>
              <td className="text-blue-500 cursor-pointer">View</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
