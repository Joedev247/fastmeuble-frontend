'use client';

import { SidebarProvider, SidebarInset, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Toaster } from '@/components/ui/sonner';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

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
  return (
    <SidebarProvider defaultOpen={true}>
      <AdminSidebar />
      <AdminContent>{children}</AdminContent>
      <Toaster />
    </SidebarProvider>
  );
}
