'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/lib/navigation';
import Image from 'next/image';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const t = useTranslations('components.auth.LoginPage');
  const router = useRouter();
  const { login, register, isAuthenticated } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });
  const [rememberMe, setRememberMe] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isSignUp) {
        // Validation
        if (!formData.name.trim()) {
          toast.error('Please enter your name');
          setIsSubmitting(false);
          return;
        }
        if (formData.password.length < 6) {
          toast.error('Password must be at least 6 characters');
          setIsSubmitting(false);
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match');
          setIsSubmitting(false);
          return;
        }
        
        await register(formData.name, formData.email, formData.password);
        toast.success('Account created successfully!');
      } else {
        await login(formData.email, formData.password);
        toast.success('Logged in successfully!');
      }
      
      // Redirect to home page
      router.push('/');
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error(error.message || (isSignUp ? 'Failed to create account' : 'Failed to login'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    toast.info('Google sign-in coming soon!');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image Section */}
      <div className="hidden lg:flex lg:w-2/3 relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(245, 158, 11, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Sofa Image */}
        <div className="relative w-full h-full">
          <Image
            src="/images/discount-2.jpg"
            alt="Fast Meuble Sofa"
            fill
            className="object-cover opacity-90"
            priority
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-8 md:p-12">
          {/* Top Section */}
          <div className="flex items-start justify-between">
            <Link href="/" className="flex items-center group hover:opacity-80 transition-opacity">
              <Image
                src="/images/fast-meuble-logo-removebg-preview.png"
                alt="Fast Meuble"
                width={150}
                height={50}
                className="h-auto w-auto max-h-12"
                priority
              />
            </Link>
            <Link 
              href="/" 
              className="text-white/80 hover:text-white transition-colors text-sm font-medium"
            >
              {t('backToWebsite')}
            </Link>
          </div>

          {/* Bottom Section - Headline */}
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-6 leading-tight">
              {t('headline')}
            </h1>
            <p className="text-white/90 text-lg md:text-xl leading-relaxed">
              {t('subheadline')}
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/3 bg-white flex items-center justify-center p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* Logo - Mobile/Tablet */}
          <div className="mb-6 lg:hidden flex justify-center">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image
                src="/images/fast-meuble-logo-removebg-preview.png"
                alt="Fast Meuble"
                width={150}
                height={50}
                className="h-auto w-auto max-h-12"
                priority
              />
            </Link>
          </div>
          
          {/* Welcome Header */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-2">
              {isSignUp ? t('welcomeSignUp') : t('welcomeBack')}
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              {isSignUp ? t('signUpSubtitle') : t('loginSubtitle')}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('name')}
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t('namePlaceholder')}
                  className="w-full px-4 py-3 border border-gray-300 shop focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  required={isSignUp}
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('email')}
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={t('emailPlaceholder')}
                className="w-full px-4 py-3 border border-gray-300 shop focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {t('password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder={t('passwordPlaceholder')}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 shop focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('confirmPassword')}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder={t('confirmPasswordPlaceholder')}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 shop focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    required={isSignUp}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>
            )}

            {/* Remember Me & Forgot Password */}
            {!isSignUp && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500"
                  />
                  <span className="text-sm text-gray-700">{t('rememberMe')}</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-gray-600 hover:text-amber-500 transition-colors">
                  {t('forgotPassword')}?
                </Link>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 shop transition-colors duration-200"
            >
              {isSubmitting ? (isSignUp ? 'Creating Account...' : 'Logging in...') : (isSignUp ? t('signUp') : t('login'))}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">{t('orContinueWith')}</span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 shop transition-all duration-200 flex items-center justify-center gap-3"
            >
              <FaGoogle className="text-red-500" size={20} />
              <span>{t('continueWithGoogle')}</span>
            </button>

            {/* Sign Up / Sign In Toggle */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                {isSignUp ? t('alreadyHaveAccount') : t('dontHaveAccount')}{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setFormData({ email: '', password: '', name: '', confirmPassword: '' });
                  }}
                  className="text-amber-500 hover:text-amber-600 font-semibold transition-colors"
                >
                  {isSignUp ? t('signIn') : t('signUp')}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
