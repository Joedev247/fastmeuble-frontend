'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FaSearch, FaChevronDown } from 'react-icons/fa';

interface SearchProps {
  variant?: 'mobile' | 'desktop' | 'header';
}

export default function Search({ variant = 'desktop' }: SearchProps) {
  const t = useTranslations('components.navbar.Search');
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (variant === 'mobile' || variant === 'header') {
    return (
      <div className="search-box">
        <button
          className="search-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={t('search')}
        >
          <FaSearch className="wpb-icon-magnifying-glass" size={20} />
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg p-4 z-50">
            <form role="search" method="get" className="search-from flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                name="s"
                className="input-search flex-1 border border-gray-300 rounded px-3 py-2"
                placeholder={t('placeholder')}
              />
              <button
                type="submit"
                className="btn bg-black text-white px-4 py-2 rounded"
              >
                <FaSearch size={16} />
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="header-search-form">
      <form
        role="search"
        method="get"
        className="flex items-center"
        action="/"
      >
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            name="s"
            id="ss"
            className="input-search bg-white border border-gray-300 rounded-l-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder={t('placeholder') || 'Search...'}
          />
        </div>
        
        {/* Search Button */}
        <button
          id="searchsubmit2"
          className="bg-black text-white px-4 py-2 rounded-r-lg hover:bg-gray-800 transition-colors focus:outline-none flex items-center justify-center"
          type="submit"
          aria-label={t('search')}
        >
          <FaSearch size={16} />
        </button>
      </form>
    </div>
  );
}
