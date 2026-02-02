'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/lib/navigation';
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'sonner';

interface ResetPasswordPageProps {
  params: Promise<{ token: string; locale: string }>;
}

export default function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  const t = useTranslations('components.auth.ResetPasswordPage');
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validation
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

      // Get token from params
      const resolvedParams = await params;
      const token = resolvedParams.token;

      // Call reset password API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://fastmeuble-backend.onrender.com/api'}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reset password');
      }

      toast.success('Password reset successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error: any) {
      console.error('Reset password error:', error);
      toast.error(error.message || 'Failed to reset password');
    } finally {
      setIsSubmitting(false);
    }
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
            alt="Fast Meuble"
            fill
            className="object-cover opacity-90"
            priority
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-transparent"></div>
        </div>

        {/* Logo and Text */}
        <div className="absolute inset-0 flex flex-col justify-center px-12 text-white z-10">
          <h1 className="text-5xl font-bold mb-6">Fast Meuble</h1>
          <p className="text-xl text-gray-300 max-w-md">
            Reset your password and secure your account
          </p>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/3 flex flex-col justify-center px-8 sm:px-12 bg-white">
        <div className="max-w-md mx-auto w-full">
          {/* Logo for mobile */}
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Fast Meuble</h1>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Reset Password
          </h2>
          <p className="text-gray-600 mb-8">
            Enter your new password below
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your new password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              {isSubmitting ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Remember your password?{' '}
              <Link href="/login" className="text-orange-500 hover:text-orange-600 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
