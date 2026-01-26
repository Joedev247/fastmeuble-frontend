'use client';

import { Link } from '@/lib/navigation';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';

export default function NotFoundContent() {
  return (
    <>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          asChild
          className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-6 text-lg"
        >
          <Link href="/">
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-gray-300 hover:bg-gray-50 px-8 py-6 text-lg"
        >
          <Link href="/shop">
            <Search className="mr-2 h-5 w-5" />
            Browse Products
          </Link>
        </Button>
      </div>

      {/* Helpful Links */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-500 mb-4">You might be looking for:</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/shop"
            className="text-amber-500 hover:text-amber-600 text-sm font-medium transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="text-amber-500 hover:text-amber-600 text-sm font-medium transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/"
            className="text-amber-500 hover:text-amber-600 text-sm font-medium transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </>
  );
}
