import React from 'react';
import { SidebarInset, SidebarProvider } from '@shadcn/components/ui/sidebar';
import { AppSidebar } from '@shadcn/components/app-sidebar';
import { SiteHeader } from '@shadcn/components/site-header';

import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const { isLoggedIn, role } = useSelector((state) => state.userDetails);
  if (!isLoggedIn || role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <SidebarProvider
      style={{
        '--sidebar-width': 'calc(var(--spacing) * 72)',
        '--header-height': 'calc(var(--spacing) * 12)',
      }}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminDashboard;
