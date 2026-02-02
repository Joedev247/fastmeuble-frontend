import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/routing.config';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: any) {
  try {
    return intlMiddleware(request);
  } catch (err) {
    // Log and fallback to allow the request to continue rather than returning 500
    // This prevents middleware runtime failures from bringing the whole site down.
    // The error will be visible in server logs for debugging.
    // eslint-disable-next-line no-console
    console.error('Middleware invocation failed:', err);
    return NextResponse.next();
  }
}

export const config = {
  // Exclude admin routes from locale routing
  matcher: ['/((?!api|_next|admin|.*\\..*).*)']
};
