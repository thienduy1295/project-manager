import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useGetWorkspacesQuery } from '@/hooks/use-workspace';
import type { Workspace } from '@/types';
import { PlusCircle, Users } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import { Loader } from '../loader';
import WorkspaceAvatar from './workspace-avatar';

interface WorkspaceSelectionProps {
  onWorkspaceSelected: (workspace: Workspace) => void;
  onCreateWorkspace: () => void;
}

const WorkspaceSelection = ({
  onWorkspaceSelected,
  onCreateWorkspace,
}: WorkspaceSelectionProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: workspaces, isLoading } = useGetWorkspacesQuery() as {
    data: Workspace[];
    isLoading: boolean;
  };

  const handleWorkspaceSelect = (workspace: Workspace) => {
    onWorkspaceSelected(workspace);

    const currentPath = location.pathname;
    navigate(`${currentPath}?workspaceId=${workspace._id}`);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome to TASK
          <span className="text-red-500 font-light hover:!text-red-600">
            IO
          </span>
        </h1>
        <p className="text-muted-foreground">
          Please select a workspace to continue or create a new one
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {workspaces?.map((workspace) => (
          <Card
            key={workspace._id}
            className="transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer"
            onClick={() => handleWorkspaceSelect(workspace)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <WorkspaceAvatar
                  name={workspace.name}
                  color={workspace.color}
                />
                <div className="flex-1">
                  <CardTitle className="text-lg">{workspace.name}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Users className="size-4 mr-1" />
                    <span>{workspace.members.length} members</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-2">
                {workspace.description || 'No description available'}
              </CardDescription>
            </CardContent>
          </Card>
        ))}

        {/* Create new workspace card */}
        <Card
          className="transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer border-dashed border-2"
          onClick={onCreateWorkspace}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <PlusCircle className="size-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">Create New Workspace</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Start a new project
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Create a new workspace to organize your projects and collaborate
              with your team.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {workspaces?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Users className="size-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No workspaces found</h3>
          <p className="text-muted-foreground mb-6">
            You don't have access to any workspaces yet. Create your first
            workspace to get started.
          </p>
          <Button onClick={onCreateWorkspace} size="lg">
            <PlusCircle className="size-4 mr-2" />
            Create Your First Workspace
          </Button>
        </div>
      )}
    </div>
  );
};

export default WorkspaceSelection;
