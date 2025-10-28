import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export default function CartSidebar({ isOpen, onClose, onCheckout }) {
  const { cart, cartTotal, updateQuantity, removeFromCart } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Keranjang Belanja</h2>
          <button onClick={onClose} className="hover:bg-white hover:bg-opacity-20 rounded-full p-2">
            <X className="w-6 h-6" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>Keranjang masih kosong</p>
          </div>
        ) : (
          <>
            <div className="p-6 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-4 flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-contain bg-white rounded-lg" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-purple-600 font-bold">Rp {item.price.toLocaleString('id-ID')}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="bg-gray-200 hover:bg-gray-300 rounded-full p-1"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-1"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="sticky bottom-0 bg-white border-t p-6 space-y-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-purple-600">Rp {cartTotal.toLocaleString('id-ID')}</span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-pink-600 transition-all"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}