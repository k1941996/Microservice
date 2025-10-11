import ThemeToggler from '@components/ThemeToggler';
import { Separator } from '@shadcn/components/ui/separator';
import { SidebarTrigger } from '@shadcn/components/ui/sidebar';
import { useLocation } from 'react-router-dom';

export function SiteHeader() {
  const location = useLocation();

  // Map routes to titles
  const titles = {
    '/admin/dashboard': 'Dashboard',
    '/admin/products': 'Products',
  };

  const currentTitle = titles[location.pathname] || 'Admin';
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">{currentTitle}</h1>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggler />
        </div>
      </div>
    </header>
  );
}
