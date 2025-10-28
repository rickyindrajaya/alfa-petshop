import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export default function Header({ onCartClick }) {
  const { cartItemCount } = useApp();

  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="ALFA PETSHOP Logo" className="w-12 h-12 object-contain" />
            <div>
              <h1 className="text-3xl font-bold">ALFA PETSHOP</h1>
              <p className="text-sm text-purple-100">Teman Terbaik Untuk Hewan Kesayangan</p>
            </div>
          </div>
          
          <button
            onClick={onCartClick}
            className="relative bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-50 transition-all shadow-lg flex items-center space-x-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Keranjang</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}