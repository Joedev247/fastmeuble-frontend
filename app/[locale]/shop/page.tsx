'use client';

import { useState } from 'react';
import { ProductFilters } from '@/components/products/ProductFilters';
import { ProductGrid } from '@/components/products/ProductGrid';

// Mock product data - replace with actual data fetching
const mockProducts = [
  {
    id: '1',
    name: 'Chair Padded Seat',
    category: 'Dining Chairs',
    price: 100.00,
    rating: 4.5,
    reviews: 2,
    image: '/images/category-1.jpg',
  },
  {
    id: '2',
    name: 'Modern Sofa Set',
    category: 'Sofas',
    price: 899.99,
    rating: 4.8,
    reviews: 15,
    image: '/images/category-2.jpg',
    isHot: true,
  },
  {
    id: '3',
    name: 'Wooden Dining Table',
    category: 'Tables',
    price: 450.00,
    rating: 4.7,
    reviews: 8,
    image: '/images/category-3.jpg',
  },
  {
    id: '4',
    name: 'Luxury Armchair',
    category: 'Chairs',
    price: 299.99,
    rating: 4.6,
    reviews: 12,
    image: '/images/discount-1.jpg',
    originalPrice: 349.99,
    discount: '14%',
  },
  {
    id: '5',
    name: 'Coffee Table',
    category: 'Tables',
    price: 199.99,
    rating: 4.5,
    reviews: 6,
    image: '/images/discount-2.jpg',
  },
  {
    id: '6',
    name: 'Sectional Sofa',
    category: 'Sofas',
    price: 1299.99,
    rating: 4.9,
    reviews: 20,
    image: '/images/slider5-1.jpg',
    isHot: true,
  },
  {
    id: '7',
    name: 'Bar Stool Set',
    category: 'Chairs',
    price: 179.99,
    rating: 4.4,
    reviews: 5,
    image: '/images/slider5-2.jpg',
  },
  {
    id: '8',
    name: 'Console Table',
    category: 'Tables',
    price: 249.99,
    rating: 4.6,
    reviews: 9,
    image: '/images/slider5-3.jpg',
  },
  {
    id: '9',
    name: 'Recliner Chair',
    category: 'Chairs',
    price: 399.99,
    rating: 4.7,
    reviews: 11,
    image: '/images/goodvibes.jpg',
  },
  {
    id: '10',
    name: 'Dining Set',
    category: 'Dining Sets',
    price: 799.99,
    rating: 4.8,
    reviews: 18,
    image: '/images/stories.jpg',
    isHot: true,
  },
  {
    id: '11',
    name: 'Side Table',
    category: 'Tables',
    price: 89.99,
    rating: 4.3,
    reviews: 4,
    image: '/images/category-1.jpg',
  },
  {
    id: '12',
    name: 'Office Chair',
    category: 'Chairs',
    price: 149.99,
    rating: 4.5,
    reviews: 7,
    image: '/images/category-2.jpg',
  },
];

const categories = [
  { name: 'Dining Chairs', count: 45 },
  { name: 'Sofas', count: 32 },
  { name: 'Tables', count: 58 },
  { name: 'Chairs', count: 67 },
  { name: 'Dining Sets', count: 25 },
  { name: 'Office Furniture', count: 38 },
  { name: 'Bedroom Furniture', count: 42 },
  { name: 'Living Room', count: 55 },
  { name: 'Outdoor Furniture', count: 28 },
  { name: 'Storage', count: 35 },
];

export default function ProductsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setSelectedRating(null);
  };

  // Filter products based on selected filters
  const filteredProducts = mockProducts.filter(product => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    if (selectedRating !== null && product.rating < selectedRating) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-white pt-24 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          <aside className="w-64 flex-shrink-0">
            <ProductFilters
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              selectedRating={selectedRating}
              onRatingSelect={setSelectedRating}
              onResetFilters={handleResetFilters}
            />
          </aside>

          {/* Main Content - Product Grid */}
          <main className="flex-1">
            <ProductGrid products={filteredProducts} />
          </main>
        </div>
      </div>
    </div>
  );
}
