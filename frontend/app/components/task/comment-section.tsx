import {
  useAddCommentMutation,
  useGetCommentsByTaskIdQuery,
} from '@/hooks/use-task';
import type { Comment, User } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Loader } from '../loader';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';

export const CommentSection = ({
  taskId,
  members,
}: {
  taskId: string;
  members: User[];
}) => {
  const [newComment, setNewComment] = useState('');

  const { mutate: addComment, isPending } = useAddCommentMutation();
  const { data: comments, isLoading } = useGetCommentsByTaskIdQuery(taskId) as {
    data: Comment[];
    isLoading: boolean;
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    addComment(
      { taskId, text: newComment },
      {
        onSuccess: () => {
          setNewComment('');
          toast.success('Comment added successfully');
        },
        onError: (error: any) => {
          const errorMessage = error.response.data.message;
          toast.error(errorMessage);
          console.log(error);
        },
      }
    );
  };

  if (isLoading) return <Loader />;

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium mb-4">Comments</h3>

      <ScrollArea className="mb-4 max-h-[300px]">
        {comments?.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="flex gap-4 py-2">
              <Avatar className="size-8">
                <AvatarImage src={comment.author.profilePicture} />
                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm">
                    {comment.author.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">{comment.text}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center py-8">
            <p className="text-sm text-muted-foreground">No comments yet</p>
          </div>
        )}
      </ScrollArea>

      <Separator className="my-4" />

      <div className="mt-4">
        <Textarea
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="flex justify-end mt-4">
          <Button
            disabled={!newComment.trim() || isPending}
            onClick={handleAddComment}
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Posting comment...
              </>
            ) : (
              'Post Comment'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
