'use client';

import { useTranslations } from 'next-intl';
import { FaBullseye, FaEye } from 'react-icons/fa';

export default function MissionVision() {
  const t = useTranslations('components.about.MissionVision');

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-amber-500 text-sm uppercase tracking-wider mb-4 font-semibold">
            {t('subtitle')}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-black mb-4">
            {t('title')}
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mb-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Mission */}
          <div className="bg-white p-8 md:p-10 shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mb-6">
              <FaBullseye className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl md:text-3xl font-normal text-black mb-4">
              {t('missionTitle')}
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t('missionDescription')}
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-8 md:p-10 shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mb-6">
              <FaEye className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl md:text-3xl font-normal text-black mb-4">
              {t('visionTitle')}
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t('visionDescription')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
