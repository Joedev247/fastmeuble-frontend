'use client';

import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface Category {
  name: string;
  count: number;
}

interface ProductFiltersProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  selectedRating: number | null;
  onRatingSelect: (rating: number | null) => void;
  onResetFilters: () => void;
}

export function ProductFilters({
  categories,
  selectedCategories,
  onCategoryToggle,
  priceRange,
  onPriceRangeChange,
  selectedRating,
  onRatingSelect,
  onResetFilters,
}: ProductFiltersProps) {
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange);

  const handlePriceChange = (value: number, index: number) => {
    const newRange: [number, number] = [...localPriceRange];
    newRange[index] = value;
    setLocalPriceRange(newRange);
    onPriceRangeChange(newRange);
  };

  return (
    <div className="bg-white border border-gray-200 Fast Meuble p-6 sticky top-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Filters</h2>
        <p className="text-sm text-gray-600">Refine your search</p>
      </div>

      {/* Categories Section */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category.name}
              className="flex items-center justify-between cursor-pointer group hover:bg-gray-50 p-2 rounded -mx-2"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.name)}
                  onChange={() => onCategoryToggle(category.name)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{category.name}</span>
              </div>
              <span className="text-sm text-gray-500">({category.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Section */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Price Range</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={localPriceRange[0]}
              onChange={(e) => handlePriceChange(Number(e.target.value), 0)}
              className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              value={localPriceRange[1]}
              onChange={(e) => handlePriceChange(Number(e.target.value), 1)}
              className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="1000"
              value={localPriceRange[1]}
              onChange={(e) => handlePriceChange(Number(e.target.value), 1)}
              className="w-full h-2 bg-gray-200 Fast Meuble appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Rating Section */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-2 cursor-pointer group hover:bg-gray-50 p-2 rounded -mx-2"
            >
              <input
                type="radio"
                name="rating"
                checked={selectedRating === rating}
                onChange={() => onRatingSelect(selectedRating === rating ? null : rating)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">& Up</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset Filters Button */}
      <button
        onClick={onResetFilters}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4  transition-colors duration-200 text-sm"
      >
        × Reset Filters
      </button>
    </div>
  );
}
