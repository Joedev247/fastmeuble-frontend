'use client';

import { useTranslations, useMessages } from 'next-intl';
import { FaTools, FaHandHolding, FaClock, FaAward } from 'react-icons/fa';

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export default function WhyChooseUs() {
  const t = useTranslations('components.sections.WhyChooseUs');
  const messages = useMessages();

  // Get features from translations or use defaults
  let features: Feature[] = [];
  try {
    const featuresData = (messages as any)?.components?.sections?.WhyChooseUs?.features;
    if (Array.isArray(featuresData)) {
      features = featuresData;
    }
  } catch (e) {
    console.warn('Could not load WhyChooseUs features from translations', e);
  }

  // Fallback features if translations fail
  if (features.length === 0) {
    features = [
      {
        id: '1',
        icon: 'tools',
        title: 'Custom Made',
        description: 'Every piece is crafted to your exact specifications and preferences.',
      },
      {
        id: '2',
        icon: 'hand',
        title: 'Handcrafted Excellence',
        description: 'Skilled artisans bring your vision to life with attention to detail.',
      },
      {
        id: '3',
        icon: 'clock',
        title: 'Made to Order',
        description: 'We work on command, ensuring each piece meets your unique needs.',
      },
      {
        id: '4',
        icon: 'award',
        title: 'Quality Guaranteed',
        description: 'Premium materials and craftsmanship that stands the test of time.',
      },
    ];
  }

  // Icon mapping
  const iconMap: Record<string, React.ReactNode> = {
    tools: <FaTools className="w-8 h-8" />,
    hand: <FaHandHolding className="w-8 h-8" />,
    clock: <FaClock className="w-8 h-8" />,
    award: <FaAward className="w-8 h-8" />,
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-amber-500 text-sm uppercase tracking-wider mb-3 font-semibold">
            {t('subtitle')}
          </p>
          <h2 className="text-black text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('title')}
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mb-6"></div>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="border border-gray-300 p-6 md:p-8 transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="text-amber-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                {iconMap[feature.icon] || <FaTools className="w-8 h-8" />}
              </div>

              {/* Title */}
              <h3 className="text-black text-xl md:text-2xl font-bold mb-3 group-hover:text-amber-500 transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
