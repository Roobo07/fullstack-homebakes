import Link from 'next/link';

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto p-4 max-w-lg text-center py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {/* Confetti placeholder */}
        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/confetti.png')]" />
      </div>

      <div className="relative z-10">
        <div className="mx-auto w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        </div>

        <h1 className="text-4xl font-bold mb-2">Order Placed Successfully! 🎉</h1>
        <p className="text-gray-600 mb-6">Thank you for your order. We've received it and are processing it now.</p>
        
        <div className="bg-gray-50 border rounded-lg p-6 mb-8 text-left">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Order Number</span>
            <span className="font-bold">#ORD-8392</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Items Count</span>
            <span className="font-bold">3 items</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Delivery Method</span>
            <span className="font-bold">Home Delivery</span>
          </div>
          <div className="flex justify-between pt-2 border-t mt-2">
            <span className="text-gray-800 font-semibold">Total Amount</span>
            <span className="font-bold text-lg text-blue-600">₹1,250</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/orders/ORD-8392" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
            Track Your Order
          </Link>
          <Link href="/shop" className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
