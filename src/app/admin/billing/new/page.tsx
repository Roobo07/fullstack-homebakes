'use client';
import React, { useState } from 'react';
import { Search, Plus, Minus, X } from 'lucide-react';

const mockProducts = [
  { id: 1, name: 'Chocolate Cake', variants: [{ weight: '0.5KG', price: 650 }, { weight: '1KG', price: 1100 }] },
  { id: 2, name: 'Red Velvet', variants: [{ weight: '0.5KG', price: 750 }, { weight: '1KG', price: 1200 }] },
  { id: 3, name: 'Brownie Box', variants: [{ weight: '6 pcs', price: 350 }] },
];

export default function NewBillPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [discount, setDiscount] = useState(0);

  const addToCart = (product: any, variant: any) => {
    setCart([...cart, { ...product, variant, qty: 1 }]);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.variant.price * item.qty, 0);
  const total = subtotal - discount;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <div className="w-[60%] p-6 flex flex-col border-r h-full overflow-y-auto">
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input type="text" placeholder="Search products..." className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {mockProducts.map(p => (
            <div key={p.id} className="bg-white p-4 border rounded shadow-sm">
              <h3 className="font-semibold mb-2">{p.name}</h3>
              <div className="flex flex-wrap gap-2">
                {p.variants.map((v, i) => (
                  <button key={i} onClick={() => addToCart(p, v)} className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm">
                    {v.weight} - ₹{v.price}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[40%] bg-white p-6 flex flex-col h-full shadow-lg z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Current Bill</h2>
          <button className="bg-gray-100 px-3 py-1 rounded text-sm">Walk-in Customer</button>
        </div>
        <div className="flex-grow overflow-y-auto mb-4">
          {cart.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">{item.variant.weight}</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-semibold">₹{item.variant.price * item.qty}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between mb-2"><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div className="flex justify-between mb-4"><span>Discount</span><input type="number" value={discount} onChange={e => setDiscount(Number(e.target.value))} className="w-20 text-right border rounded px-1"/></div>
          <div className="flex justify-between text-2xl font-bold mb-4"><span>Total</span><span>₹{total}</span></div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button className="border rounded py-2 hover:bg-blue-50">Cash</button>
            <button className="border rounded py-2 hover:bg-blue-50">UPI</button>
            <button className="border rounded py-2 hover:bg-blue-50">Card</button>
          </div>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold text-lg">GENERATE BILL</button>
        </div>
      </div>
    </div>
  );
}
