import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, onAddToCart, onViewDetail }) {
  return (
    <section className="container mx-auto px-4 pb-16">
      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">Tidak ada produk yang ditemukan</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewDetail={onViewDetail}
            />
          ))}
        </div>
      )}
    </section>
  );
}