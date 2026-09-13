'use client';
import React, { useMemo, useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import InventoryAdjustment from '@/components/admin/InventoryAdjustment';
import { Package, AlertTriangle, AlertOctagon, ArrowRightLeft, History } from 'lucide-react';

const mockInventory = [
  { id: 'INV-01', productName: 'Chocolate Truffle Cake', sku: 'CAKE-TRF-001', variant: '1.0 KG', stock: 15, reserved: 2, available: 13, threshold: 5, status: 'In Stock', capacity: 10 },
  { id: 'INV-02', productName: 'Vanilla Cupcake', sku: 'CUP-VAN-002', variant: 'Box of 6', stock: 3, reserved: 1, available: 2, threshold: 10, status: 'Low Stock', capacity: 50 },
  { id: 'INV-03', productName: 'Red Velvet Pastry', sku: 'PAS-RV-003', variant: 'Standard', stock: 0, reserved: 0, available: 0, threshold: 5, status: 'Out of Stock', capacity: 30 },
  { id: 'INV-04', productName: 'Sourdough Bread', sku: 'BRD-SD-004', variant: '500g', stock: 12, reserved: 0, available: 12, threshold: 10, status: 'In Stock', capacity: 20 },
];

export default function InventoryPage() {
  const [adjustmentModal, setAdjustmentModal] = useState<{isOpen: boolean, item: any}>({ isOpen: false, item: null });

  const columns = useMemo(() => [
    {
      header: 'Product Info',
      id: 'productInfo',
      cell: (info: any) => (
        <div>
          <p className="font-medium text-gray-900">{info.row.original.productName}</p>
          <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
            <span>{info.row.original.sku}</span>
            <span>•</span>
            <span className="font-medium bg-gray-100 px-1.5 py-0.5 rounded">{info.row.original.variant}</span>
          </div>
        </div>
      )
    },
    { 
      header: 'Stock Status', 
      id: 'stockNumbers',
      cell: (info: any) => (
        <div className="flex space-x-4">
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-900">{info.row.original.stock}</p>
            <p className="text-xs text-gray-500">Current</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-blue-600">{info.row.original.reserved}</p>
            <p className="text-xs text-gray-500">Reserved</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-green-600">{info.row.original.available}</p>
            <p className="text-xs text-gray-500">Available</p>
          </div>
        </div>
      )
    },
    { header: 'Threshold', accessorKey: 'threshold' },
    { header: 'Daily Cap.', accessorKey: 'capacity' },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (info: any) => {
        const status = info.getValue();
        const colors = {
          'In Stock': 'bg-green-100 text-green-800 border-green-200',
          'Low Stock': 'bg-amber-100 text-amber-800 border-amber-200',
          'Out of Stock': 'bg-red-100 text-red-800 border-red-200'
        } as Record<string, string>;
        return <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${colors[status]}`}>{status}</span>;
      }
    },
    {
      header: 'Actions',
      id: 'actions',
      cell: (info: any) => (
        <div className="flex space-x-2">
          <button 
            onClick={() => setAdjustmentModal({ isOpen: true, item: info.row.original })}
            className="flex items-center px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded hover:bg-blue-100 border border-blue-200"
          >
            <ArrowRightLeft className="w-3 h-3 mr-1" /> Adjust
          </button>
          <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded border border-gray-200">
            <History className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    }
  ], []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
        <p className="text-gray-500 text-sm mt-1">Track stock levels, monitor thresholds, and adjust inventory.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg mr-4"><Package className="w-6 h-6" /></div>
          <div><p className="text-gray-500 text-sm font-medium">Total Items</p><p className="text-2xl font-bold text-gray-900">124</p></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg mr-4"><Package className="w-6 h-6" /></div>
          <div><p className="text-gray-500 text-sm font-medium">In Stock</p><p className="text-2xl font-bold text-gray-900">108</p></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-amber-200 shadow-sm flex items-center bg-amber-50/30">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-lg mr-4"><AlertTriangle className="w-6 h-6" /></div>
          <div><p className="text-amber-800 text-sm font-medium">Low Stock</p><p className="text-2xl font-bold text-amber-600">12</p></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-red-200 shadow-sm flex items-center bg-red-50/30">
          <div className="p-3 bg-red-100 text-red-600 rounded-lg mr-4"><AlertOctagon className="w-6 h-6" /></div>
          <div><p className="text-red-800 text-sm font-medium">Out of Stock</p><p className="text-2xl font-bold text-red-600">4</p></div>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={mockInventory} 
        searchable={true} 
        pagination={true} 
      />

      {adjustmentModal.isOpen && adjustmentModal.item && (
        <InventoryAdjustment
          productName={adjustmentModal.item.productName}
          variantName={adjustmentModal.item.variant}
          currentStock={adjustmentModal.item.stock}
          onClose={() => setAdjustmentModal({ isOpen: false, item: null })}
          onSubmit={(data) => {
            console.log('Adjusting stock:', data);
            setAdjustmentModal({ isOpen: false, item: null });
          }}
        />
      )}
    </div>
  );
}
