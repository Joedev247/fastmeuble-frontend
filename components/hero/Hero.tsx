'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useMessages } from 'next-intl';
import { Link } from '@/lib/navigation';
import Image from 'next/image';

interface Slide {
  subtitle: string;
  year: string;
  badge: string;
  title: string;
  button: string;
}

export default function Hero() {
  // Use useMessages to access the raw translation structure
  const messages = useMessages();
  
  // Get slides directly from messages structure
  let slides: Slide[] = [];
  try {
    // Access the nested structure: messages.components.hero.Hero.slides
    const heroData = (messages as any)?.components?.hero?.Hero;
    if (heroData?.slides && Array.isArray(heroData.slides)) {
      slides = heroData.slides;
    } else {
      // Debug: log what we're getting
      console.warn('Hero: Could not find slides in structure', {
        hasComponents: !!(messages as any)?.components,
        hasHero: !!(messages as any)?.components?.hero,
        hasHeroHero: !!(messages as any)?.components?.hero?.Hero,
        heroData
      });
      slides = [];
    }
  } catch (e) {
    console.error('Hero: Error loading slides', e);
    slides = [];
  }
  
  // Use fallback if no slides loaded
  if (slides.length === 0) {
    slides = [
      {
        subtitle: 'Fast Meuble',
        year: '2024',
        badge: 'NEW ARRIVALS',
        title: 'Furniture Collection',
        button: 'Shop now'
      }
    ];
  }
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slideImages = [
    '/images/slider5-1.jpg',
    '/images/slider5-2.jpg',
    '/images/slider5-3.jpg'
  ];

  const productImages = [
    '/images/slider5-1.jpg',
    '/images/slider5-2.jpg',
    '/images/slider5-3.jpg'
  ];

  // Auto-rotate slides
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000); // Change slide every 7 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after manual navigation
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };


  return (
    <section className="relative w-full h-[70vh] md:h-screen overflow-hidden group">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
              <Image
                src={slideImages[index]}
                alt={slide.title}
                fill
                className="object-cover object-center"
                priority={index === 0}
                sizes="100vw"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  (e.target as HTMLImageElement).src = '/placeholder-slider.jpg';
                }}
              />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4 md:px-8">
                <div className="max-w-2xl relative z-20">
                  {/* Badge */}
                  <div
                    className={`mb-2 transition-all duration-1000 delay-600 ${
                      index === currentSlide
                        ? 'translate-y-0 opacity-100'
                        : '-translate-y-full opacity-0'
                    }`}
                  >
                    <span className="text-black text-xs md:text-sm font-semibold uppercase tracking-wide">
                      {slide.badge}
                    </span>
                  </div>

                  {/* Horizontal Line */}
                  <div
                    className={`w-12 h-0.5 bg-black mb-6 transition-all duration-1000 delay-700 ${
                      index === currentSlide
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-full opacity-0'
                    }`}
                  />

                  {/* Main Title */}
                  <h1
                    className={`text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-light text-black mb-4 md:mb-8 transition-all duration-1000 delay-800 ${
                      index === currentSlide
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-10 opacity-0'
                    }`}
                    style={{ lineHeight: '1.1' }}
                  >
                    {slide.title.includes(' ') ? (
                      slide.title.split(' ').map((word, i) => (
                        <span key={i} className="block">
                          {word}
                        </span>
                      ))
                    ) : (
                      <span className="block">{slide.title}</span>
                    )}
                  </h1>

                  {/* Shop Now Button */}
                  <div
                    className={`transition-all duration-1000 delay-1000 ${
                      index === currentSlide
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-full opacity-0'
                    }`}
                  >
                    <Link
                      href="/shop"
                      className="inline-block bg-amber-500 hover:bg-black text-white font-medium px-6 py-2 md:px-8 md:py-3 text-sm md:text-base transition-colors duration-300"
                    >
                      {slide.button}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Product Image on Right Side - Hidden on mobile */}
              <div
                className={`hidden md:block absolute right-8 md:right-16 bottom-20 md:bottom-32 w-64 md:w-80 transition-all duration-1000 delay-1200 ${
                  index === currentSlide
                    ? 'translate-x-0 opacity-100 scale-100'
                    : 'translate-x-10 opacity-0 scale-95'
                }`}
              >
                <div className="relative w-full aspect-square">
                  <Image
                    src={productImages[index]}
                    alt="Product"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 256px, 320px"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-product.png';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bullets Navigation */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-black ring-2 ring-black ring-offset-2'
                : 'bg-transparent border border-black/30 hover:border-black'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      {isAutoPlaying && (
        <div className="absolute bottom-0 left-0 h-1 bg-white/50 w-full z-20">
          <div
            className="h-full bg-white transition-all ease-linear"
            style={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`
            }}
          />
        </div>
      )}
    </section>
  );
}
