'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useMessages } from 'next-intl';
import { Link } from '@/lib/navigation';
import Image from 'next/image';
import { featuredSectionAPI } from '@/lib/api/featuredSections';

interface Banner {
  id: string;
  discount: string;
  title: string;
  buttonText: string;
  image: string;
  link: string;
}

export default function PromoBanners() {
  const t = useTranslations('components.banners.PromoBanners');
  const messages = useMessages();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      setIsLoading(true);
      const sections = await featuredSectionAPI.getAll();
      
      const formattedBanners: Banner[] = sections.map((s: any) => ({
        id: s.id || s._id,
        discount: s.discount || '',
        title: s.title,
        buttonText: s.buttonText || 'Shop now',
        image: s.image,
        link: s.link || `/shop/${s.slug}`,
      }));

      setBanners(formattedBanners);
    } catch (error) {
      console.error('Error loading featured sections:', error);
      // Show empty state - admin needs to add featured sections
      setBanners([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-gray-500">Loading featured sections...</p>
          </div>
        </div>
      </section>
    );
  }

  if (banners.length === 0 && !isLoading) {
    return null; // Don't show section if no featured sections are configured
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((banner) => (
            <Link
              key={banner.id}
              href={banner.link}
              className="group relative block overflow-hidden "
            >
              {/* Background Image */}
              <div className="relative w-full h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={banner.id === '1'}
                  onError={(e) => {
                    console.error('Failed to load image:', banner.image);
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />

                {/* White Border Frame - thin white rectangle outline */}
                <div className="absolute inset-4 border-2 border-white pointer-events-none z-10"></div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 p-8">
                  {/* Discount Text - small white text at top */}
                  <p className="text-white text-xs md:text-sm font-normal uppercase tracking-wider mb-3">
                    {banner.discount}
                  </p>

                  {/* Title - large white text */}
                  <h2 className="text-black text-4xl md:text-5xl lg:text-6xl font-normal mb-4 leading-tight">
                    {banner.title}
                  </h2>

                  {/* Shop Now Button - orange button with white text */}
                  <div className="mt-2">
                    <span className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-medium px-8 py-3  transition-colors duration-300 uppercase text-sm shadow-lg">
                      {banner.buttonText}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
