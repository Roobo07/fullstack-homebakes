import React, { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: ReactNode;
  accentColor: string;
}

export default function KPICard({ title, value, change, changeType, icon, accentColor }: KPICardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className={`p-3 rounded-full`} style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
          {icon}
        </div>
      </div>
      <div className="flex items-center text-sm mt-2">
        {changeType === 'increase' && <TrendingUp className="w-4 h-4 text-green-500 mr-1" />}
        {changeType === 'decrease' && <TrendingDown className="w-4 h-4 text-red-500 mr-1" />}
        <span className={
          changeType === 'increase' ? 'text-green-500 font-medium' : 
          changeType === 'decrease' ? 'text-red-500 font-medium' : 
          'text-gray-500 font-medium'
        }>
          {change}
        </span>
        <span className="text-gray-400 ml-2">from yesterday</span>
      </div>
    </div>
  );
}
