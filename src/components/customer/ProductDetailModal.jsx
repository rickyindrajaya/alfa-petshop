import React, { useState } from 'react';
import { X, ShoppingCart, Package, Tag, Star, Plus, Minus } from 'lucide-react';

export default function ProductDetailModal({ product, isOpen, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    setQuantity(1);
    onClose();
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6 flex justify-between items-center rounded-t-2xl z-10">
          <h2 className="text-2xl font-bold">Detail Produk</h2>
          <button 
            onClick={onClose} 
            className="hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-96 object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Brand Badge */}
              <div>
                <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-2 rounded-full">
                  <Tag className="w-4 h-4 inline mr-1" />
                  {product.brand}
                </span>
              </div>

              {/* Product Name */}
              <div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h3>
                <div className="flex items-center space-x-2 text-yellow-500">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-gray-600 text-sm ml-2">(4.9/5.0)</span>
                </div>
              </div>

              {/* Category & Weight */}
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Package className="w-5 h-5" />
                  <span className="font-semibold">{product.category}</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <span className="font-semibold">{product.weight}</span>
              </div>

              {/* Price */}
              <div className="bg-purple-50 p-4 rounded-xl">
                <p className="text-gray-600 text-sm mb-1">Harga</p>
                <p className="text-4xl font-bold text-purple-600">
                  Rp {product.price.toLocaleString('id-ID')}
                </p>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-bold text-gray-800 mb-2">Deskripsi Produk</h4>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Product Features */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-800 mb-3">Keunggulan Produk</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Nutrisi lengkap dan seimbang</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Bahan berkualitas tinggi</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Disukai kucing kesayangan</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Kemasan praktis dan higienis</span>
                  </li>
                </ul>
              </div>

              {/* Quantity Selector */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3">Jumlah</h4>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={decreaseQuantity}
                    className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 transition-all"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="text-2xl font-bold text-gray-800 w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-600 transition-all flex items-center justify-center space-x-2 shadow-lg"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span>Tambah ke Keranjang</span>
                </button>
                <p className="text-center text-gray-500 text-sm">
                  Total: <span className="font-bold text-purple-600">
                    Rp {(product.price * quantity).toLocaleString('id-ID')}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 border-t pt-6">
            <h4 className="font-bold text-gray-800 mb-4">Informasi Tambahan</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 font-semibold mb-1">Kategori</p>
                <p className="text-gray-800">{product.category}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 font-semibold mb-1">Berat/Ukuran</p>
                <p className="text-gray-800">{product.weight}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 font-semibold mb-1">Brand</p>
                <p className="text-gray-800">{product.brand}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 font-semibold mb-1">Stok</p>
                <p className="text-green-600 font-semibold">Tersedia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}