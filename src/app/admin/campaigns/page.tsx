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
    <div className="p-6 max-w-7xl mx-auto font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Campaigns</h1>
        <button className="bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-amber-700 transition-colors shadow-sm">
          <Plus size={20} />
          Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-5 flex flex-col justify-between">
            <div>
              <div className="w-full h-32 bg-amber-50 dark:bg-amber-950/30 rounded-lg mb-4 flex items-center justify-center text-amber-400 dark:text-amber-500 font-medium text-sm">
                [Banner Placeholder]
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-50">{campaign.name}</h3>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                  campaign.status === 'active' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' :
                  campaign.status === 'upcoming' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800' :
                  'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                }`}>
                  {campaign.status.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 capitalize">Type: {campaign.type}</p>
              
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-6">
                <div className="flex justify-between">
                  <span>Discount:</span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">{campaign.discount}% OFF</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">{campaign.startDate} to {campaign.endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Products:</span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">{campaign.productsCount} items</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 border-t border-zinc-100 dark:border-zinc-800 pt-4">
              <button className="flex-1 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 py-1.5 rounded-lg text-sm font-medium transition-colors flex justify-center items-center gap-1">
                <Edit size={16} /> Edit
              </button>
              <button className="flex-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 py-1.5 rounded-lg text-sm font-medium transition-colors flex justify-center items-center gap-1">
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
