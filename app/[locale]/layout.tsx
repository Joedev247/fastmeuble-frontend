import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Toaster } from '@/components/ui/sonner';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import ConditionalLayout from '@/components/layout/ConditionalLayout';
import CookieConsent from '@/components/cookies/CookieConsent';

// Force dynamic rendering - do not prerender this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];

// Load messages directly from JSON files
async function loadMessages(locale: string) {
  const validLocales = ['fr', 'en'];
  if (!validLocales.includes(locale)) {
    return {};
  }

  try {
    // Import base messages
    const baseModule = await import(`@/messages/${locale}.json`);
    const messages = baseModule.default || {};
    return messages;
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    return {};
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await loadMessages(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AuthProvider>
        <CartProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
          <Toaster />
          <CookieConsent />
        </CartProvider>
      </AuthProvider>
    </NextIntlClientProvider>
  );
}
