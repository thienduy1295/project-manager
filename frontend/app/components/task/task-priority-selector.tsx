import { useUpdateTaskPriorityMutation } from '@/hooks/use-task';
import type { TaskPriority } from '@/types';
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

export const TaskPrioritySelector = ({
  priority,
  taskId,
}: {
  priority: TaskPriority;
  taskId: string;
}) => {
  const { mutate, isPending } = useUpdateTaskPriorityMutation();
  const [localPriority, setLocalPriority] = useState(priority);

  // Sync local status with prop when it changes from server
  useEffect(() => {
    setLocalPriority(priority);
  }, [priority]);

  const handlePriorityChange = (value: string) => {
    // Optimistically update the UI immediately
    setLocalPriority(value as TaskPriority);

    mutate(
      { taskId, priority: value as TaskPriority },
      {
        onSuccess: () => {
          toast.success('Status updated successfully');
        },
        onError: (error: any) => {
          // Revert to original status on error
          const errorMessage = error.response.data.message;
          setLocalPriority(priority);
          toast.error(errorMessage);
          console.log(error);
        },
      }
    );
  };

  return (
    <Select
      value={localPriority || ''}
      onValueChange={handlePriorityChange}
      disabled={isPending}
    >
      <SelectTrigger className="w-[180px]">
        <div className="flex items-center gap-2">
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          <SelectValue placeholder="Status" />
        </div>
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="Low">Low</SelectItem>
        <SelectItem value="Medium">Medium</SelectItem>
        <SelectItem value="High">High</SelectItem>
      </SelectContent>
    </Select>
  );
};
