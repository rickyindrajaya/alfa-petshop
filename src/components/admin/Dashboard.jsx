import React from 'react';
import { BarChart, ShoppingCart, Package } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export default function Dashboard() {
  const { orders, totalRevenue, totalOrders, totalProducts } = useApp();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold">Total Pendapatan</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                Rp {totalRevenue.toLocaleString('id-ID')}
              </p>
            </div>
            <div className="bg-purple-100 p-4 rounded-full">
              <BarChart className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold">Total Pesanan</p>
              <p className="text-3xl font-bold text-pink-600 mt-2">{totalOrders}</p>
            </div>
            <div className="bg-pink-100 p-4 rounded-full">
              <ShoppingCart className="w-8 h-8 text-pink-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold">Total Produk</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">{totalProducts}</p>
            </div>
            <div className="bg-orange-100 p-4 rounded-full">
              <Package className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Pesanan Terbaru</h3>
        <div className="space-y-4">
          {orders.slice(0, 5).map(order => (
            <div key={order.id} className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{order.customer.name}</p>
                  <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString('id-ID')}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {order.items.length} item - Rp {order.total.toLocaleString('id-ID')}
                  </p>
                </div>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {order.status}
                </span>
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <p className="text-gray-500 text-center py-8">Belum ada pesanan</p>
          )}
        </div>
      </div>
    </div>
  );
}