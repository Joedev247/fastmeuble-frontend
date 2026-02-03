import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import { Toaster } from '@/components/ui/sonner';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import ConditionalLayout from '@/components/layout/ConditionalLayout';
import CookieConsent from '@/components/cookies/CookieConsent';

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

  const messages = await getMessages({ locale });

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
