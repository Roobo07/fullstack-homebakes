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
      case 'order': return <ShoppingBag size={20} className="text-amber-500" />;
      case 'promo': return <Gift size={20} className="text-amber-600 dark:text-amber-400" />;
      default: return <Info size={20} className="text-gray-500 dark:text-gray-400" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-50">
          <Bell className="text-amber-600 dark:text-amber-500" /> Notifications
        </h1>
        {notifications.some(n => !n.read) && (
          <button 
            onClick={markAllAsRead}
            className="text-sm text-amber-600 dark:text-amber-500 hover:text-amber-800 dark:hover:text-amber-400 font-medium flex items-center gap-1 transition-colors"
          >
            <Check size={16} /> Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <Bell className="mx-auto h-12 w-12 text-gray-300 dark:text-zinc-700 mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No notifications yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-4 rounded-xl border flex gap-4 transition-colors cursor-pointer ${notif.read ? 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800' : 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50'}`}
              onClick={() => !notif.read && markAsRead(notif.id)}
            >
              <div className={`mt-1 p-2 rounded-full h-fit ${notif.read ? 'bg-gray-100 dark:bg-zinc-800' : 'bg-white dark:bg-zinc-900 shadow-sm'}`}>
                {getIcon(notif.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-medium ${notif.read ? 'text-gray-800 dark:text-gray-200' : 'text-zinc-900 dark:text-zinc-50'}`}>{notif.title}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">{notif.timestamp}</span>
                </div>
                <p className={`text-sm ${notif.read ? 'text-gray-500 dark:text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>{notif.message}</p>
              </div>
              {!notif.read && (
                <div className="w-2.5 h-2.5 rounded-full bg-amber-600 dark:bg-amber-500 mt-2"></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
