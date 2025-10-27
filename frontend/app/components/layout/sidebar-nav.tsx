import { cn } from '@/lib/utils';
import type { Workspace } from '@/types';
import type { LucideIcon } from 'lucide-react';
import { Link, useFetcher, useLocation, useNavigation } from 'react-router';
import { Button } from '../ui/button';

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    title: string;
    href: string;
    icon: LucideIcon;
  }[];
  isCollapsed: boolean;
  className?: string;
  currentWorkspace: Workspace | null;
}

const SidebarNav = ({
  items,
  isCollapsed,
  className,
  currentWorkspace,
  ...props
}: SidebarNavProps) => {
  const location = useLocation();
  const fetcher = useFetcher();
  const navigation = useNavigation();

  // Check if any link is being navigated to
  const isNavigating = navigation.state === 'loading';

  return (
    <nav className={cn('flex flex-col gap-1', className)} {...props}>
      {items.map((el) => {
        const Icon = el.icon;
        const isActive = location.pathname === el.href;

        const targetUrl =
          el.href === '/workspaces'
            ? el.href
            : currentWorkspace && currentWorkspace._id
              ? `${el.href}?workspaceId=${currentWorkspace._id}`
              : el.href;

        // Check if this specific link is being navigated to
        const isCurrentlyNavigating =
          isNavigating &&
          (targetUrl === navigation.location?.pathname ||
            navigation.location?.pathname?.includes(el.href));

        const handleMouseEnter = () => {
          // Prefetch on hover for instant navigation
          if (targetUrl && !isActive) {
            fetcher.load(targetUrl);
          }
        };

        return (
          <Button
            key={el.href}
            variant={isActive ? 'default' : 'ghost'}
            className={cn(
              'justify-start relative group transition-all duration-200',
              isActive
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/30 dark:from-blue-600 dark:to-blue-700'
                : 'hover:bg-slate-200 dark:hover:bg-slate-800',
              isCurrentlyNavigating && 'opacity-60'
            )}
            asChild
            onMouseEnter={handleMouseEnter}
          >
            <Link to={targetUrl}>
              <Icon
                className={cn(
                  'mr-2 size-5 transition-transform duration-200',
                  isCurrentlyNavigating && 'animate-pulse',
                  isActive && 'text-white',
                  !isActive &&
                    'text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-500'
                )}
              />
              {isCollapsed ? (
                <span className="sr-only">{el.title}</span>
              ) : (
                <span
                  className={cn(
                    'font-medium transition-colors',
                    isCurrentlyNavigating && 'opacity-70'
                  )}
                >
                  {el.title}
                </span>
              )}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
};

export default SidebarNav;
