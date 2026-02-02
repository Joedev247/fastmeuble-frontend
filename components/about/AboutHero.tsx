'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function AboutHero() {
  const t = useTranslations('components.about.AboutHero');

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <p className="text-amber-500 text-sm uppercase tracking-wider mb-4 font-semibold">
              {t('subtitle')}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-black mb-6 leading-tight">
              {t('title')}
            </h1>
            <div className="w-16 h-1 bg-amber-500 mb-6"></div>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8">
              {t('description')}
            </p>
            <div className="flex flex-wrap gap-6">
              <div>
                <div className="text-3xl md:text-4xl font-normal text-amber-500 mb-1">
                  {t('stat1Value')}
                </div>
                <div className="text-gray-600 text-sm uppercase tracking-wide">
                  {t('stat1Label')}
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-normal text-amber-500 mb-1">
                  {t('stat2Value')}
                </div>
                <div className="text-gray-600 text-sm uppercase tracking-wide">
                  {t('stat2Label')}
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-normal text-amber-500 mb-1">
                  {t('stat3Value')}
                </div>
                <div className="text-gray-600 text-sm uppercase tracking-wide">
                  {t('stat3Label')}
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative aspect-[4/3]  overflow-hidden shadow-2xl">
              <Image
                src="/images/slider5-1.jpg"
                alt={t('imageAlt')}
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-500 opacity-20 "></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-500 opacity-10 "></div>
          </div>
        </div>
      </div>
    </section>
  );
}
