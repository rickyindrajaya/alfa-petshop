import React, { useState } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import ProductForm from './ProductForm';

export default function ProductManagement() {
  const { products, addProduct, updateProduct, deleteProduct } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = (formData) => {
    addProduct(formData);
    setShowForm(false);
  };

  const handleUpdateProduct = (formData) => {
    updateProduct(editingProduct.id, formData);
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus produk ini?')) {
      deleteProduct(id);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Kelola Produk</h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingProduct(null);
          }}
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-600 transition-all flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Tambah Produk</span>
        </button>
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
          onCancel={handleCancel}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-4">
              <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
            </div>
            <div className="p-4">
              <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded-full mb-2">
                {product.brand}
              </span>
              <h3 className="font-bold text-gray-800 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.weight}</p>
              <p className="text-xl font-bold text-purple-600 mb-4">
                Rp {product.price.toLocaleString('id-ID')}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center space-x-1"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all flex items-center justify-center space-x-1"
                >
                  <Trash className="w-4 h-4" />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}