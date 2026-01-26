import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import { Toaster } from '@/components/ui/sonner';
import { CartProvider } from '@/contexts/CartContext';
import ConditionalLayout from '@/components/layout/ConditionalLayout';

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
      <CartProvider>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        <Toaster />
      </CartProvider>
    </NextIntlClientProvider>
  );
}
