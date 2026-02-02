'use client';

import { useTranslations, useMessages } from 'next-intl';
import { Link } from '@/lib/navigation';
import { FaUserCog } from 'react-icons/fa';

interface OurStoriesData {
  id: string;
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  brandText: string;
}

export default function OurStories() {
  const t = useTranslations('components.sections.OurStories');
  const messages = useMessages();

  // Get data from translations
  let data: OurStoriesData | null = null;
  try {
    const storiesData = (messages as any)?.components?.sections?.OurStories?.data;
    if (storiesData) {
      data = storiesData;
    }
  } catch (e) {
    console.warn('Could not load OurStories data from translations', e);
  }

  // Fallback data if translations fail
  if (!data) {
    data = {
      id: '1',
      subtitle: 'OUR STORIES',
      title: 'We design everything we make.',
      description: 'Sed cursus turpis vitae tortor. Curabitur ligula sapien, tincidunt non, euismod posuere imperdiet, leo. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Nullam cursus lacinia erat. Nulla sit amet est.',
      buttonText: 'ABOUT US',
      buttonLink: '/about',
      image: '/images/stories.jpg',
      brandText: 'Fast Meuble',
    };
  }

  return (
    <section 
      className="py-16 md:py-24 relative overflow-hidden bg-cover bg-center bg-no-repeat min-h-[600px] md:min-h-[700px] flex items-center"
      style={{
        backgroundImage: `url(${data.image})`,
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Scattered green leaves - decorative background elements */}
        <div className="absolute top-20 left-10 w-8 h-8 bg-green-500 opacity-20 rounded-full"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-green-400 opacity-15 rounded-full"></div>
        <div className="absolute bottom-32 left-1/4 w-10 h-10 bg-green-500 opacity-10 rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-7 h-7 bg-green-400 opacity-20 rounded-full"></div>
        
        {/* Large faded gray text "ur" */}
        <div className="absolute bottom-0 right-0 text-gray-200 text-[200px] md:text-[300px] font-normal opacity-30 select-none" style={{ fontFamily: 'sans-serif' }}>
          ur
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          {/* Content Overlay */}
          <div className="relative z-20">
            {/* Subtitle */}
            <p className="text-black text-sm uppercase tracking-wider mb-4 drop-shadow-md">
              {data.subtitle}
            </p>

            {/* Main Title */}
            <h2 className="text-black text-4xl md:text-5xl lg:text-6xl font-normal mb-6 leading-tight drop-shadow-md">
              {data.title.split(' ').slice(0, 3).join(' ')}
              <br />
              {data.title.split(' ').slice(3).join(' ')}
            </h2>

            {/* Gold Underline */}
            <div className="w-16 h-1 bg-amber-500 mb-6"></div>

            {/* Description */}
            <p className="text-black text-sm md:text-base leading-relaxed mb-8 max-w-lg drop-shadow-md">
              {data.description}
            </p>

            {/* About Us Button */}
            <Link
              href={data.buttonLink}
              className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-white font-normal px-8 py-4 transition-colors duration-300 uppercase text-sm shadow-lg"
            >
              <FaUserCog size={18} />
              <span>{data.buttonText}</span>
            </Link>
          </div>

          {/* Vertical Brand Text on Right */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 lg:translate-x-12 hidden lg:block z-10">
            <div 
              className="text-black font-normal text-sm md:text-base tracking-wider drop-shadow-md"
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'upright',
              }}
            >
              <div className="mb-2">{data.brandText.split(' ')[0]}</div>
              <div className="w-0.5 h-4 bg-black mx-auto my-2"></div>
              <div>{data.brandText.split(' ')[1]}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
