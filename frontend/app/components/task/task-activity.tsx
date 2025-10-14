import { fetchData } from '@/lib/fetch-util';
import type { ActivityLog } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '../loader';
import { ScrollArea } from '../ui/scroll-area';
import { getActivityIcon } from './task-icon';

export const TaskActivity = ({ resourceId }: { resourceId: string }) => {
  const { data, isPending } = useQuery({
    queryKey: ['task-activity', resourceId],
    queryFn: () => fetchData(`/tasks/${resourceId}/activity`),
  }) as {
    data: ActivityLog[];
    isPending: boolean;
  };

  if (isPending) return <Loader />;

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <h3 className="text-lg text-muted-foreground mb-4">Activity</h3>

      <ScrollArea className="h-[500px]">
        <div className="space-y-4 pr-4">
          {data?.map((activity) => (
            <div key={activity._id} className="flex gap-2">
              <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                {getActivityIcon(activity.action)}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user.name}</span>{' '}
                  {activity.details?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
