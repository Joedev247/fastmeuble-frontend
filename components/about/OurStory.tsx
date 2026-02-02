'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FaQuoteLeft } from 'react-icons/fa';

export default function OurStory() {
  const t = useTranslations('components.about.OurStory');

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3]  overflow-hidden shadow-xl">
              <Image
                src="/images/stories.jpg"
                alt={t('imageAlt')}
                fill
                className="object-cover"
              />
            </div>
            {/* Quote Badge */}
            <div className="absolute -bottom-6 -right-6 bg-amber-500 text-white p-6  shadow-xl max-w-xs">
              <FaQuoteLeft className="text-3xl mb-3 opacity-80" />
              <p className="text-sm font-medium italic">
                {t('quote')}
              </p>
            </div>
          </div>

          {/* Right Content */}
          <div className="order-1 lg:order-2">
            <p className="text-amber-500 text-sm uppercase tracking-wider mb-4 font-semibold">
              {t('subtitle')}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-black mb-6">
              {t('title')}
            </h2>
            <div className="w-16 h-1 bg-amber-500 mb-6"></div>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p className="text-lg">
                {t('paragraph1')}
              </p>
              <p>
                {t('paragraph2')}
              </p>
              <p>
                {t('paragraph3')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
