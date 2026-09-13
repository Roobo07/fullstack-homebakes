'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface InventoryAdjustmentProps {
  productName: string;
  variantName: string;
  currentStock: number;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export default function InventoryAdjustment({ productName, variantName, currentStock, onClose, onSubmit }: InventoryAdjustmentProps) {
  const [type, setType] = useState('add');
  const [quantity, setQuantity] = useState(0);
  const [reason, setReason] = useState('Restock');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ type, quantity, reason, notes });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-lg font-semibold">Adjust Stock</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-500">Product</p>
            <p className="font-medium text-gray-900">{productName} {variantName && `(${variantName})`}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
            <span className="text-gray-600">Current Stock</span>
            <span className="text-xl font-semibold">{currentStock}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adjustment Type</label>
              <select 
                value={type} 
                onChange={(e) => setType(e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
              >
                <option value="add">Add (+)</option>
                <option value="remove">Remove (-)</option>
                <option value="set">Set Exact (=)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input 
                type="number" 
                min="0"
                value={quantity} 
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
            <select 
              value={reason} 
              onChange={(e) => setReason(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
            >
              <option value="Restock">Restock</option>
              <option value="Damage">Damage/Spoilage</option>
              <option value="Adjustment">Inventory Count Adjustment</option>
              <option value="Production">Internal Production</option>
              <option value="Return">Customer Return</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Confirm Adjustment</button>
          </div>
        </form>
      </div>
    </div>
  );
}
