'use client';
import React from 'react';
import ProductForm from '@/components/admin/ProductForm';
import { useParams } from 'next/navigation';

export default function EditProductPage() {
  const params = useParams();
  const id = params.id;

  // Mock initial data based on ID
  const mockInitialData = {
    name: 'Chocolate Truffle Cake',
    sku: 'CAKE-TRF-001',
    categoryId: 'cakes',
    description: 'Rich and moist chocolate truffle cake.',
    basePrice: 1200,
    ingredients: 'Flour, Cocoa Powder, Sugar, Eggs, Butter, Truffle Ganache',
    allergens: 'Dairy, Eggs, Gluten',
    prepTime: 120,
    dailyCapacity: 5,
    weeklyCapacity: 30,
    isFeatured: true,
    isCustomizable: true,
    isActive: true,
    variants: [
      { name: '0.5 KG', weight: 0.5, unit: 'KG', sellingPrice: 650, costPrice: 300, stock: 5 },
      { name: '1.0 KG', weight: 1.0, unit: 'KG', sellingPrice: 1200, costPrice: 550, stock: 10 }
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
        <p className="text-gray-500 text-sm mt-1">Product ID: {id}</p>
      </div>
      <ProductForm initialData={mockInitialData} />
    </div>
  );
}
