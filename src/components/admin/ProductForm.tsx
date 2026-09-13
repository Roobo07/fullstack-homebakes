'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import VariantManager from './VariantManager';
import ImageUploader from './ImageUploader';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const productSchema = z.object({
  name: z.string().min(2, "Name is required"),
  sku: z.string().min(2, "SKU is required"),
  categoryId: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  basePrice: z.number().min(0, "Price must be positive"),
  ingredients: z.string().optional(),
  allergens: z.string().optional(),
  prepTime: z.number().min(0).optional(),
  dailyCapacity: z.number().min(0).optional(),
  weeklyCapacity: z.number().min(0).optional(),
  isFeatured: z.boolean().default(false),
  isCustomizable: z.boolean().default(false),
  isActive: z.boolean().default(true),
  variants: z.array(z.any()).min(1, "At least one variant is required")
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: any;
  isLoading?: boolean;
}

export default function ProductForm({ initialData, isLoading = false }: ProductFormProps) {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: initialData || {
      name: '', sku: '', categoryId: '', description: '', basePrice: 0,
      ingredients: '', allergens: '', prepTime: 30, dailyCapacity: 10, weeklyCapacity: 50,
      isFeatured: false, isCustomizable: false, isActive: true,
      variants: [{ name: 'Standard', weight: 1, unit: 'KG', sellingPrice: 0, costPrice: 0, stock: 0 }]
    }
  });

  const onSubmit = (data: ProductFormData) => {
    console.log('Form Submitted', data);
    router.push('/admin/products');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <Link href="/admin/products" className="text-gray-500 hover:text-gray-700 flex items-center">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Products
        </Link>
        <button type="submit" disabled={isLoading} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center disabled:opacity-50">
          <Save className="w-4 h-4 mr-2" /> {isLoading ? 'Saving...' : 'Save Product'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input {...register('name')} className="w-full border-gray-300 rounded-md shadow-sm p-2 border" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                  <input {...register('sku')} className="w-full border-gray-300 rounded-md shadow-sm p-2 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select {...register('categoryId')} className="w-full border-gray-300 rounded-md shadow-sm p-2 border">
                    <option value="">Select Category</option>
                    <option value="cakes">Cakes</option>
                    <option value="pastries">Pastries</option>
                    <option value="breads">Breads</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea {...register('description')} rows={4} className="w-full border-gray-300 rounded-md shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (₹)</label>
                <input type="number" {...register('basePrice', { valueAsNumber: true })} className="w-full border-gray-300 rounded-md shadow-sm p-2 border" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Product Variants</h3>
            <VariantManager control={control as any} />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Images</h3>
            <ImageUploader />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" {...register('isActive')} className="form-checkbox h-5 w-5 text-blue-600 rounded" />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" {...register('isFeatured')} className="form-checkbox h-5 w-5 text-blue-600 rounded" />
                <span className="text-sm font-medium text-gray-700">Featured Product</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" {...register('isCustomizable')} className="form-checkbox h-5 w-5 text-blue-600 rounded" />
                <span className="text-sm font-medium text-gray-700">Customization Available</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preparation Time (mins)</label>
                <input type="number" {...register('prepTime', { valueAsNumber: true })} className="w-full border-gray-300 rounded-md shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
                <textarea {...register('ingredients')} rows={3} className="w-full border-gray-300 rounded-md shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Allergens</label>
                <textarea {...register('allergens')} rows={2} className="w-full border-gray-300 rounded-md shadow-sm p-2 border" placeholder="e.g. Nuts, Dairy" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Capacity</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Daily Capacity</label>
                <input type="number" {...register('dailyCapacity', { valueAsNumber: true })} className="w-full border-gray-300 rounded-md shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weekly Capacity</label>
                <input type="number" {...register('weeklyCapacity', { valueAsNumber: true })} className="w-full border-gray-300 rounded-md shadow-sm p-2 border" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}