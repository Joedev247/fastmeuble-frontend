'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FaCookie, FaTimes } from 'react-icons/fa';
import { Link } from '@/lib/navigation';

const COOKIE_CONSENT_KEY = 'fast-meuble-cookie-consent';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Show consent modal after a short delay for better UX
      const timer = setTimeout(() => {
        setShowConsent(true);
        // Trigger animation after a brief delay
        setTimeout(() => setIsVisible(true), 10);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setIsVisible(false);
    setTimeout(() => setShowConsent(false), 300);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
    setIsVisible(false);
    setTimeout(() => setShowConsent(false), 300);
  };

  if (!showConsent) return null;

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleReject}
      />

      {/* Cookie Consent Modal */}
      <div
        className={`fixed bottom-0 left-0 right-0 md:bottom-6 md:left-6 md:right-auto z-[9999] md:max-w-md transition-all duration-500 ease-out ${
          isVisible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-full scale-95'
        }`}
      >
            <div className="bg-white rounded-t-2xl md:rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Header with Icon */}
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 px-6 py-4 border-b border-amber-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                      <FaCookie className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-normal text-gray-900">
                        Cookie Preferences
                      </h3>
                      <p className="text-sm text-gray-600 mt-0.5">
                        We value your privacy
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleReject}
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-full transition-colors"
                    aria-label="Close"
                  >
                    <FaTimes size={14} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-5">
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                  By clicking "Accept All", you consent to our use of cookies.{' '}
                  <Link
                    href="/privacy-policy"
                    className="text-amber-600 hover:text-amber-700 underline font-medium"
                  >
                    Learn more
                  </Link>
                </p>

                {/* Cookie Types Info */}
                <div className="bg-gray-50  p-3 mb-5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 font-medium">Essential Cookies</span>
                    <span className="text-gray-500">Always Active</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 font-medium">Analytics Cookies</span>
                    <span className="text-gray-500">Optional</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 font-medium">Marketing Cookies</span>
                    <span className="text-gray-500">Optional</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAccept}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Accept All
                  </Button>
                  <Button
                    onClick={handleReject}
                    variant="outline"
                    className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 transition-all duration-200"
                  >
                    Reject All
                  </Button>
                </div>

                {/* Privacy Policy Link */}
                <div className="mt-4 text-center">
                  <Link
                    href="/privacy-policy"
                    className="text-xs text-gray-500 hover:text-amber-600 transition-colors underline"
                  >
                    Cookie Policy & Privacy Statement
                  </Link>
                </div>
              </div>
            </div>
          </div>
    </>
  );
}

