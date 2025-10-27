import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useRevalidator } from 'react-router';
import { Button } from './ui/button';

export const BackButton = () => {
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const queryClient = useQueryClient();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={async () => {
        try {
          // Invalidate all queries to ensure fresh data after navigation
          await queryClient.invalidateQueries();
          // Revalidate route loaders (React Router v6.4+)
          revalidator.revalidate();
        } finally {
          navigate(-1);
        }
      }}
      className="p-4 mr-4"
    >
      ← Back
    </Button>
  );
};
