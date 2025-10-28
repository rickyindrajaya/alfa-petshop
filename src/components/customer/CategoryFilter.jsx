import React from 'react';

const categories = ["All", "Wet Food", "Dry Food"];

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex justify-center space-x-4 flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              selectedCategory === category
                ? 'bg-purple-600 text-white shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-purple-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}