'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import { RiMenu4Line } from 'react-icons/ri';
import Cart from './Cart';
import LanguageSwitcher from './LanguageSwitcher';

export default function MobileNavbar() {
  const t = useTranslations('components.navbar.MobileNavbar');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="header-mobile md:hidden">
      <div className="container mx-auto px-4">
        <div className="row flex items-center justify-between py-4">
          <div className="col-6 header-left flex justify-start">
            <div className="wpbingoLogo">
              <Link href="/">
                <Image
                  src="/images/fast-meuble-logo.jpg"
                  alt="Fast Meuble"
                  width={120}
                  height={40}
                  className="h-auto max-h-10"
                  priority
                />
              </Link>
            </div>
          </div>
          <div className="col-6 header-right flex justify-end items-center gap-3">
            <LanguageSwitcher />
            <Cart cartCount={0} />
            <button
              type="button"
              id="show-megamenu"
              className="navbar-toggle flex items-center justify-center p-2 text-black hover:text-amber-500 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t('menu')}
            >
              <RiMenu4Line size={24} />
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 pt-16">
          {/* Close Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 p-2 text-black hover:text-amber-500 transition-colors"
            aria-label="Close menu"
          >
            <FaTimes size={24} />
          </button>
          
          <div className="p-4">
            <nav className="mobile-menu">
              <ul className="space-y-4">
                <li>
                  <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold">
                    {t('home')}
                  </Link>
                </li>
                <li>
                  <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold">
                    {t('shop')}
                  </Link>
                </li>
                <li>
                  <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold">
                    {t('blog')}
                  </Link>
                </li>
                <li>
                  <Link href="/vendors" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold">
                    {t('vendors')}
                  </Link>
                </li>
                <li>
                  <Link href="/about" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold">
                    {t('about')}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-lg font-semibold">
                    {t('contact')}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
