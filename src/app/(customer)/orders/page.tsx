import Link from 'next/link';

export default function CustomerOrdersPage() {
  const orders = [
    { id: 'ORD-8392', date: '2023-10-25', total: 1250, status: 'Preparing', items: 3 },
    { id: 'ORD-8301', date: '2023-10-15', total: 850, status: 'Delivered', items: 2 },
    { id: 'ORD-8155', date: '2023-09-30', total: 2100, status: 'Delivered', items: 5 },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Preparing': return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">Preparing</span>;
      case 'Delivered': return <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">Delivered</span>;
      default: return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-medium">{status}</span>;
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl py-10">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-lg border">
          <p className="text-gray-500 mb-4">You have no orders yet.</p>
          <Link href="/shop" className="text-blue-600 font-medium hover:underline">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="border rounded-lg p-6 bg-white shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-lg">#{order.id}</h3>
                  {getStatusBadge(order.status)}
                </div>
                <p className="text-gray-500 text-sm">Placed on {new Date(order.date).toLocaleDateString()} • {order.items} items</p>
              </div>
              
              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <div className="text-lg font-bold">₹{order.total}</div>
                <Link href={`/orders/${order.id}`} className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition text-sm font-medium">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Mock */}
      <div className="mt-8 flex justify-center gap-2">
        <button className="px-3 py-1 border rounded disabled:opacity-50" disabled>Previous</button>
        <button className="px-3 py-1 border rounded bg-blue-600 text-white">1</button>
        <button className="px-3 py-1 border rounded disabled:opacity-50" disabled>Next</button>
      </div>
    </div>
  );
}
