import React from 'react';
import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2">
      <div className="h-64 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-6">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="p-6">
        <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
          {product.brand}
        </span>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-500 text-sm">{product.weight}</span>
          <span className="text-2xl font-bold text-purple-600">
            Rp {product.price.toLocaleString('id-ID')}
          </span>
        </div>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-600 transition-all flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Tambah ke Keranjang</span>
        </button>
      </div>
    </div>
  );
}