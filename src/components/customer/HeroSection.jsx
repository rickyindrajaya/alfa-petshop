import React from 'react';
import { Search } from 'lucide-react';

export default function HeroSection({ searchQuery, onSearchChange }) {
  return (
    <section className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold mb-4">Makanan Kucing Berkualitas</h2>
        <p className="text-xl mb-8">Nutrisi terbaik untuk kucing kesayangan Anda</p>
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-full text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
          />
        </div>
      </div>
    </section>
  );
}