'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Detect locale from browser or default to French
    const browserLang = typeof navigator !== 'undefined' 
      ? navigator.language?.split('-')[0]?.toLowerCase() 
      : null;
    
    const locale = browserLang === 'en' ? 'en' : 'fr';
    router.push(`/${locale}`);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting...</p>
    </div>
  );
}
