import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/routing.config';
import { NextResponse, type NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  try {
    const response = intlMiddleware(request);
    if (response) {
      return response;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Middleware error:', error instanceof Error ? error.message : String(error));
  }
  
  // Fallback: allow request to continue without locale processing
  return NextResponse.next();
}

export const config = {
  // Exclude admin routes from locale routing
  matcher: ['/((?!api|_next|admin|.*\\..*).*)']
};
