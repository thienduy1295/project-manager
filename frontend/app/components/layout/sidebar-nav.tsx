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
    <nav className={cn('flex flex-col gap-y-2', className)} {...props}>
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
            variant={isActive ? 'outline' : 'ghost'}
            className={cn(
              'justify-start transition-all duration-150',
              isActive && 'bg-blue-800/20 text-blue-600 font-medium',
              isCurrentlyNavigating && 'opacity-70 bg-muted'
            )}
            asChild
            onMouseEnter={handleMouseEnter}
          >
            <Link to={targetUrl}>
              <Icon
                className={cn(
                  'mr-2 size-4',
                  isCurrentlyNavigating && 'animate-pulse'
                )}
              />
              {isCollapsed ? (
                <span className="sr-only">{el.title}</span>
              ) : (
                <span className={cn(isCurrentlyNavigating && 'opacity-70')}>
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
