'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useMessages } from 'next-intl';
import { Link } from '@/lib/navigation';
import Image from 'next/image';
import { categoryAPI } from '@/lib/api/categories';
import { productAPI } from '@/lib/api/products';
import { settingsAPI } from '@/lib/api/settings';
import { CategoryCardSkeleton } from '@/components/categories/CategoryCardSkeleton';

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export default function ShopByCategories() {
  const t = useTranslations('components.categories.ShopByCategories');
  const messages = useMessages();
  const [categories, setCategories] = useState<Category[]>([]);
  const [stats, setStats] = useState<string>('50 +<br>Completed Projects');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      
      // Load categories
      const categoriesData = await categoryAPI.getAll();
      const formattedCategories: Category[] = categoriesData.slice(0, 3).map((c: any) => ({
        id: c.id || c._id,
        name: c.name,
        slug: c.slug,
        image: c.image || '/images/category-1.jpg',
      }));

      setCategories(formattedCategories);

      // Load product count for stats
      try {
        const products = await productAPI.getAll({ status: 'published' });
        const totalProducts = products.length;
        setStats(`${totalProducts} +<br>Completed Projects`);
      } catch (error) {
        console.error('Error loading product count:', error);
        setStats('0 +<br>Completed Projects');
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      // Show empty state - admin needs to add categories
      setCategories([]);
      setStats('0 +<br>Completed Projects');
    } finally {
      setIsLoading(false);
    }
  };

  // Take only first 3 categories for the 3 category cards
  const displayCategories = categories.slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* 4 Equal Width Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* First Card: Text Content */}
          <div className="flex flex-col justify-center bg-white p-6 h-full">
            {/* Title - "Shop" smaller, "by categories" larger - reduced sizes */}
            <h2 className="text-black mb-3 leading-tight">
              <span className="text-lg md:text-xl font-normal">
                {t('title.line1')}
              </span>
              <br />
              <span className="text-2xl md:text-3xl lg:text-4xl font-normal">
                {t('title.line2')}
              </span>
            </h2>

            {/* Gold Horizontal Line - positioned below "categories" */}
            <div className="w-12 h-0.5 bg-amber-500 mb-6"></div>

            {/* Icon and Stats Container */}
            <div className="flex items-start gap-4 mb-6">
              {/* App Logo */}
              <div className="flex-shrink-0 w-20 h-20">
                <Image
                  src="/images/fast-meuble-logo-removebg-preview.png"
                  alt="Fast Meuble Logo"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Stats - Light grey text */}
              <div className="text-gray-400 text-sm md:text-base leading-relaxed">
                {stats.split('<br>').map((part: string, index: number, array: string[]) => (
                  <span key={index}>
                    {part}
                    {index < array.length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>

            {/* Button - Underlined link style */}
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-black font-normal uppercase text-xs hover:text-amber-500 transition-colors duration-300 border-b border-black hover:border-amber-500 pb-1 w-fit mt-auto"
            >
              <span>{t('buttonText')}</span>
              <span className="text-xs">►</span>
            </Link>
          </div>

          {/* Remaining 3 Cards: Category Cards */}
          {isLoading ? (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <CategoryCardSkeleton key={index} />
              ))}
            </>
          ) : displayCategories.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500">No categories available</p>
              <p className="text-gray-400 text-sm mt-2">Add categories from the admin dashboard</p>
            </div>
          ) : (
            displayCategories.map((category) => (
            <Link
              key={category.id}
              href="/shop"
              className="group block h-full"
            >
              <div className="item-product-cat-content bg-gray-100 overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                {/* Category Image - reduced height */}
                <div className="item-image relative w-full h-48 md:h-56 bg-gray-100 overflow-hidden flex items-center justify-center">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-contain object-center p-4 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Category Title */}
                <h2 className="item-title text-black text-base md:text-lg font-normal text-center py-4 px-4 group-hover:text-amber-500 transition-colors">
                  {category.name}
                </h2>
              </div>
            </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
