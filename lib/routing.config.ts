// This file is used by middleware and should only contain simple routing configuration
// Do not import from @/i18n to avoid Edge Function issues
export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];

export const routing = {
  locales,
  defaultLocale: 'fr' as Locale,
  localePrefix: 'always' as const
};
