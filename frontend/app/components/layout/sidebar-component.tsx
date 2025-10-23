import { cn } from '@/lib/utils';
import { useAuth } from '@/provider/auth-context';
import type { Workspace } from '@/types';
import {
  ChevronsLeft,
  ChevronsRight,
  LayoutDashboard,
  ListCheck,
  LogOut,
  Settings,
  Users,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import SidebarNav from './sidebar-nav';

const SidebarComponent = ({
  currentWorkspace,
}: {
  currentWorkspace: Workspace | null;
}) => {
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Workspaces',
      href: '/workspaces',
      icon: Users,
    },
    {
      title: 'My Tasks',
      href: '/my-tasks',
      icon: ListCheck,
    },
    {
      title: 'Members',
      href: `/members`,
      icon: Users,
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: Settings,
    },
  ];

  return (
    <div
      className={cn(
        'flex flex-col border-r bg-sidebar transition-all duration-300',
        isCollapsed ? 'w-16 md:w-[80px]' : 'w-16 md:w-[240px]'
      )}
    >
      <div className="flex h-14 items-center border-b px-4 mb-4">
        <Link to="/dashboard" className="flex items-center">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Zap className="size-6 text-blue-600" />
              <div className="text-lg font-bold ">
                TASK
                <span className="text-red-500 font-light hover:!text-red-600">
                  IO
                </span>
              </div>
            </div>
          )}

          {isCollapsed && <Zap className="size-6 text-blue-600" />}
        </Link>

        <Button
          variant="ghost"
          size="icon"
          className="ml-auto hidden md:block"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronsRight className="size-4" />
          ) : (
            <ChevronsLeft className="size-4" />
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-2">
        <SidebarNav
          items={navItems}
          isCollapsed={isCollapsed}
          className={cn(isCollapsed && 'items-center space-y-2')}
          currentWorkspace={currentWorkspace}
        />
      </ScrollArea>

      <div>
        <Button
          variant="ghost"
          size={isCollapsed ? 'icon' : 'default'}
          onClick={logout}
        >
          <LogOut className={cn('size-4', isCollapsed && 'mr-2')} />
          <span className="hidden md:block">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default SidebarComponent;
