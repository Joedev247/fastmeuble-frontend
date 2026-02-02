'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FaSignInAlt, FaUserPlus, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useRouter } from '@/lib/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Login() {
  const t = useTranslations('components.navbar.Login');
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [activeMode, setActiveMode] = useState<'login' | 'signup'>('login');

  const handleToggle = (mode: 'login' | 'signup') => {
    setActiveMode(mode);
    // Redirect to login page
    router.push('/login');
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };


  // If user is authenticated, show user menu
  if (isAuthenticated && user) {
    return (
      <div className="account">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded border border-gray-200 transition-colors">
              <FaUser size={16} className="text-gray-700" />
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                {user.name.split(' ')[0]}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <FaSignOutAlt className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  // If not authenticated, show login/signup buttons
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
