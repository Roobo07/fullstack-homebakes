'use client';

import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Birthday Special', type: 'birthday', discount: 10, startDate: '2026-01-01', endDate: '2026-12-31', status: 'active', productsCount: 15 },
    { id: 2, name: 'Diwali Festive', type: 'diwali', discount: 20, startDate: '2026-10-15', endDate: '2026-11-15', status: 'upcoming', productsCount: 42 },
    { id: 3, name: 'Valentine\'s Day', type: 'valentines', discount: 15, startDate: '2026-02-01', endDate: '2026-02-15', status: 'expired', productsCount: 20 },
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Campaigns</h1>
        <button className="bg-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-pink-700">
          <Plus size={20} />
          Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-lg shadow-sm border p-5">
            <div className="w-full h-32 bg-pink-50 rounded-md mb-4 flex items-center justify-center text-pink-300">
              [Banner Placeholder]
            </div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg">{campaign.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                campaign.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {campaign.status.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-4 capitalize">Type: {campaign.type}</p>
            
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex justify-between">
                <span>Discount:</span>
                <span className="font-medium text-gray-900">{campaign.discount}% OFF</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-medium text-gray-900">{campaign.startDate} to {campaign.endDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Products:</span>
                <span className="font-medium text-gray-900">{campaign.productsCount} items</span>
              </div>
            </div>

            <div className="flex gap-2 border-t pt-4">
              <button className="flex-1 text-blue-600 hover:bg-blue-50 py-1.5 rounded text-sm font-medium transition-colors flex justify-center items-center gap-1">
                <Edit size={16} /> Edit
              </button>
              <button className="flex-1 text-red-600 hover:bg-red-50 py-1.5 rounded text-sm font-medium transition-colors flex justify-center items-center gap-1">
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
