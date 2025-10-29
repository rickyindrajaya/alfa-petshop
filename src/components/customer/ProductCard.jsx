import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';

export default function ProductCard({ product, onAddToCart, onViewDetail }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2">
      <div 
        className="h-64 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-6 cursor-pointer relative group"
        onClick={() => onViewDetail(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
          <div className="bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all transform scale-50 group-hover:scale-100">
            <Eye className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
          {product.brand}
        </span>
        <h3 
          className="text-xl font-bold text-gray-800 mb-2 hover:text-purple-600 cursor-pointer transition-colors"
          onClick={() => onViewDetail(product)}
        >
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-500 text-sm">{product.weight}</span>
          <span className="text-2xl font-bold text-purple-600">
            Rp {product.price.toLocaleString('id-ID')}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onViewDetail(product)}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all flex items-center justify-center space-x-2"
          >
            <Eye className="w-5 h-5" />
            <span>Detail</span>
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-600 transition-all flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Keranjang</span>
          </button>
        </div>
      </div>
    </div>
  );
}