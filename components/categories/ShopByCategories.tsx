'use client';

import { useTranslations, useMessages } from 'next-intl';
import { Link } from '@/lib/navigation';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export default function ShopByCategories() {
  const t = useTranslations('components.categories.ShopByCategories');
  const messages = useMessages();

  // Get categories from translations or use defaults
  let categories: Category[] = [];
  try {
    const categoriesData = (messages as any)?.components?.categories?.ShopByCategories?.categories;
    if (Array.isArray(categoriesData)) {
      categories = categoriesData;
    }
  } catch (e) {
    console.warn('Could not load categories from translations', e);
  }

  // Fallback categories if translations fail
  if (categories.length === 0) {
    categories = [
      {
        id: '1',
        name: 'Dining Chair',
        slug: 'dining-chair',
        image: '/images/category-1.jpg',
      },
      {
        id: '2',
        name: 'Sofas',
        slug: 'sofas',
        image: '/images/category-2.jpg',
      },
      {
        id: '3',
        name: 'Table',
        slug: 'table',
        image: '/images/category-3.jpg',
      },
    ];
  }

  // Take only first 3 categories for the 3 category cards
  const displayCategories = categories.slice(0, 3);

  // Chair icon SVG - Black outline
  const ChairIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className="w-16 h-16"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
    >
      <path d="m492 235.999h-21.519v-118.759c0-64.647-52.593-117.24-117.24-117.24h-194.482c-64.647 0-117.24 52.593-117.24 117.24v118.759h-21.519c-11.046 0-20 8.954-20 20v155.999c0 11.046 8.954 20 20 20h88.606l-26.358 50.787c-5.088 9.804-1.265 21.876 8.539 26.964 9.761 5.067 21.854 1.307 26.965-8.539l35.92-69.213h204.656l35.92 69.213c5.112 9.85 17.205 13.604 26.965 8.539 9.804-5.088 13.627-17.16 8.539-26.964l-26.358-50.787h88.606c11.046 0 20-8.954 20-20v-155.999c0-11.046-8.954-20-20-20zm-410.481-118.759c0-42.59 34.649-77.24 77.24-77.24h194.482c42.591 0 77.24 34.65 77.24 77.24v118.759h-18.481c-11.046 0-20 8.954-20 20v56h-272v-56c0-11.046-8.954-20-20-20h-18.481zm390.481 274.758c-52.382 0-377.882 0-432 0v-116h40v56c0 11.046 8.954 20 20 20h312c11.046 0 20-8.954 20-20v-56h40z" />
    </svg>
  );

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
              <span className="text-2xl md:text-3xl lg:text-4xl font-bold">
                {t('title.line2')}
              </span>
            </h2>

            {/* Gold Horizontal Line - positioned below "categories" */}
            <div className="w-12 h-0.5 bg-amber-500 mb-6"></div>

            {/* Icon and Stats Container */}
            <div className="flex items-start gap-4 mb-6">
              {/* Chair Icon - Black outline */}
              <div className="text-black flex-shrink-0">
                <ChairIcon />
              </div>

              {/* Stats - Light grey text */}
              <div className="text-gray-400 text-sm md:text-base leading-relaxed">
                {(() => {
                  // Get stats from messages directly to avoid HTML parsing issues
                  const statsText = (messages as any)?.components?.categories?.ShopByCategories?.stats || '50 +<br>Completed Projects';
                  return statsText.split('<br>').map((part: string, index: number, array: string[]) => (
                    <span key={index}>
                      {part}
                      {index < array.length - 1 && <br />}
                    </span>
                  ));
                })()}
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
          {displayCategories.map((category) => (
            <Link
              key={category.id}
              href={`/shop/${category.slug}`}
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
          ))}
        </div>
      </div>
    </section>
  );
}
