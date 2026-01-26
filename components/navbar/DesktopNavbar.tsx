'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import Image from 'next/image';
import NavigationMenu from './NavigationMenu';
import Login from './Login';
import Cart from './Cart';
import LanguageSwitcher from './LanguageSwitcher';

export default function DesktopNavbar() {
  const t = useTranslations('components.navbar.DesktopNavbar');

  return (
    <div className="header-desktop hidden md:block">
      <div className="header-wrapper bg-transparent">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4 gap-6">
            {/* Logo Section */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                <Image
                  src="/images/fast-meuble-logo-removebg-preview.png"
                  alt="Fast Meuble"
                  width={150}
                  height={50}
                  className="h-auto w-auto max-h-12"
                  priority
                />
              </Link>
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 flex items-center justify-center">
              <NavigationMenu />
            </div>

            {/* Right Section - Language Switcher, Login and Cart */}
            <div className="flex items-center gap-6 flex-shrink-0">
              <LanguageSwitcher />
              <Login />
              <Cart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
