'use client';
import React, { useState } from 'react';
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react';

export default function ImageUploader() {
  const [images, setImages] = useState<{ id: string, url: string, name: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // In a real app, process e.dataTransfer.files
  };

  const removeImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <UploadCloud className="w-10 h-10 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-2">Drag and drop images here, or click to select</p>
        <p className="text-xs text-gray-500 mb-4">Max 5MB per file. JPG, PNG, WEBP allowed.</p>
        <input type="file" className="hidden" id="file-upload" multiple accept="image/*" />
        <label htmlFor="file-upload" className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          Select Files
        </label>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {images.map((img) => (
            <div key={img.id} className="relative group rounded-lg overflow-hidden border border-gray-200 bg-white">
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                {img.url ? (
                  <img src={img.url} alt={img.name} className="object-cover w-full h-full" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <button
                onClick={() => removeImage(img.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
