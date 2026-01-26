'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/lib/navigation';
import { FaChevronDown } from 'react-icons/fa';

export default function NavigationMenu() {
  const t = useTranslations('components.navbar.NavigationMenu');
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const menuItems = [
    {
      label: t('home'),
      href: '/',
      hasChildren: false,
      key: 'home',
    },
    {
      label: 'Shop',
      href: '/shop',
      hasChildren: false,
      key: 'shop',
    },
    {
      label: t('about'),
      href: '/about',
      hasChildren: false,
      key: 'about',
    },
    {
      label: t('contact'),
      href: '/#contact',
      hasChildren: false,
      key: 'contact',
    },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/en' || pathname === '/fr' || pathname === '/' || pathname.endsWith('/');
    }
    return pathname.includes(href);
  };

  return (
    <nav className="navbar-default">
      <ul className="flex items-center gap-6">
        {menuItems.map((item) => {
          const active = isActive(item.href);
          return (
            <li
              key={item.key}
              className="relative group"
              onMouseEnter={() => item.hasChildren && setOpenSubmenu(item.key)}
              onMouseLeave={() => setOpenSubmenu(null)}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-1 text-black font-medium transition-colors ${
                  active 
                    ? 'text-amber-500' 
                    : 'hover:text-gray-600'
                }`}
              >
                {item.label}
                {item.hasChildren && (
                  <FaChevronDown className="text-xs" />
                )}
              </Link>
              {item.hasChildren && Array.isArray((item as any).children) && (
                <div
                  className={`absolute top-full left-0 bg-white shadow-lg  p-6 min-w-[200px] z-50 ${
                    openSubmenu === item.key ? 'block' : 'hidden'
                  }`}
                >
                  <ul className="space-y-2">
                    {Array.isArray((item as any).children) &&
                      (item as unknown as { children: Array<{ href: string; label: string }> }).children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block text-black hover:text-amber-500 transition-colors py-1"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
