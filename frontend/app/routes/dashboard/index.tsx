import { RecentProjects } from '@/components/dashboard/recent-projects';
import { StatisticsCharts } from '@/components/dashboard/statistics-charts';
import { StatsCard } from '@/components/dashboard/stats-card';
import { Loader } from '@/components/loader';
import { UpcomingTasks } from '@/components/upcoming-tasks';
import { useWorkspaceStatsQuery } from '@/hooks/use-workspace';
import type {
  Project,
  ProjectStatusData,
  StatsCardProps,
  Task,
  TaskPriorityData,
  TaskTrendsData,
  WorkspaceProductivityData,
} from '@/types';
import { useSearchParams } from 'react-router';

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspaceId');

  const { data, isPending } = useWorkspaceStatsQuery(workspaceId!) as {
    data: {
      stats: StatsCardProps;
      taskTrendsData: TaskTrendsData[];
      projectStatusData: ProjectStatusData[];
      taskPriorityData: TaskPriorityData[];
      workspaceProductivityData: WorkspaceProductivityData[];
      upcomingTasks: Task[];
      recentProjects: Project[];
    };
    isPending: boolean;
  };

  if (isPending) return <Loader />;

  return (
    <div className="space-y-8 2xl:space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <StatsCard data={data.stats} />

      <StatisticsCharts
        stats={data.stats}
        taskTrendsData={data.taskTrendsData}
        projectStatusData={data.projectStatusData}
        taskPriorityData={data.taskPriorityData}
        workspaceProductivityData={data.workspaceProductivityData}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentProjects data={data.recentProjects} />
        <UpcomingTasks data={data.upcomingTasks} />
      </div>
    </div>
  );
};

export default Dashboard;
