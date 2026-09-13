'use client';

import { useState } from 'react';

interface LocationDetectorProps {
  onLocationSelect: (location: { address: string, lat: number, lng: number }) => void;
}

export default function LocationDetector({ onLocationSelect }: LocationDetectorProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detectedLocation, setDetectedLocation] = useState<{lat: number, lng: number, address: string} | null>(null);

  const detectLocation = () => {
    setLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Mock reverse geocoding
        setTimeout(() => {
          const mockAddress = "123 Main St, Nearby Area, Cityville";
          const loc = { lat: latitude, lng: longitude, address: mockAddress };
          setDetectedLocation(loc);
          setLoading(false);
        }, 1500);
      },
      (error) => {
        setError("Unable to retrieve your location. Please ensure location permissions are granted.");
        setLoading(false);
      }
    );
  };

  const confirmLocation = () => {
    if (detectedLocation) {
      onLocationSelect(detectedLocation);
    }
  };

  return (
    <div className="w-full">
      {!detectedLocation ? (
        <div>
          <button 
            onClick={detectLocation} 
            disabled={loading}
            className="flex items-center justify-center w-full gap-2 py-3 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-lg border border-blue-200 transition"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            )}
            {loading ? 'Detecting Location...' : '📍 Use My Current Location'}
          </button>
          
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      ) : (
        <div className="border border-green-200 bg-green-50 rounded-lg p-4">
          <div className="w-full h-32 bg-blue-100 rounded mb-3 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="relative z-10 flex flex-col items-center">
               <span className="text-3xl">📍</span>
               <span className="bg-white px-2 py-1 rounded shadow-sm text-xs mt-1 font-mono">{detectedLocation.lat.toFixed(4)}, {detectedLocation.lng.toFixed(4)}</span>
            </div>
          </div>
          
          <h3 className="font-semibold text-green-800 mb-1">Location Detected</h3>
          <p className="text-gray-700 text-sm mb-3">{detectedLocation.address}</p>
          <div className="flex items-center gap-2 mb-4 bg-green-100 p-2 rounded text-green-800 text-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Delivery available at this location (4.2 km away)
          </div>
          
          <div className="flex gap-2">
            <button onClick={confirmLocation} className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700">Confirm Location</button>
            <button onClick={() => setDetectedLocation(null)} className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">Retry</button>
          </div>
        </div>
      )}
    </div>
  );
}
