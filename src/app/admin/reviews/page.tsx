'use client';

import React, { useState } from 'react';
import { Star, CheckCircle, XCircle, EyeOff, Award } from 'lucide-react';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([
    { id: 1, product: 'Chocolate Truffle Cake', customer: 'Alice Smith', rating: 5, text: 'Absolutely delicious! The best cake I have ever had.', status: 'approved', date: '2026-09-10' },
    { id: 2, product: 'Red Velvet Cupcakes', customer: 'Bob Jones', rating: 4, text: 'Very good, but a bit too sweet for my taste.', status: 'pending', date: '2026-09-11' },
    { id: 3, product: 'Custom Wedding Cake', customer: 'Charlie Brown', rating: 5, text: 'It was perfect! Exactly what we wanted for our special day.', status: 'featured', date: '2026-09-08' },
    { id: 4, product: 'Vanilla Sponge', customer: 'Diana Prince', rating: 2, text: 'A bit dry. Disappointed.', status: 'hidden', date: '2026-09-05' },
  ]);

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} size={16} className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
    ));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reviews Moderation</h1>
        <select className="border rounded-md px-3 py-2 bg-white">
          <option>All Statuses</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Hidden</option>
          <option>Featured</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b text-left">
            <tr>
              <th className="p-4 font-medium text-gray-600">Product</th>
              <th className="p-4 font-medium text-gray-600">Customer & Date</th>
              <th className="p-4 font-medium text-gray-600">Rating & Review</th>
              <th className="p-4 font-medium text-gray-600">Status</th>
              <th className="p-4 font-medium text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-800 w-1/5">{review.product}</td>
                <td className="p-4 w-1/5">
                  <div className="font-medium text-gray-900">{review.customer}</div>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </td>
                <td className="p-4 w-2/5">
                  <div className="flex mb-1">{renderStars(review.rating)}</div>
                  <p className="text-sm text-gray-600 line-clamp-2">{review.text}</p>
                </td>
                <td className="p-4 w-1/12">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                    review.status === 'approved' ? 'bg-green-100 text-green-800' :
                    review.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    review.status === 'featured' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                  </span>
                </td>
                <td className="p-4 text-right flex gap-2 justify-end">
                  {review.status !== 'approved' && review.status !== 'featured' && (
                    <button className="text-green-600 hover:text-green-800" title="Approve"><CheckCircle size={18} /></button>
                  )}
                  {review.status !== 'hidden' && (
                    <button className="text-gray-500 hover:text-gray-700" title="Hide"><EyeOff size={18} /></button>
                  )}
                  {review.status !== 'featured' && (
                    <button className="text-purple-600 hover:text-purple-800" title="Feature"><Award size={18} /></button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
