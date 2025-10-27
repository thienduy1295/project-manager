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
  User,
  Users,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ScrollArea } from '../ui/scroll-area';
import SidebarNav from './sidebar-nav';

const SidebarComponent = ({
  currentWorkspace,
}: {
  currentWorkspace: Workspace | null;
}) => {
  const { logout, user } = useAuth();
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
        'flex flex-col border-r bg-gradient-to-b from-slate-50 to-slate-100/50 dark:from-slate-950 dark:to-slate-900 transition-all duration-300 relative',
        isCollapsed ? 'w-16 md:w-[80px]' : 'w-16 md:w-[240px]'
      )}
    >
      {/* Logo Section */}
      <div className="flex h-14 items-center justify-between border-b border-slate-200 dark:border-slate-800 px-4">
        <Link
          to="/dashboard"
          className="flex items-center transition-opacity hover:opacity-80"
        >
          {!isCollapsed ? (
            <div className="flex items-center gap-2">
              <div className="relative">
                <Zap className="size-7 text-blue-600 dark:text-blue-500" />
                <div className="absolute inset-0 blur-sm bg-blue-600/30 dark:bg-blue-500/30" />
              </div>
              <div className="text-xl font-bold tracking-tight">
                TASK
                <span className="text-red-600 dark:text-red-500 font-semibold">
                  IO
                </span>
              </div>
            </div>
          ) : (
            <div className="relative">
              <Zap className="size-7 text-blue-600 dark:text-blue-500" />
              <div className="absolute inset-0 blur-sm bg-blue-600/30 dark:bg-blue-500/30" />
            </div>
          )}
        </Link>

        <Button
          variant="ghost"
          size="icon"
          className="ml-auto hidden md:flex hover:bg-slate-200 dark:hover:bg-slate-800"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronsRight className="size-4" />
          ) : (
            <ChevronsLeft className="size-4" />
          )}
        </Button>
      </div>

      {/* Navigation Section */}
      <ScrollArea className="flex-1 px-3 py-4">
        <SidebarNav
          items={navItems}
          isCollapsed={isCollapsed}
          className={cn(isCollapsed && 'items-center space-y-2')}
          currentWorkspace={currentWorkspace}
        />
      </ScrollArea>

      {/* User Profile & Logout Section */}
      <div className="border-t border-slate-200 dark:border-slate-800">
        {isCollapsed ? (
          <div className="p-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-full h-12 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center justify-center"
                >
                  <Avatar className="size-8">
                    <AvatarImage src={user?.profilePicture} />
                    <AvatarFallback className="bg-slate-200 dark:bg-slate-800">
                      {user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="right">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <User className="mr-2 size-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-red-600 dark:text-red-400"
                >
                  <LogOut className="mr-2 size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="space-y-2 p-2">
            <Link to="/profile">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <Avatar className="size-9">
                  <AvatarImage src={user?.profilePicture} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>

      {/* Logout Footer */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 transition-all duration-200 cursor-pointer">
        {isCollapsed ? (
          <Button
            variant="ghost"
            size="icon"
            className="w-full rounded-none hover:bg-red-700/20"
            onClick={logout}
          >
            <LogOut className="size-5 text-white" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="w-full rounded-none justify-center py-4 hover:bg-red-700/20 transition-all duration-200"
            onClick={logout}
          >
            <LogOut className="mr-2 size-5 text-white" />
            <span className="text-white font-medium text-sm">Logout</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default SidebarComponent;
