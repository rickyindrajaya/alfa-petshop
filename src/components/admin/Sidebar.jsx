import React from 'react';
import { BarChart, Grid, ShoppingCart } from 'lucide-react';

export default function Sidebar({ activeView, onViewChange }) {
  const menuItems = [
    { id: 'dashboard', icon: BarChart, label: 'Dashboard' },
    { id: 'products', icon: Grid, label: 'Produk' },
    { id: 'orders', icon: ShoppingCart, label: 'Pesanan' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-2">
      {menuItems.map(item => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activeView === item.id ? 'bg-purple-600 text-white' : 'hover:bg-gray-100'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-semibold">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}