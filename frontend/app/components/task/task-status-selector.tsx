import { useUpdateTaskStatusMutation } from '@/hooks/use-task';
import type { TaskStatus } from '@/types';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export const TaskStatusSelector = ({
  status,
  taskId,
}: {
  status: string;
  taskId: string;
}) => {
  const { mutate, isPending } = useUpdateTaskStatusMutation();
  const [localStatus, setLocalStatus] = useState(status);

  // Sync local status with prop when it changes from server
  useEffect(() => {
    setLocalStatus(status);
  }, [status]);

  const handleStatusChange = (value: string) => {
    // Optimistically update the UI immediately
    setLocalStatus(value);

    mutate(
      { taskId, status: value as TaskStatus },
      {
        onSuccess: () => {
          toast.success('Status updated successfully');
        },
        onError: (error: any) => {
          // Revert to original status on error
          setLocalStatus(status);
          const errorMessage = error.response.data.message;
          toast.error(errorMessage);
          console.log(error);
        },
      }
    );
  };

  return (
    <Select
      value={localStatus || ''}
      onValueChange={handleStatusChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-[180px]">
        <div className="flex items-center gap-2">
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          <SelectValue placeholder="Status" />
        </div>
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="To Do">To Do</SelectItem>
        <SelectItem value="In Progress">In Progress</SelectItem>
        <SelectItem value="Done">Done</SelectItem>
      </SelectContent>
    </Select>
  );
};
