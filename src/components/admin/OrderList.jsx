import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export default function OrderList() {
  const { orders } = useApp();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Daftar Pesanan</h2>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>Belum ada pesanan</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-purple-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tanggal</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Pelanggan</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Kontak</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Items</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600">#{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(order.date).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-800">{order.customer.name}</div>
                      <div className="text-xs text-gray-500">{order.customer.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.customer.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.items.length} item
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-purple-600">
                      Rp {order.total.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}