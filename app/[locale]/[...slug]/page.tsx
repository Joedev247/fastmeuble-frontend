import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { locales } from '@/i18n';

// Mark as dynamic to prevent caching issues
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function CatchAllRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  // Access Request data first - this is required to prevent performance measurement timing issues
  // Next.js needs to know this is a dynamic route before measuring performance
  // We use the headers to ensure proper timing
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  
  // Resolve params after accessing request data
  const resolvedParams = await params;
  
  // Validate locale - if invalid, notFound() will be called by layout
  // For valid locales with unmatched routes, trigger not-found
  if (locales.includes(resolvedParams.locale as any)) {
    notFound();
  }
  
  // If locale is invalid, the layout will handle notFound()
  // Return null to prevent rendering anything
  return null;
}
