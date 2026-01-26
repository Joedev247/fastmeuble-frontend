'use client';

import { usePathname } from '@/lib/navigation';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import { locales } from '@/i18n';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname?.includes('/login');
  
  // Check if pathname starts with a valid locale prefix
  const hasLocalePrefix = pathname && locales.some(locale => {
    return pathname === `/${locale}` || pathname.startsWith(`/${locale}/`);
  });
  
  // Valid route patterns to detect 404s
  const validRoutes = ['', 'about', 'shop', 'cart', 'checkout'];
  
  // Check if this is a valid route (not a 404)
  // If pathname doesn't have locale prefix, assume it's valid (might be root or other cases)
  const isValidRoute = !hasLocalePrefix || (pathname && locales.some(locale => {
    const localePrefix = `/${locale}`;
    // Home page
    if (pathname === localePrefix || pathname === `/${locale}/`) return true;
    // Routes with locale prefix
    if (pathname.startsWith(`${localePrefix}/`)) {
      const route = pathname.slice(localePrefix.length + 1);
      const routeParts = route.split('/').filter(Boolean);
      if (routeParts.length === 0) return true; // Just trailing slash
      
      const firstPart = routeParts[0];
      // Check if first part is a valid route
      if (validRoutes.includes(firstPart)) {
        // For shop routes, allow any number of segments (e.g., shop/[id])
        if (firstPart === 'shop') return true;
        // For other routes, must be exact match (single segment)
        return routeParts.length === 1;
      }
      // If route doesn't match valid patterns, it's a 404
      return false;
    }
    return false;
  }));
  
  // Show navbar and footer on all pages with locale prefix that are valid routes
  // Also show if no locale prefix (to handle edge cases)
  // Hide on login and 404 pages
  const shouldShowNavbarFooter = !isLoginPage && (hasLocalePrefix ? isValidRoute : true);

  return (
    <>
      {shouldShowNavbarFooter && <Navbar />}
      {children}
      {shouldShowNavbarFooter && <Footer />}
    </>
  );
}
