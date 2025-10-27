import { cn } from '@/lib/utils';
import type { Workspace } from '@/types';
import type { LucideIcon } from 'lucide-react';
import { Link, useFetcher, useLocation } from 'react-router';
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

        const handleMouseEnter = () => {
          // Prefetch on hover for instant navigation
          fetcher.load(targetUrl);
        };

        return (
          <Button
            key={el.href}
            variant={isActive ? 'outline' : 'ghost'}
            className={cn(
              'justify-start',
              isActive && 'bg-blue-800/20 text-blue-600 font-medium'
            )}
            asChild
            onMouseEnter={handleMouseEnter}
          >
            <Link to={targetUrl}>
              <Icon className="mr-2 size-4" />
              {isCollapsed ? (
                <span className="sr-only">{el.title}</span>
              ) : (
                el.title
              )}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
};

export default SidebarNav;
