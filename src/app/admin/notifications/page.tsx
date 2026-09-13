'use client';

import React, { useState } from 'react';
import { Send, Bell } from 'lucide-react';

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'System Maintenance', message: 'The system will be down for maintenance at 2 AM.', target: 'all', date: '2026-09-12 10:00' },
    { id: 2, title: 'Flash Sale Starting', message: 'Use code FLASH50 for 50% off for the next 2 hours!', target: 'all', date: '2026-09-11 15:30' },
  ]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Send size={20} className="text-pink-600" /> Send Notification
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
              <select className="w-full border rounded-md px-3 py-2">
                <option>All Users</option>
                <option>Customers Only</option>
                <option>Specific User...</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" className="w-full border rounded-md px-3 py-2" placeholder="Notification Title" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea className="w-full border rounded-md px-3 py-2 h-24" placeholder="Type your message here..."></textarea>
            </div>
            <button type="button" className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 font-medium">
              Send Notification
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Bell size={20} className="text-pink-600" /> Recent Broadcasts
          </h2>
          <div className="space-y-4">
            {notifications.map(notif => (
              <div key={notif.id} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-900">{notif.title}</h3>
                  <span className="text-xs text-gray-500">{notif.date}</span>
                </div>
                <p className="text-sm text-gray-600">{notif.message}</p>
                <div className="mt-2 text-xs font-medium text-pink-600 bg-pink-50 inline-block px-2 py-1 rounded">
                  Target: {notif.target}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
