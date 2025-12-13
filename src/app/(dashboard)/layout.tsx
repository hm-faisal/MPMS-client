import { AppSidebar } from '@/components/global/app-sidebar';
import LogoutButton from '@/components/global/logout';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="flex h-dvh w-full">
      <AppSidebar />
      <main className="flex flex-1 flex-col overflow-hidden">
        <header className="flex items-center gap-2 border-b p-3 justify-between">
          <div className="">
            <SidebarTrigger className="md:hidden" />
            <span className="text-sm font-medium md:hidden">Menu</span>
          </div>
          <div className="">
            <LogoutButton />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
