import { RecentProjects } from '@/components/dashboard/recent-projects';
import { StatisticsCharts } from '@/components/dashboard/statistics-charts';
import { StatsCard } from '@/components/dashboard/stats-card';
import { DashboardSkeleton } from '@/components/skeletons';
import { UpcomingTasks } from '@/components/upcoming-tasks';
import { CreateWorkspace } from '@/components/workspace/create-workspace';
import WorkspaceSelection from '@/components/workspace/workspace-selection';
import {
  useGetWorkspacesQuery,
  useWorkspaceStatsQuery,
} from '@/hooks/use-workspace';
import type {
  Project,
  ProjectStatusData,
  StatsCardProps,
  Task,
  TaskPriorityData,
  TaskTrendsData,
  Workspace,
  WorkspaceProductivityData,
} from '@/types';
import { useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router';

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspaceId');
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const { onWorkspaceSelected } = useOutletContext<{
    onWorkspaceSelected: (workspace: Workspace) => void;
  }>();

  const { data: workspaces, isLoading: workspacesLoading } =
    useGetWorkspacesQuery() as {
      data: Workspace[];
      isLoading: boolean;
    };

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

  if (!workspaceId || workspacesLoading) {
    return (
      <>
        <WorkspaceSelection
          onWorkspaceSelected={onWorkspaceSelected}
          onCreateWorkspace={() => setIsCreatingWorkspace(true)}
        />
        <CreateWorkspace
          isCreatingWorkspace={isCreatingWorkspace}
          setIsCreatingWorkspace={setIsCreatingWorkspace}
        />
      </>
    );
  }

  if (isPending) return <DashboardSkeleton />;

  return (
    <>
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

      <CreateWorkspace
        isCreatingWorkspace={isCreatingWorkspace}
        setIsCreatingWorkspace={setIsCreatingWorkspace}
      />
    </>
  );
};

export default Dashboard;
