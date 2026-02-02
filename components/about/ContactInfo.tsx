'use client';

import { useTranslations } from 'next-intl';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaWhatsapp } from 'react-icons/fa';
import { Link } from '@/lib/navigation';

export default function ContactInfo() {
  const t = useTranslations('components.about.ContactInfo');

  return (
    <section className="py-16 md:py-24 bg-white">
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
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Location */}
          <div className="bg-gray-50 p-6 md:p-8 text-center border border-gray-200 transition-all duration-300 hover:border-amber-500 hover:shadow-lg group">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <FaMapMarkerAlt className="text-white text-xl" />
            </div>
            <h3 className="text-lg font-normal text-black mb-2">{t('locationTitle')}</h3>
            <p className="text-gray-600 text-sm">{t('location')}</p>
          </div>

          {/* Phone */}
          <div className="bg-gray-50 p-6 md:p-8 text-center border border-gray-200 transition-all duration-300 hover:border-amber-500 hover:shadow-lg group">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <FaPhone className="text-white text-xl" />
            </div>
            <h3 className="text-lg font-normal text-black mb-2">{t('phoneTitle')}</h3>
            <a href={`tel:${t('phone')}`} className="text-gray-600 text-sm hover:text-amber-500 transition-colors">
              {t('phone')}
            </a>
          </div>

          {/* Email */}
          <div className="bg-gray-50 p-6 md:p-8 text-center border border-gray-200 transition-all duration-300 hover:border-amber-500 hover:shadow-lg group">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <FaEnvelope className="text-white text-xl" />
            </div>
            <h3 className="text-lg font-normal text-black mb-2">{t('emailTitle')}</h3>
            <a href={`mailto:${t('email')}`} className="text-gray-600 text-sm hover:text-amber-500 transition-colors break-all">
              {t('email')}
            </a>
          </div>

          {/* Hours */}
          <div className="bg-gray-50 p-6 md:p-8 text-center border border-gray-200 transition-all duration-300 hover:border-amber-500 hover:shadow-lg group">
            <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <FaClock className="text-white text-xl" />
            </div>
            <h3 className="text-lg font-normal text-black mb-2">{t('hoursTitle')}</h3>
            <p className="text-gray-600 text-sm">{t('hours')}</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-white font-normal px-8 py-4 transition-colors duration-300 uppercase text-sm shadow-lg"
          >
            <FaWhatsapp size={18} />
            <span>{t('ctaButton')}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
