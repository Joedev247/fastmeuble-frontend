'use client';

import { useState } from 'react';
import { useTranslations, useMessages } from 'next-intl';
import { Link } from '@/lib/navigation';
import Image from 'next/image';
import { FaShoppingBag, FaPlus, FaMinus } from 'react-icons/fa';

interface ProductShowcaseData {
  id: string;
  image: string;
  designedYear: string;
  name: string;
  price: string;
  brand: {
    name: string;
    logo: string;
  };
  description: string;
  colors: Array<{
    name: string;
    value: string;
  }>;
  sizes: string[];
  bestSellerYear?: string;
}

export default function ProductShowcase() {
  const t = useTranslations('components.products.ProductShowcase');
  const messages = useMessages();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // Get product data from translations
  let product: ProductShowcaseData | null = null;
  try {
    const productData = (messages as any)?.components?.products?.ProductShowcase?.product;
    if (productData) {
      product = productData;
    }
  } catch (e) {
    console.warn('Could not load product from translations', e);
  }

  // Fallback product if translations fail
  if (!product) {
    product = {
      id: '1',
      image: '/images/category-1.jpg', // TODO: Update to actual product image filename
      designedYear: '2015',
      name: 'Aqua Globes',
      price: '$25.00 - $30.00',
      brand: {
        name: 'FURNITURE',
        logo: '/images/brand-logo.png',
      },
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
      colors: [
        { name: 'Blue', value: '#4A90E2' },
        { name: 'Orange', value: '#F97316' },
        { name: 'Green', value: '#10B981' },
        { name: 'Gray', value: '#9CA3AF' },
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      bestSellerYear: '2020',
    };
  }

  // Set default selected color and size
  if (!selectedColor && product.colors && product.colors.length > 0) {
    setSelectedColor(product.colors[product.colors.length - 1].value); // Default to gray (last color)
  }
  if (!selectedSize && product.sizes && product.sizes.length > 0) {
    setSelectedSize('L'); // Default to L
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    console.log('Add to cart:', {
      product: product?.name,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side: Product Image */}
          <div className="relative">
            <div className="relative w-full aspect-square bg-white overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain object-center p-8"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                onError={(e) => {
                  console.error('Image failed to load:', product.image);
                  // Fallback to a placeholder or existing image
                  (e.target as HTMLImageElement).src = '/images/category-1.jpg';
                }}
              />
              
              {/* Best Seller Badge - Vertical text on left */}
              {product.bestSellerYear && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                  <div 
                    className="text-black font-bold text-sm md:text-base tracking-wider"
                    style={{
                      writingMode: 'vertical-rl',
                      textOrientation: 'upright',
                      transform: 'rotate(180deg)',
                    }}
                  >
                    BEST SELLER {product.bestSellerYear}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Product Details */}
          <div className="space-y-6">
            {/* Designed Year */}
            <p className="text-gray-400 text-sm uppercase tracking-wide">
              {t('designed')} {product.designedYear}
            </p>

            {/* Product Name */}
            <h1 className="text-black text-4xl md:text-5xl font-bold">
              {product.name}
            </h1>

            {/* Price */}
            <p className="text-amber-500 text-2xl md:text-3xl font-bold">
              {product.price}
            </p>

            {/* Brand */}
            <div className="flex items-center gap-3 pt-4">
              <span className="text-black font-medium uppercase text-sm">
                {t('brand')}:
              </span>
              <div className="flex items-center gap-2 border border-black p-2">
                <div className="w-8 h-8 flex items-center justify-center">
                  <div className="w-6 h-6 border border-black flex items-center justify-center">
                    <div className="text-xs font-bold">F</div>
                  </div>
                </div>
                <span className="text-xs font-medium uppercase">{product.brand.name}</span>
              </div>
            </div>

            {/* Description */}
            <div className="pt-4">
              <p className="text-gray-500 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Color Options */}
            <div className="pt-4">
              <span className="text-black font-medium uppercase text-sm block mb-3">
                {t('color')}
              </span>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color.value
                        ? 'border-black'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color.value }}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Options */}
            <div className="pt-4">
              <div className="flex items-center gap-4">
                <span className="text-black font-medium uppercase text-sm">
                  {t('size')}
                </span>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border-2 flex items-center justify-center text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-black text-black hover:bg-gray-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="pt-4">
              <div className="flex items-center gap-4">
                <span className="text-black font-medium uppercase text-sm">
                  {t('quantity')}
                </span>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 1;
                      setQuantity(value > 0 ? value : 1);
                    }}
                    className="w-16 h-12 text-center border border-black focus:outline-none text-black font-medium"
                    min="1"
                  />
                  <div className="flex flex-col ml-1 border border-black">
                    <button
                      onClick={incrementQuantity}
                      className="w-6 h-6 flex items-center justify-center border-b border-black hover:bg-gray-100 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <FaPlus size={10} />
                    </button>
                    <button
                      onClick={decrementQuantity}
                      className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <FaMinus size={10} />
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
            <div>
              <button
                onClick={handleAddToCart}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium px-8 py-4 uppercase text-sm flex items-center justify-center gap-3 transition-colors duration-300"
              >
                <FaShoppingBag size={18} />
                <span>{t('addToCart')}</span>
              </button>
            </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
}
