'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { useRouter } from '@/lib/navigation';

export default function Login() {
  const t = useTranslations('components.navbar.Login');
  const router = useRouter();
  const [activeMode, setActiveMode] = useState<'login' | 'signup'>('login');

  const handleToggle = (mode: 'login' | 'signup') => {
    setActiveMode(mode);
    // Redirect to login page
    router.push('/login');
  };


  return (
    <>
      <div className="account">
        {/* Toggle Switcher Button */}
        <div className="relative inline-flex items-center bg-gray-100 Fast Meuble p-1 shadow-sm border border-gray-200">
          {/* Sliding Background */}
          <div
            className={`absolute top-1 bottom-1  bg-amber-500 shadow-md transition-all duration-300 ease-in-out ${
              activeMode === 'login' ? 'left-1 right-1/2' : 'left-1/2 right-1'
            }`}
          />
          
          {/* Login Button */}
          <button
            onClick={() => handleToggle('login')}
            className={`relative z-10 flex items-center gap-2 px-4 py-2  font-medium transition-all duration-300 ease-in-out ${
              activeMode === 'login'
                ? 'text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <FaSignInAlt size={16} />
            <span className="text-sm whitespace-nowrap">{t('login')}</span>
          </button>
          
          {/* Divider */}
          <div className="relative z-10 w-px h-6 bg-gray-300 mx-1" />
          
          {/* Sign Up Button */}
          <button
            onClick={() => handleToggle('signup')}
            className={`relative z-10 flex items-center gap-2 px-4 py-2  font-medium transition-all duration-300 ease-in-out ${
              activeMode === 'signup'
                ? 'text-white'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <FaUserPlus size={16} />
            <span className="text-sm whitespace-nowrap">{t('signUp')}</span>
          </button>
        </div>
      </div>
      
    </>
  );
}
