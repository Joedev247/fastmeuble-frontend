'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaWhatsapp,
  FaLinkedin,
  FaYoutube,
  FaArrowRight
} from 'react-icons/fa';
import { toast } from 'sonner';

export default function Footer() {
  const t = useTranslations('components.footer.Footer');
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    // TODO: Implement newsletter subscription
    toast.success('Thank you for subscribing to our newsletter!');
    setEmail('');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              {/* Logo Icon */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                <svg
                  viewBox="0 0 32 32"
                  className="w-full h-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 6 L6 26 L26 26"
                    stroke="#F59E0B"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d="M6 6 L6 26"
                    stroke="#F59E0B"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10 6 L10 26"
                    stroke="#F59E0B"
                    strokeWidth="2"
                  />
                  <path
                    d="M6 6 L10 6"
                    stroke="#F59E0B"
                    strokeWidth="2"
                  />
                  <path
                    d="M6 26 L10 26"
                    stroke="#F59E0B"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <span className="text-white font-bold text-xl uppercase tracking-wide">FAST MEUBLE</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t('companyDescription')}
            </p>
            
            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-amber-500 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-amber-500 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-amber-500 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Twitter"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="https://wa.me/237XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-green-500 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-amber-500 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wide">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  {t('shop')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  {t('contact')}
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  {t('cart')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wide">
              {t('customerService')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about#faq" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  {t('faq')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  {t('aboutUs')}
                </Link>
              </li>
              <li>
                <a href="/#contact" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  {t('contactUs')}
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  {t('shippingInfo')}
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  {t('returns')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wide">
              {t('getInTouch')}
            </h3>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-amber-500 mt-1 flex-shrink-0" size={16} />
                <p className="text-gray-400 text-sm">
                  {t('address')}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-amber-500 flex-shrink-0" size={16} />
                <a href="tel:+237XXXXXXXXX" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  {t('phone')}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-amber-500 flex-shrink-0" size={16} />
                <a href="mailto:info@fastmeuble.com" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                  {t('email')}
                </a>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-3">
                {t('newsletter')}
              </h4>
              <p className="text-gray-400 text-xs mb-3">
                {t('newsletterDescription')}
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('emailPlaceholder')}
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                  required
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 transition-colors duration-300 flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  <FaArrowRight size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-gray-400 text-sm text-center md:text-left">
              <p>
                © {currentYear} {t('companyName')}. {t('allRightsReserved')}.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center gap-4 justify-center md:justify-end">
              <Link href="/privacy" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                {t('privacyPolicy')}
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/terms" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                {t('termsOfService')}
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/cookies" className="text-gray-400 hover:text-amber-500 transition-colors text-sm">
                {t('cookiePolicy')}
              </Link>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-4 pt-4 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-xs">
              {t('madeWith')} <span className="text-amber-500">❤</span> {t('inCameroon')} | {t('customFurniture')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
