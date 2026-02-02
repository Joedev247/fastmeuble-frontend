'use client';

import { useTranslations, useMessages } from 'next-intl';
import { Link } from '@/lib/navigation';
import Image from 'next/image';

interface BannerData {
  id: string;
  image: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  link?: string;
}

export default function ProductBanner() {
  const t = useTranslations('components.banners.ProductBanner');
  const messages = useMessages();

  // Get banner data from translations
  let banner: BannerData | null = null;
  try {
    const bannerData = (messages as any)?.components?.banners?.ProductBanner?.banner;
    if (bannerData) {
      banner = bannerData;
    }
  } catch (e) {
    console.warn('Could not load banner from translations', e);
  }

  // Fallback banner if translations fail
  if (!banner) {
    banner = {
      id: '1',
      image: '/images/goodvibes.jpg',
      title: t('title') || 'Modern Living Room',
      subtitle: t('subtitle') || 'Create your perfect space',
      buttonText: t('buttonText') || 'Shop Now',
      link: '/shop/living-room',
    };
  }

  const content = (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background Image */}
      <Image
        src={banner.image}
        alt={banner.title || 'Product Banner'}
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      
      {/* Text Overlay on Left */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-md">
            {/* Subtitle */}
            {banner.subtitle && (
              <p className="text-black text-sm md:text-base font-normal mb-2 drop-shadow-md">
                {banner.subtitle}
              </p>
            )}
            
            {/* Title */}
            {banner.title && (
              <h2 className="text-black text-3xl md:text-4xl lg:text-5xl font-normal mb-4 drop-shadow-md">
                {banner.title}
              </h2>
            )}
            
            {/* Button */}
            {banner.buttonText && (
              <div className="mt-6">
                <span className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-3 text-sm md:text-base transition-colors duration-300">
                  {banner.buttonText}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="w-full bg-white">
      {banner.link ? (
        <Link href={banner.link} className="block">
          {content}
        </Link>
      ) : (
        content
      )}
    </section>
  );
}
