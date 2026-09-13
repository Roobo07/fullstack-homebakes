import Link from 'next/link';

export default function AdminCustomersPage() {
  const customers = [
    { id: 'CUST-001', name: 'John Doe', phone: '+91 9876543210', email: 'john@example.com', orders: 12, spent: 8450, lastOrder: '2023-10-25' },
    { id: 'CUST-002', name: 'Jane Smith', phone: '+91 9876543211', email: 'jane@example.com', orders: 5, spent: 3200, lastOrder: '2023-10-20' },
    { id: 'CUST-003', name: 'Mike Johnson', phone: '+91 9876543212', email: 'mike@example.com', orders: 1, spent: 1500, lastOrder: '2023-10-15' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customers Management</h1>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6 flex flex-wrap gap-4 items-center">
        <input type="text" placeholder="Search by Name, Email or Phone..." className="border rounded-md px-3 py-2 min-w-[300px]" />
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">Search</button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Total Orders</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Total Spent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                  <div className="text-xs text-gray-500">{customer.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{customer.phone}</div>
                  <div className="text-sm text-gray-500">{customer.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium">
                  {customer.orders}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                  ₹{customer.spent}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.lastOrder}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Link href={`/admin/customers/${customer.id}`} className="text-blue-600 hover:text-blue-900 font-medium">View Profile</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-700">Showing 1 to 3 of 150 customers</span>
        <div className="flex space-x-1">
          <button className="px-3 py-1 border rounded bg-white text-gray-500 disabled:opacity-50" disabled>Prev</button>
          <button className="px-3 py-1 border rounded bg-blue-50 text-blue-600 font-medium border-blue-200">1</button>
          <button className="px-3 py-1 border rounded bg-white text-gray-700">2</button>
          <button className="px-3 py-1 border rounded bg-white text-gray-700">Next</button>
        </div>
      </div>
    </div>
  );
}
