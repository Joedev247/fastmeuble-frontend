import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/navigation';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: any) {
  return intlMiddleware(request);
}

export const config = {
  // Exclude admin routes from locale routing
  matcher: ['/((?!api|_next|admin|.*\\..*).*)']
};
