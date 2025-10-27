import { MembersSkeleton } from '@/components/skeletons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreateWorkspace } from '@/components/workspace/create-workspace';
import WorkspaceSelection from '@/components/workspace/workspace-selection';
import {
  useGetWorkspaceDetailsQuery,
  useGetWorkspacesQuery,
} from '@/hooks/use-workspace';
import type { Workspace } from '@/types';
import { Grid, List } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router';

const Members = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { onWorkspaceSelected } = useOutletContext<{
    onWorkspaceSelected: (workspace: Workspace) => void;
  }>();

  const workspaceId = searchParams.get('workspaceId');
  const initialSearch = searchParams.get('search') || '';

  const [search, setSearch] = useState<string>(initialSearch);
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);

  // Get workspaces to check if user has any
  const { data: workspaces, isLoading: workspacesLoading } =
    useGetWorkspacesQuery() as {
      data: Workspace[];
      isLoading: boolean;
    };

  useEffect(() => {
    const params: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    params.search = search;

    setSearchParams(params, { replace: true });
  }, [search]);

  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';

    if (urlSearch !== search) setSearch(urlSearch);
  }, [searchParams]);

  // Only fetch workspace details if workspaceId is provided
  const { data, isLoading } = useGetWorkspaceDetailsQuery(workspaceId!) as {
    data: Workspace;
    isLoading: boolean;
  };

  // Show workspace selection if no workspaceId or if workspaces are loading
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

  if (isLoading) return <MembersSkeleton />;

  if (!data || !workspaceId) return <div>No workspace found</div>;

  const filteredMembers = data?.members?.filter(
    (member) =>
      member.user.name.toLowerCase().includes(search.toLowerCase()) ||
      member.user.email.toLowerCase().includes(search.toLowerCase()) ||
      member.role?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start md:items-center justify-between">
        <h1 className="text-2xl font-bold">Workspace Members</h1>
      </div>

      <Input
        placeholder="Search members ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">
            <List />
            List View
          </TabsTrigger>
          <TabsTrigger value="board">
            <Grid />
            Board View
          </TabsTrigger>
        </TabsList>

        {/* LIST VIEW */}
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Members</CardTitle>
              <CardDescription>
                {filteredMembers.length} members in your workspace
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="divide-y">
                {filteredMembers.map((member) => (
                  <div
                    key={member.user._id}
                    className="flex flex-col md:flex-row items-center justify-between p-4 gap-3"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="bg-gray-500">
                        <AvatarImage src={member.user.profilePicture} />
                        <AvatarFallback>
                          {member.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {member.user.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 ml-11 md:ml-0">
                      <Badge
                        variant={
                          ['admin', 'owner'].includes(member.role)
                            ? 'destructive'
                            : 'secondary'
                        }
                        className="capitalize"
                      >
                        {member.role}
                      </Badge>

                      <Badge variant="outline">{data.name}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* BOARD VIEW */}
        <TabsContent value="board">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredMembers.map((member) => (
              <Card key={member.user._id} className="">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Avatar className="bg-gray-500 size-20 mb-4">
                    <AvatarImage src={member.user.profilePicture} />
                    <AvatarFallback className="uppercase">
                      {member.user.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <h3 className="text-lg font-medium mb-2">
                    {member.user.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {member.user.email}
                  </p>

                  <Badge
                    variant={
                      ['admin', 'owner'].includes(member.role)
                        ? 'destructive'
                        : 'secondary'
                    }
                    className="capitalize"
                  >
                    {member.role}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <CreateWorkspace
        isCreatingWorkspace={isCreatingWorkspace}
        setIsCreatingWorkspace={setIsCreatingWorkspace}
      />
    </div>
  );
};

export default Members;
