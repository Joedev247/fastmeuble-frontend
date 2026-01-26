'use client';

import { useEffect, useState } from 'react';
import { ProductDetail } from '@/components/products/ProductDetail';
import { notFound } from 'next/navigation';

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
    images: ['/images/category-1.jpg', '/images/category-2.jpg', '/images/category-3.jpg'],
    description: 'A beautifully crafted padded seat chair that combines comfort with elegance. Perfect for dining rooms, this chair features premium padding and a sturdy wooden frame.',
    specifications: {
      material: 'Wood & Fabric',
      dimensions: '45cm x 50cm x 90cm',
      weight: '8kg',
      color: 'Grey',
    },
    inStock: true,
  },
  {
    id: '2',
    name: 'Modern Sofa Set',
    category: 'Sofas',
    price: 899.99,
    rating: 4.8,
    reviews: 15,
    image: '/images/category-2.jpg',
    images: ['/images/category-2.jpg', '/images/slider5-1.jpg', '/images/slider5-2.jpg'],
    description: 'Contemporary three-seater sofa set with premium upholstery. Features comfortable cushions and modern design that fits perfectly in any living space.',
    specifications: {
      material: 'Fabric & Foam',
      dimensions: '220cm x 90cm x 85cm',
      weight: '45kg',
      color: 'Dark Grey',
    },
    inStock: true,
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
    images: ['/images/category-3.jpg', '/images/discount-1.jpg', '/images/discount-2.jpg'],
    description: 'Solid wood dining table with elegant finish. Seats up to 6 people comfortably. Perfect for family gatherings and dinner parties.',
    specifications: {
      material: 'Solid Wood',
      dimensions: '180cm x 90cm x 75cm',
      weight: '35kg',
      color: 'Brown',
    },
    inStock: true,
  },
  {
    id: '4',
    name: 'Luxury Armchair',
    category: 'Chairs',
    price: 299.99,
    rating: 4.6,
    reviews: 12,
    image: '/images/discount-1.jpg',
    images: ['/images/discount-1.jpg', '/images/discount-2.jpg', '/images/slider5-1.jpg'],
    description: 'Elegant luxury armchair with premium upholstery. Perfect for reading corners or as an accent piece in your living room.',
    specifications: {
      material: 'Fabric & Wood',
      dimensions: '75cm x 80cm x 95cm',
      weight: '15kg',
      color: 'Beige',
    },
    inStock: true,
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
    images: ['/images/discount-2.jpg', '/images/slider5-2.jpg', '/images/slider5-3.jpg'],
    description: 'Modern coffee table with clean lines and functional design. Features a spacious top surface and elegant base.',
    specifications: {
      material: 'Glass & Metal',
      dimensions: '120cm x 60cm x 45cm',
      weight: '12kg',
      color: 'Clear Glass',
    },
    inStock: true,
  },
  {
    id: '6',
    name: 'Sectional Sofa',
    category: 'Sofas',
    price: 1299.99,
    rating: 4.9,
    reviews: 20,
    image: '/images/slider5-1.jpg',
    images: ['/images/slider5-1.jpg', '/images/slider5-2.jpg', '/images/slider5-3.jpg'],
    description: 'Spacious sectional sofa perfect for large living rooms. Features multiple seating positions and premium comfort.',
    specifications: {
      material: 'Leather & Foam',
      dimensions: '280cm x 120cm x 90cm',
      weight: '85kg',
      color: 'Brown',
    },
    inStock: true,
    isHot: true,
  },
];

export default function ProductDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const [product, setProduct] = useState<typeof mockProducts[0] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(p => {
      const foundProduct = mockProducts.find(prod => prod.id === p.id);
      if (!foundProduct) {
        notFound();
      }
      setProduct(foundProduct);
      setLoading(false);
    });
  }, [params]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
