import { Header } from '@/components/layout/header';
import SidebarComponent from '@/components/layout/sidebar-component';
import { Loader } from '@/components/loader';
import { CreateWorkspace } from '@/components/workspace/create-workspace';
import { fetchData } from '@/lib/fetch-util';
import { useAuth } from '@/provider/auth-context';
import type { Workspace } from '@/types';
import { useEffect, useState } from 'react';
import {
  Navigate,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router';

export const clientLoader = async () => {
  try {
    const [workspaces] = await Promise.all([fetchData('/workspaces')]);
    return { workspaces };
  } catch (error) {
    console.log(error);
  }
};

const DashboardLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(
    null
  );
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { workspaces } = useLoaderData() as { workspaces: Workspace[] };

  // Sync currentWorkspace with workspaceId from URL
  useEffect(() => {
    const workspaceId = searchParams.get('workspaceId');
    if (workspaceId && workspaces) {
      const workspace = workspaces.find((ws) => ws._id === workspaceId);
      if (workspace && workspace._id !== currentWorkspace?._id) {
        setCurrentWorkspace(workspace);
      }
    }
  }, [searchParams, workspaces, currentWorkspace]);

  // Auto-select workspace if user has only one workspace and no workspace is selected
  useEffect(() => {
    if (workspaces && workspaces.length === 1 && !currentWorkspace) {
      const singleWorkspace = workspaces[0];
      setCurrentWorkspace(singleWorkspace);

      if (
        location.pathname === '/dashboard' &&
        !location.search.includes('workspaceId')
      ) {
        navigate(`/dashboard?workspaceId=${singleWorkspace._id}`);
      }
    }
  }, [
    workspaces,
    currentWorkspace,
    location.pathname,
    location.search,
    navigate,
  ]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  const handleWorkspaceSelected = (workspace: Workspace) => {
    setCurrentWorkspace(workspace);
  };

  return (
    <div className="flex h-screen w-full">
      <SidebarComponent currentWorkspace={currentWorkspace} />

      <div className="flex flex-1 flex-col h-full">
        <Header
          onWorkspaceSelected={handleWorkspaceSelected}
          selectedWorkspace={currentWorkspace}
          onCreateWorkspace={() => setIsCreatingWorkspace(true)}
        />

        <main className="flex-1 overflow-y-auto h-full w-full">
          <div className="mx-auto container px-2 sm:px-6 lg:px-8 py-0 md:py-8 w-full h-full">
            <Outlet
              context={{ onWorkspaceSelected: handleWorkspaceSelected }}
            />
          </div>
        </main>
      </div>

      <CreateWorkspace
        isCreatingWorkspace={isCreatingWorkspace}
        setIsCreatingWorkspace={setIsCreatingWorkspace}
      />
    </div>
  );
};

export default DashboardLayout;
