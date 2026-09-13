'use client';
import React from 'react';
import { useFieldArray, Control } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';

interface VariantManagerProps {
  control: Control<any>;
}

export default function VariantManager({ control }: VariantManagerProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg border border-gray-200 relative group">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 w-full">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Variant Name</label>
              <input type="text" {...control.register(`variants.${index}.name`)} className="w-full border-gray-300 rounded-md shadow-sm p-2 border text-sm" placeholder="e.g. 0.5 KG" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Weight</label>
              <input type="number" step="0.1" {...control.register(`variants.${index}.weight`)} className="w-full border-gray-300 rounded-md shadow-sm p-2 border text-sm" placeholder="e.g. 0.5" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Unit</label>
              <select {...control.register(`variants.${index}.unit`)} className="w-full border-gray-300 rounded-md shadow-sm p-2 border text-sm">
                <option value="KG">KG</option>
                <option value="G">G</option>
                <option value="PCS">PCS</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Selling Price (₹)</label>
              <input type="number" {...control.register(`variants.${index}.sellingPrice`)} className="w-full border-gray-300 rounded-md shadow-sm p-2 border text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Cost Price (₹)</label>
              <input type="number" {...control.register(`variants.${index}.costPrice`)} className="w-full border-gray-300 rounded-md shadow-sm p-2 border text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Stock</label>
              <input type="number" {...control.register(`variants.${index}.stock`)} className="w-full border-gray-300 rounded-md shadow-sm p-2 border text-sm" />
            </div>
          </div>
          {fields.length > 1 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-md absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-sm border"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
      
      <button
        type="button"
        onClick={() => append({ name: '', weight: 0, unit: 'KG', sellingPrice: 0, costPrice: 0, stock: 0 })}
        className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        <Plus className="w-4 h-4 mr-1" /> Add Variant
      </button>
    </div>
  );
}
