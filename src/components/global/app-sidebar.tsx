import { Calendar, Home, Inbox, List, User } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { LogoIcon } from './logo';

const items = [
  {
    title: 'Home',
    url: '/home',
    icon: Home,
  },
  {
    title: 'Projects',
    url: '/projects',
    icon: Inbox,
  },
  {
    title: 'Sprints',
    url: '/sprints',
    icon: Calendar,
  },
  {
    title: 'Tasks',
    url: '/tasks',
    icon: List,
  },
  {
    title: 'Users',
    url: '/users',
    icon: User,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="flex flex-col gap-2">
          <SidebarGroupLabel>
            <LogoIcon /> <span className="ml-2 text-lg font-bold">MPMS</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span className="ml-2">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
