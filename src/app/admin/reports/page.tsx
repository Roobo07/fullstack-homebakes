import React from 'react';
import Link from 'next/link';
import { BarChart, PieChart, Users, TrendingUp } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    { title: 'Sales Report', icon: <BarChart/>, link: '/admin/reports/sales', desc: 'Revenue, orders, and sales trends.' },
    { title: 'Products Report', icon: <PieChart/>, link: '/admin/reports/products', desc: 'Top products, margins, and performance.' },
    { title: 'Customers Report', icon: <Users/>, link: '/admin/reports/customers', desc: 'Customer retention and spending habits.' },
    { title: 'Profit & Loss', icon: <TrendingUp/>, link: '/admin/reports/profit-loss', desc: 'Revenue vs expenses, net profit margins.' }
  ];
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>
      <div className="grid grid-cols-2 gap-6">
        {reports.map((r, i) => (
          <Link key={i} href={r.link} className="bg-white p-6 rounded shadow hover:shadow-md transition">
            <div className="flex items-center space-x-4 mb-2">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-full">{r.icon}</div>
              <h2 className="text-xl font-semibold">{r.title}</h2>
            </div>
            <p className="text-gray-600 ml-16">{r.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
