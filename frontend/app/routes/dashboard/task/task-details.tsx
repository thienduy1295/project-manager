import { BackButton } from '@/components/back-button';
import { Loader } from '@/components/loader';
import { CommentSection } from '@/components/task/comment-section';
import { SubTasksDetails } from '@/components/task/sub-tasks';
import { TaskActivity } from '@/components/task/task-activity';
import { TaskAssigneesSelector } from '@/components/task/task-assignees-selector';
import { TaskDescription } from '@/components/task/task-description';
import { TaskPrioritySelector } from '@/components/task/task-priority-selector';
import { TaskStatusSelector } from '@/components/task/task-status-selector';
import { TaskTitle } from '@/components/task/task-title';
import { Watchers } from '@/components/task/watchers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  useAchievedTaskMutation,
  useTaskByIdQuery,
  useWatchTaskMutation,
} from '@/hooks/use-task';
import { useAuth } from '@/provider/auth-context';
import type { Project, Task } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';

const TaskDetails = () => {
  const { user } = useAuth();
  const { taskId, projectId, workspaceId } = useParams<{
    taskId: string;
    projectId: string;
    workspaceId: string;
  }>();
  const navigate = useNavigate();

  const { data, isLoading } = useTaskByIdQuery(taskId!) as {
    data: {
      task: Task;
      project: Project;
    };
    isLoading: boolean;
  };
  const { mutate: watchTask, isPending: isWatchingTask } =
    useWatchTaskMutation();
  const { mutate: archivedTask, isPending: isArchivedTask } =
    useAchievedTaskMutation();

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!data) {
    return <div>Task not found</div>;
  }

  const { task, project } = data;
  const isUserWatching = task?.watchers?.some(
    (watcher) => watcher._id.toString() === user?._id.toString()
  );

  const goBack = () => navigate(-1);

  const members = task?.assignees || [];

  const handleWatchTask = () => {
    watchTask(
      { taskId: task._id },
      {
        onSuccess: () => {
          toast.success('Task watched successfully');
        },
        onError: (error: any) => {
          const errorMessage = error.response.data.message;
          toast.error(errorMessage);
          console.log(error);
        },
      }
    );
  };

  const handleArchivedTask = () => {
    archivedTask(
      { taskId: task._id },
      {
        onSuccess: () => {
          toast.success('Task archived successfully');
        },
        onError: (error: any) => {
          const errorMessage = error.response.data.message;
          toast.error(errorMessage);
          console.log(error);
        },
      }
    );
  };

  return (
    <div className="container mx-auto p-0 py-4 md:px-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex flex-col md:flex-row md:items-center">
          <BackButton />

          <h1 className="text-xl md:text-2xl font-bold">{task.title}</h1>

          {task.isArchived && (
            <Badge className="ml-2" variant="outline">
              Archived
            </Badge>
          )}
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleWatchTask}
            className="w-fit"
            disabled={isWatchingTask}
          >
            {isUserWatching ? (
              <>
                <EyeOff className="mr-2 size-4" />
                Unwatch
              </>
            ) : (
              <>
                <Eye className="mr-2 size-4" />
                Watch
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleArchivedTask}
            className="w-fit"
            disabled={isArchivedTask}
          >
            {task.isArchived ? 'Unarchive' : 'Archive'}
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:flex-1 lg:col-span-2">
          <div className="bg-card rounded-lg p-6 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start mb-4">
              <div>
                <Badge
                  variant={
                    task.priority === 'High'
                      ? 'destructive'
                      : task.priority === 'Medium'
                        ? 'default'
                        : 'outline'
                  }
                  className="mb-2 capitalize"
                >
                  {task.priority} Priority
                </Badge>

                <TaskTitle title={task.title} taskId={task._id} />

                <div className="text-sm text-muted-foreground md:text-base">
                  Created at:{' '}
                  {formatDistanceToNow(new Date(task.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <TaskStatusSelector status={task.status} taskId={task._id} />

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {}}
                  className="hidden md:block"
                >
                  Delete Task
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Description
              </h3>

              <TaskDescription
                description={task.description || ''}
                taskId={task._id}
              />
            </div>

            <TaskAssigneesSelector
              task={task}
              assignees={task.assignees}
              projectMembers={project.members as any}
            />

            <TaskPrioritySelector priority={task.priority} taskId={task._id} />

            <SubTasksDetails subTasks={task.subtasks || []} taskId={task._id} />
          </div>

          <CommentSection taskId={task._id} members={project.members as any} />
        </div>

        <div className="lg:w-80 lg:flex-shrink-0">
          <Watchers watchers={task.watchers || []} />

          <TaskActivity resourceId={task._id} />
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
