import * as React from 'react';
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react';

import { NavDocuments } from '@shadcn/components/nav-documents';
import { NavMain } from '@shadcn/components/nav-main';
import { NavSecondary } from '@shadcn/components/nav-secondary';
import { NavUser } from '@shadcn/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@shadcn/components/ui/sidebar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export function AppSidebar({ ...props }) {
  const { name, email } = useSelector((state) => state.userDetails);
  const data = {
    user: {
      name: name,
      email: email,
      avatar: 'https://avatars.githubusercontent.com/u/24502716?v=4',
    },
    navMain: [
      { title: 'Dashboard', url: '/admin/dashboard', icon: IconDashboard },
      { title: 'Products', url: '/admin/products', icon: IconListDetails },
      { title: 'Orders', url: '/admin/orders', icon: IconListDetails },

      { title: 'Analytics', url: '#', icon: IconChartBar },
      { title: 'Projects', url: '#', icon: IconFolder },
      { title: 'Team', url: '#', icon: IconUsers },
    ],
    /* navClouds: [
      {
        title: 'Capture',
        icon: IconCamera,
        isActive: true,
        url: '#',
        items: [
          {
            title: 'Active Proposals',
            url: '#',
          },
          {
            title: 'Archived',
            url: '#',
          },
        ],
      },
      {
        title: 'Proposal',
        icon: IconFileDescription,
        url: '#',
        items: [
          {
            title: 'Active Proposals',
            url: '#',
          },
          {
            title: 'Archived',
            url: '#',
          },
        ],
      },
      {
        title: 'Prompts',
        icon: IconFileAi,
        url: '#',
        items: [
          {
            title: 'Active Proposals',
            url: '#',
          },
          {
            title: 'Archived',
            url: '#',
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: 'Settings',
        url: '#',
        icon: IconSettings,
      },
      {
        title: 'Get Help',
        url: '#',
        icon: IconHelp,
      },
      {
        title: 'Search',
        url: '#',
        icon: IconSearch,
      },
    ],
    documents: [
      {
        name: 'Data Library',
        url: '#',
        icon: IconDatabase,
      },
      {
        name: 'Reports',
        url: '#',
        icon: IconReport,
      },
      {
        name: 'Word Assistant',
        url: '#',
        icon: IconFileWord,
      },
    ], */
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">E Commerce</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
