'use client';
import React, { useMemo } from 'react';
import DataTable from '@/components/admin/DataTable';
import { Plus, Edit, Trash2, Star } from 'lucide-react';
import Link from 'next/link';

const mockProducts = [
  { id: '1', name: 'Chocolate Truffle Cake', category: 'Cakes', basePrice: 1200, variants: 3, stockStatus: 'In Stock', featured: true, status: 'Active' },
  { id: '2', name: 'Vanilla Cupcake', category: 'Pastries', basePrice: 80, variants: 1, stockStatus: 'Low Stock', featured: false, status: 'Active' },
  { id: '3', name: 'Sourdough Bread', category: 'Breads', basePrice: 150, variants: 2, stockStatus: 'Out of Stock', featured: true, status: 'Inactive' },
  // ... more items could be added here
];

export default function ProductsPage() {
  const columns = useMemo(() => [
    {
      header: 'Product',
      accessorKey: 'name',
      cell: (info: any) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded bg-gradient-to-br from-blue-100 to-purple-100 flex-shrink-0"></div>
          <span className="font-medium text-gray-900">{info.getValue()}</span>
        </div>
      )
    },
    { header: 'Category', accessorKey: 'category' },
    { header: 'Base Price', accessorKey: 'basePrice', cell: (info: any) => `₹${info.getValue()}` },
    { header: 'Variants', accessorKey: 'variants' },
    {
      header: 'Stock Status',
      accessorKey: 'stockStatus',
      cell: (info: any) => {
        const status = info.getValue();
        const colors = {
          'In Stock': 'bg-green-100 text-green-800',
          'Low Stock': 'bg-yellow-100 text-yellow-800',
          'Out of Stock': 'bg-red-100 text-red-800'
        } as Record<string, string>;
        return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>{status}</span>;
      }
    },
    {
      header: 'Featured',
      accessorKey: 'featured',
      cell: (info: any) => info.getValue() ? <Star className="w-4 h-4 text-yellow-400 fill-current" /> : <Star className="w-4 h-4 text-gray-300" />
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (info: any) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${info.getValue() === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
          {info.getValue()}
        </span>
      )
    },
    {
      header: 'Actions',
      id: 'actions',
      cell: (info: any) => (
        <div className="flex space-x-2">
          <Link href={`/admin/products/${info.row.original.id}`} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
            <Edit className="w-4 h-4" />
          </Link>
          <button className="p-1 text-red-600 hover:bg-red-50 rounded">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ], []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Link href="/admin/products/new" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center transition">
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500">
          <option value="">All Categories</option>
          <option value="cakes">Cakes</option>
          <option value="pastries">Pastries</option>
        </select>
        <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500">
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <DataTable 
        columns={columns} 
        data={mockProducts} 
        searchable={true} 
        pagination={true} 
      />
    </div>
  );
}
