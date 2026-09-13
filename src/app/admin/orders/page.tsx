import Link from 'next/link';

export default function AdminOrdersPage() {
  const orders = [
    { id: 'ORD-8392', customer: 'John Doe', type: 'Online', amount: 1250, status: 'Preparing', payment: 'Paid', date: '2023-10-25 10:30 AM' },
    { id: 'ORD-8391', customer: 'Jane Smith', type: 'POS', amount: 450, status: 'Delivered', payment: 'Cash', date: '2023-10-25 09:15 AM' },
    { id: 'ORD-8390', customer: 'Mike Johnson', type: 'Online', amount: 2100, status: 'Out for Delivery', payment: 'Paid', date: '2023-10-24 18:45 PM' },
    { id: 'ORD-8389', customer: 'Sarah Williams', type: 'Online', amount: 850, status: 'Order Placed', payment: 'Pending', date: '2023-10-24 14:20 PM' },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Preparing': return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">Preparing</span>;
      case 'Delivered': return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">Delivered</span>;
      case 'Out for Delivery': return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">Out for Delivery</span>;
      case 'Order Placed': return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-semibold">Order Placed</span>;
      default: return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-semibold">{status}</span>;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">Create New POS Order</button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border mb-6 flex flex-wrap gap-4 items-center">
        <input type="text" placeholder="Search by Order # or Customer..." className="border rounded-md px-3 py-2 min-w-[250px]" />
        
        <select className="border rounded-md px-3 py-2">
          <option value="">All Statuses</option>
          <option value="Preparing">Preparing</option>
          <option value="Delivered">Delivered</option>
        </select>
        
        <select className="border rounded-md px-3 py-2">
          <option value="">All Types</option>
          <option value="Online">Online</option>
          <option value="POS">POS</option>
        </select>
        
        <input type="date" className="border rounded-md px-3 py-2" />
        
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">Filter</button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600"><Link href={`/admin/orders/${order.id}`}>{order.id}</Link></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.type === 'Online' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'}`}>
                    {order.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">₹{order.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(order.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={order.payment === 'Paid' ? 'text-green-600 font-medium' : 'text-yellow-600 font-medium'}>{order.payment}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Link href={`/admin/orders/${order.id}`} className="text-blue-600 hover:text-blue-900">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-700">Showing 1 to 4 of 24 entries</span>
        <div className="flex space-x-1">
          <button className="px-3 py-1 border rounded bg-white text-gray-500 disabled:opacity-50" disabled>Prev</button>
          <button className="px-3 py-1 border rounded bg-blue-50 text-blue-600 font-medium border-blue-200">1</button>
          <button className="px-3 py-1 border rounded bg-white text-gray-700">2</button>
          <button className="px-3 py-1 border rounded bg-white text-gray-700">3</button>
          <button className="px-3 py-1 border rounded bg-white text-gray-700">Next</button>
        </div>
      </div>
    </div>
  );
}
