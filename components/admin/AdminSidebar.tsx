'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Settings, 
  FileText,
  ShoppingCart,
  LogOut,
  User,
  Star
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { authAPI } from '@/lib/api/auth';
import { toast } from 'sonner';

const menuItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin',
  },
  {
    id: 'products',
    title: 'Products',
    icon: FolderOpen,
    href: '/admin/works',
  },
  {
    id: 'orders',
    title: 'Orders',
    icon: ShoppingCart,
    href: '/admin/orders',
  },
  {
    id: 'categories',
    title: 'Categories',
    icon: FileText,
    href: '/admin/categories',
  },
  {
    id: 'featured-sections',
    title: 'Featured Sections',
    icon: Star,
    href: '/admin/featured-sections',
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: Settings,
    href: '/admin/settings',
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useSidebar();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await authAPI.getMe();
        setUser({
          name: userData.name,
          email: userData.email,
        });
      } catch (error) {
        console.error('Error loading user:', error);
      }
    };
    loadUser();
  }, []);

  const handleLogout = () => {
    authAPI.logout();
    toast.success('Logged out successfully');
    router.push('/admin/login');
  };

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-4">
          <Link href="/admin" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="relative h-8 w-8 shrink-0">
              <Image
                src="/images/fast-meuble-logo-removebg-preview.png"
                alt="Fast Meuble"
                fill
                className="object-contain"
                sizes="32px"
              />
            </div>
            {state !== 'collapsed' && (
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold truncate">Fast Meuble</span>
                <span className="text-xs text-muted-foreground truncate">Admin</span>
              </div>
            )}
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || 
                  (item.href !== '/admin' && pathname?.startsWith(item.href));
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.href}>
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className=" border border-gray-200 bg-gray-50 p-3 space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-white font-semibold shrink-0">
              <User className="h-5 w-5" />
            </div>
            {state !== 'collapsed' && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || 'Admin User'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || 'admin@fastmeuble.com'}
                </p>
              </div>
            )}
          </div>
          {state !== 'collapsed' && (
            <div className="space-y-2">
              <Button
                asChild
                variant="outline"
                className="w-full justify-start border-gray-300 hover:bg-gray-100"
              >
                <Link href="/">
                  <span>Back to Site</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-red-300 hover:bg-red-50 hover:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
