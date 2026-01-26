import { createNavigation } from 'next-intl/navigation';
import { locales, type Locale } from '@/i18n';

// Define routing configuration
export const routing = {
  locales,
  defaultLocale: 'en' as Locale,
  localePrefix: 'always' as const
};

// Create navigation helpers with locale-aware Link, redirect, etc.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
