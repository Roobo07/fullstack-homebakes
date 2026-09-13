import React from 'react';

export default function CustomCakeDetail({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Request {params.id}</h1>
      <div className="bg-white p-6 rounded shadow grid grid-cols-2 gap-4">
        <div>
          <h2 className="font-semibold text-lg mb-2">Customer Info</h2>
          <p>Name: John Doe</p>
          <p>Phone: +91 9876543210</p>
        </div>
        <div>
          <h2 className="font-semibold text-lg mb-2">Cake Specs</h2>
          <p>Type: Birthday Fondant</p>
          <p>Weight: 2 KG</p>
          <p>Flavor: Chocolate Truffle</p>
        </div>
      </div>
      <div className="mt-6 flex space-x-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Quote</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded">Approve</button>
        <button className="bg-red-600 text-white px-4 py-2 rounded">Reject</button>
      </div>
    </div>
  );
}
