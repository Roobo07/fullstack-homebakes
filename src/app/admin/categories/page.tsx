'use client';
import React, { useMemo, useState } from 'react';
import DataTable from '@/components/admin/DataTable';
import { Plus, Edit, Trash2, X } from 'lucide-react';

const mockCategories = [
  { id: '1', name: 'Cakes', slug: 'cakes', productsCount: 24, sortOrder: 1, status: 'Active' },
  { id: '2', name: 'Pastries', slug: 'pastries', productsCount: 15, sortOrder: 2, status: 'Active' },
  { id: '3', name: 'Breads', slug: 'breads', productsCount: 8, sortOrder: 3, status: 'Active' },
  { id: '4', name: 'Cookies', slug: 'cookies', productsCount: 12, sortOrder: 4, status: 'Active' },
  { id: '5', name: 'Brownies', slug: 'brownies', productsCount: 6, sortOrder: 5, status: 'Inactive' },
  { id: '6', name: 'Custom Orders', slug: 'custom-orders', productsCount: 0, sortOrder: 6, status: 'Active' },
];

export default function CategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const columns = useMemo(() => [
    {
      header: 'Image',
      accessorKey: 'image',
      cell: () => <div className="w-10 h-10 rounded bg-gradient-to-br from-indigo-100 to-purple-100 flex-shrink-0"></div>
    },
    { header: 'Name', accessorKey: 'name', cell: (info: any) => <span className="font-medium text-gray-900">{info.getValue()}</span> },
    { header: 'Slug', accessorKey: 'slug', cell: (info: any) => <span className="text-gray-500 font-mono text-sm">{info.getValue()}</span> },
    { header: 'Products', accessorKey: 'productsCount' },
    { header: 'Sort Order', accessorKey: 'sortOrder' },
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
          <button 
            onClick={() => { setEditingCategory(info.row.original); setIsModalOpen(true); }}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-1 text-red-600 hover:bg-red-50 rounded">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ], []);

  const handleOpenModal = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 text-sm mt-1">Manage product categories and taxonomy.</p>
        </div>
        <button onClick={handleOpenModal} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center transition">
          <Plus className="w-4 h-4 mr-2" /> Add Category
        </button>
      </div>

      <DataTable 
        columns={columns} 
        data={mockCategories} 
        searchable={true} 
        pagination={true} 
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-semibold">{editingCategory ? 'Edit Category' : 'Add Category'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" defaultValue={editingCategory?.name} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input type="text" defaultValue={editingCategory?.slug} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 font-mono text-sm text-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={3} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                  <input type="number" defaultValue={editingCategory?.sortOrder || 0} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" defaultChecked={editingCategory ? editingCategory.status === 'Active' : true} className="form-checkbox h-5 w-5 text-blue-600 rounded" />
                    <span className="text-sm font-medium text-gray-700">Active</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 border rounded-md hover:bg-white bg-transparent">Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Category</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
