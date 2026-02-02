import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Fast Meuble',
  description: 'The page you are looking for does not exist.',
};

export default function RootNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-normal text-amber-500 leading-none">
            404
          </h1>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-4"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-gray-500">
            It might have been moved, deleted, or the URL might be incorrect.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/en"
            className="px-6 py-3 bg-amber-500 text-white font-semibold  hover:bg-amber-600 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/en/shop"
            className="px-6 py-3 border-2 border-amber-500 text-amber-500 font-semibold  hover:bg-amber-50 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
