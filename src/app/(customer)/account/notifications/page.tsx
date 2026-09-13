'use client';

import React, { useState } from 'react';
import { Bell, Check, ShoppingBag, Gift, Info } from 'lucide-react';

export default function CustomerNotificationsPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'order', title: 'Order Delivered', message: 'Your order #ORD-1234 has been delivered successfully.', timestamp: '2 hours ago', read: false },
    { id: 2, type: 'promo', title: 'Special Discount!', message: 'Use code SWEET20 to get 20% off your next purchase.', timestamp: '1 day ago', read: false },
    { id: 3, type: 'info', title: 'Welcome to HomeBakes', message: 'Thanks for signing up! Check out our new arrivals.', timestamp: '3 days ago', read: true },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return <ShoppingBag size={20} className="text-blue-500" />;
      case 'promo': return <Gift size={20} className="text-pink-500" />;
      default: return <Info size={20} className="text-gray-500" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bell className="text-pink-600" /> Notifications
        </h1>
        {notifications.some(n => !n.read) && (
          <button 
            onClick={markAllAsRead}
            className="text-sm text-pink-600 hover:text-pink-800 font-medium flex items-center gap-1"
          >
            <Check size={16} /> Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
          <Bell className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <p className="text-gray-500">No notifications yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-4 rounded-lg border flex gap-4 transition-colors ${notif.read ? 'bg-white border-gray-100' : 'bg-pink-50/50 border-pink-100'}`}
              onClick={() => !notif.read && markAsRead(notif.id)}
            >
              <div className={`mt-1 p-2 rounded-full h-fit ${notif.read ? 'bg-gray-100' : 'bg-white'}`}>
                {getIcon(notif.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-medium ${notif.read ? 'text-gray-800' : 'text-gray-900'}`}>{notif.title}</h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{notif.timestamp}</span>
                </div>
                <p className={`text-sm ${notif.read ? 'text-gray-500' : 'text-gray-700'}`}>{notif.message}</p>
              </div>
              {!notif.read && (
                <div className="w-2 h-2 rounded-full bg-pink-600 mt-2"></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
