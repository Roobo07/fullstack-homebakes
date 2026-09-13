'use client';
import React from 'react';
import { 
  TrendingUp, ShoppingBag, Clock, AlertTriangle, 
  Globe, Store, Users, Truck 
} from 'lucide-react';
import KPICard from '@/components/admin/KPICard';
import ChartCard from '@/components/admin/ChartCard';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Cell 
} from 'recharts';

const salesData = [
  { name: 'Mon', sales: 4000 }, { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 5000 }, { name: 'Thu', sales: 4500 },
  { name: 'Fri', sales: 6000 }, { name: 'Sat', sales: 8000 },
  { name: 'Sun', sales: 7500 },
];

const orderStatusData = [
  { name: 'Pending', value: 15 },
  { name: 'Preparing', value: 25 },
  { name: 'Delivered', value: 60 },
];
const COLORS = ['#F59E0B', '#3B82F6', '#10B981'];

const topProductsData = [
  { name: 'Choc Truffle', sales: 120 },
  { name: 'Black Forest', sales: 98 },
  { name: 'Red Velvet', sales: 86 },
  { name: 'Pineapple Cake', sales: 65 },
  { name: 'Butterscotch', sales: 54 },
];

const recentOrders = [
  { id: '#ORD-1024', customer: 'John Doe', amount: '₹1,200', status: 'Pending', date: 'Today, 10:30 AM' },
  { id: '#ORD-1023', customer: 'Jane Smith', amount: '₹850', status: 'Preparing', date: 'Today, 09:15 AM' },
  { id: '#ORD-1022', customer: 'Bob Wilson', amount: '₹2,100', status: 'Delivered', date: 'Yesterday, 06:45 PM' },
  { id: '#ORD-1021', customer: 'Alice Brown', amount: '₹450', status: 'Delivered', date: 'Yesterday, 04:20 PM' },
  { id: '#ORD-1020', customer: 'Charlie Davis', amount: '₹3,400', status: 'Delivered', date: 'Yesterday, 02:10 PM' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">Last updated: Today at 10:45 AM</div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Today's Sales" value="₹12,500" change="+12%" changeType="increase" icon={<TrendingUp className="w-6 h-6" />} accentColor="#10B981" />
        <KPICard title="Today's Orders" value="15" change="+5%" changeType="increase" icon={<ShoppingBag className="w-6 h-6" />} accentColor="#3B82F6" />
        <KPICard title="Pending Orders" value="3" change="-2" changeType="decrease" icon={<Clock className="w-6 h-6" />} accentColor="#F59E0B" />
        <KPICard title="Low Stock Items" value="5" change="+1" changeType="neutral" icon={<AlertTriangle className="w-6 h-6" />} accentColor="#EF4444" />
        
        <KPICard title="Online Sales" value="₹8,000" change="+15%" changeType="increase" icon={<Globe className="w-6 h-6" />} accentColor="#8B5CF6" />
        <KPICard title="POS Sales" value="₹4,500" change="+5%" changeType="increase" icon={<Store className="w-6 h-6" />} accentColor="#14B8A6" />
        <KPICard title="Total Customers" value="120" change="+12" changeType="increase" icon={<Users className="w-6 h-6" />} accentColor="#6366F1" />
        <KPICard title="Delivery Orders" value="8" change="+2" changeType="increase" icon={<Truck className="w-6 h-6" />} accentColor="#F97316" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Sales Overview (Last 7 Days)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Order Status Distribution">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={orderStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                {orderStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top 5 Products">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topProductsData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="sales" fill="#8B5CF6" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Revenue Trend (30 Days)">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="sales" stroke="#10B981" fillOpacity={1} fill="url(#colorSales)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
            <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Order #</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-r-lg">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{order.id}</td>
                    <td className="px-4 py-3 text-gray-600">{order.customer}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{order.amount}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'Preparing' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Low Stock Alerts</h3>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Vanilla Extract (1L)', stock: 2, threshold: 5 },
              { name: 'Dark Chocolate Chips', stock: 5, threshold: 10 },
              { name: 'Custom Cake Boxes', stock: 15, threshold: 50 },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-100">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                  <p className="text-xs text-red-600 mt-1">Threshold: {item.threshold}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-red-600">{item.stock}</p>
                  <p className="text-xs text-red-600 font-medium">Left</p>
                </div>
              </div>
            ))}
            <button className="w-full mt-2 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 rounded-lg transition-colors">
              Go to Inventory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
