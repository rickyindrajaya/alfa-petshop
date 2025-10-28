import React, { useState, useEffect } from 'react';

export default function ProductForm({ product, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'Wet Food',
    price: '',
    weight: '',
    image: '',
    description: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price.toString(),
        weight: product.weight,
        image: product.image,
        description: product.description
      });
    }
  }, [product]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">
        {product ? 'Edit Produk' : 'Tambah Produk Baru'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Nama Produk</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Contoh: Whiskas Adult Tuna"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Brand</label>
            <input
              type="text"
              required
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Contoh: Whiskas"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Kategori</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Wet Food">Wet Food</option>
              <option value="Dry Food">Dry Food</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Harga (Rp)</label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Contoh: 12500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Berat/Ukuran</label>
            <input
              type="text"
              required
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Contoh: 400g"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Upload Gambar</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Deskripsi</label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Deskripsi singkat produk"
          ></textarea>
        </div>
        {formData.image && (
          <div className="flex justify-center">
            <img src={formData.image} alt="Preview" className="h-40 object-contain rounded-lg" />
          </div>
        )}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-pink-600 transition-all"
          >
            {product ? 'Update Produk' : 'Tambah Produk'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-400 transition-all"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}