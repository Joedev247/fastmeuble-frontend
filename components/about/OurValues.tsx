'use client';

import { useTranslations } from 'next-intl';
import { FaHeart, FaHandshake, FaLightbulb, FaShieldAlt } from 'react-icons/fa';

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function OurValues() {
  const t = useTranslations('components.about.OurValues');

  const values: Value[] = [
    {
      icon: <FaHeart className="w-8 h-8" />,
      title: t('value1Title'),
      description: t('value1Description'),
    },
    {
      icon: <FaHandshake className="w-8 h-8" />,
      title: t('value2Title'),
      description: t('value2Description'),
    },
    {
      icon: <FaLightbulb className="w-8 h-8" />,
      title: t('value3Title'),
      description: t('value3Description'),
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: t('value4Title'),
      description: t('value4Description'),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-amber-500 text-sm uppercase tracking-wider mb-4 font-semibold">
            {t('subtitle')}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            {t('title')}
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="border border-gray-300 p-6 md:p-8 text-center transition-all duration-300 hover:border-amber-500 hover:shadow-lg group"
            >
              <div className="text-amber-500 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {value.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-black mb-3 group-hover:text-amber-500 transition-colors">
                {value.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
