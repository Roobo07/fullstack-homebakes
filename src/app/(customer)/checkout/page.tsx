'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LocationDetector from '@/components/customer/LocationDetector';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', email: '' });
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [address, setAddress] = useState('');
  const [schedule, setSchedule] = useState({ date: '', time: '' });
  const [payment, setPayment] = useState('cash');

  const handleNext = () => setStep(s => Math.min(s + 1, 5));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const placeOrder = async () => {
    // API Call to POST /api/orders
    router.push('/order-success');
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
      {/* Progress Bar */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className={`h-2 w-full mx-1 rounded ${s <= step ? 'bg-blue-600' : 'bg-gray-200'}`} />
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6 border">
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Step 1: Customer Info</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full border p-2 rounded" value={customerInfo.name} onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})} />
              <input type="tel" placeholder="Phone Number" className="w-full border p-2 rounded" value={customerInfo.phone} onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})} />
              <input type="email" placeholder="Email" className="w-full border p-2 rounded" value={customerInfo.email} onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Step 2: Delivery Method</h2>
            <div className="space-y-4">
              <label className="flex items-center space-x-2">
                <input type="radio" name="delivery" value="pickup" checked={deliveryMethod === 'pickup'} onChange={(e) => setDeliveryMethod(e.target.value)} />
                <span>Pickup (Bakery Address: 123 Main St)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="delivery" value="delivery" checked={deliveryMethod === 'delivery'} onChange={(e) => setDeliveryMethod(e.target.value)} />
                <span>Home Delivery</span>
              </label>
              {deliveryMethod === 'delivery' && (
                <div className="mt-4 p-4 border rounded">
                  <LocationDetector onLocationSelect={(loc) => setAddress(loc.address)} />
                  <textarea placeholder="Enter Address" className="w-full border p-2 rounded mt-4" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Step 3: Schedule</h2>
            <div className="space-y-4">
              <input type="date" className="w-full border p-2 rounded" value={schedule.date} onChange={(e) => setSchedule({...schedule, date: e.target.value})} />
              <select className="w-full border p-2 rounded" value={schedule.time} onChange={(e) => setSchedule({...schedule, time: e.target.value})}>
                <option value="">Select Time Slot</option>
                <option value="9-11">9:00 AM - 11:00 AM</option>
                <option value="11-13">11:00 AM - 1:00 PM</option>
                <option value="13-15">1:00 PM - 3:00 PM</option>
                <option value="15-17">3:00 PM - 5:00 PM</option>
                <option value="17-19">5:00 PM - 7:00 PM</option>
              </select>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Step 4: Payment</h2>
            <div className="space-y-4">
              {['cash', 'upi', 'card', 'online'].map((method) => (
                <label key={method} className="flex items-center space-x-2">
                  <input type="radio" name="payment" value={method} checked={payment === method} onChange={(e) => setPayment(e.target.value)} />
                  <span className="capitalize">{method}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Step 5: Review & Place Order</h2>
            <div className="border p-4 rounded mb-4">
              <p><strong>Name:</strong> {customerInfo.name}</p>
              <p><strong>Method:</strong> {deliveryMethod} {deliveryMethod === 'delivery' && `(${address})`}</p>
              <p><strong>Schedule:</strong> {schedule.date} at {schedule.time}</p>
              <p><strong>Payment:</strong> {payment}</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="font-semibold mb-2">Order Summary</h3>
              {/* Cart Items Mock */}
              <div className="flex justify-between border-b pb-2">
                <span>Chocolate Cake x1</span>
                <span>₹500</span>
              </div>
              <div className="flex justify-between font-bold mt-2">
                <span>Total</span>
                <span>₹500</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button onClick={handleBack} disabled={step === 1} className="px-4 py-2 border rounded disabled:opacity-50">Back</button>
        {step < 5 ? (
          <button onClick={handleNext} className="px-4 py-2 bg-blue-600 text-white rounded">Next</button>
        ) : (
          <button onClick={placeOrder} className="px-4 py-2 bg-green-600 text-white rounded font-bold">Place Order</button>
        )}
      </div>
    </div>
  );
}
