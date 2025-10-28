import React from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export default function CheckoutModal({ isOpen, onClose, onSuccess }) {
  const { cart, cartTotal, addOrder } = useApp();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const orderData = {
      customer: {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        address: formData.get('address'),
        notes: formData.get('notes')
      }
    };
    
    addOrder(orderData);
    onClose();
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold">Form Pemesanan</h2>
          <button onClick={onClose} className="hover:bg-white hover:bg-opacity-20 rounded-full p-2">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Nomor WhatsApp</label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="08xxxxxxxxxx"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Alamat Lengkap</label>
            <textarea
              name="address"
              required
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Catatan (Opsional)</label>
            <textarea
              name="notes"
              rows="2"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Tambahkan catatan untuk pesanan Anda"
            ></textarea>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-3">Ringkasan Pesanan</h3>
            <div className="space-y-2 text-sm">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} x{item.quantity}</span>
                  <span className="font-semibold">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2 flex justify-between text-lg font-bold text-purple-600">
                <span>Total</span>
                <span>Rp {cartTotal.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-pink-600 transition-all"
          >
            Konfirmasi Pesanan
          </button>
        </form>
      </div>
    </div>
  );
}