import React from 'react';

import { SidebarInset, SidebarProvider } from '@shadcn/components/ui/sidebar';
import data from './data.json';
import { AppSidebar } from '@shadcn/components/app-sidebar';
import { SiteHeader } from '@shadcn/components/site-header';
import { SectionCards } from '@shadcn/components/section-cards';
import { ChartAreaInteractive } from '@shadcn/components/chart-area-interactive';
import { DataTable } from '@shadcn/components/data-table';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { isLoggedIn, role } = useSelector((state) => state.userDetails);

  if (isLoggedIn && role === 'admin') {
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
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div>
                <DataTable data={data} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }
  return <Navigate to="/" />;
};

export default AdminDashboard;
