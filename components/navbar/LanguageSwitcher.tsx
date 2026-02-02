'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter, getPathname } from '@/lib/navigation';
import { locales, Locale } from '@/i18n';
import { useState, useRef, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const switchLocale = (newLocale: Locale) => {
    // Get the current pathname from window.location (includes locale)
    const currentPath = window.location.pathname;
    const segments = currentPath.split('/').filter(Boolean);
    
    // Replace locale instead of stacking: if first segment is a locale, replace it
    if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
      segments[0] = newLocale; // Replace the locale
    } else {
      // No locale found, insert it at the beginning
      segments.unshift(newLocale);
    }
    
    // Construct the new path
    const newPath = '/' + segments.join('/');
    
    // Use window.location directly to avoid next-intl router adding locale prefix
    // This ensures we navigate to the exact path we constructed
    window.location.href = newPath;
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const languageOptions = [
    { code: 'en' as Locale, flag: '🇺🇸', label: 'EN' },
    { code: 'fr' as Locale, flag: '🇫🇷', label: 'FR' },
  ];

  const currentLanguage = languageOptions.find(lang => lang.code === locale);

  return (
    <div className="relative language-switcher" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 px-3 py-2 text-black hover:opacity-80 transition-opacity"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Switch language"
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="text-sm font-medium">{currentLanguage?.label}</span>
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-gray-900  shadow-xl min-w-[160px] z-50 overflow-hidden">
          {languageOptions.map((lang) => (
            <button
              key={lang.code}
              className={`w-full flex items-center justify-between px-4 py-3 text-white hover:bg-gray-800 transition-colors ${
                lang.code === locale ? 'bg-gray-800' : ''
              }`}
              onClick={() => switchLocale(lang.code)}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm font-medium">{lang.label}</span>
              </div>
              {lang.code === locale && (
                <FaCheck className="text-green-500" size={14} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
