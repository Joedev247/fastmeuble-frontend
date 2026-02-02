'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SidebarProvider, SidebarInset, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Toaster } from '@/components/ui/sonner';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { authAPI } from '@/lib/api/auth';

function AdminContent({ children }: { children: React.ReactNode }) {
  const { state, isMobile } = useSidebar();
  
  // Calculate margin based on sidebar state
  // When collapsed (icon mode): 3rem (icon width), When expanded: reduce spacing for tighter layout
  const marginLeft = isMobile ? '0' : (state === 'collapsed' ? '1rem' : '1rem');

  return (
    <SidebarInset 
      className={cn("min-w-0 transition-[margin-left] duration-200 ease-linear")}
      style={{ marginLeft }}
    >
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background">
        <SidebarTrigger className="text-gray-700 hover:text-amber-500" />
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Fast Meuble Admin</h1>
        </div>
      </header>
      <div className="flex flex-1 flex-col overflow-auto">
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>
    </SidebarInset>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Don't check auth on login page
      if (pathname === '/admin/login') {
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      // Check if token exists
      if (!authAPI.isAuthenticated()) {
        router.push('/admin/login');
        setIsLoading(false);
        return;
      }

      // Verify token is valid by checking user
      try {
        const user = await authAPI.getMe();
        if (user.role !== 'admin') {
          authAPI.logout();
          router.push('/admin/login');
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        // Token is invalid, redirect to login
        authAPI.logout();
        router.push('/admin/login');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, pathname]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Only render admin layout if authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AdminSidebar />
      <AdminContent>{children}</AdminContent>
      <Toaster />
    </SidebarProvider>
  );
}
