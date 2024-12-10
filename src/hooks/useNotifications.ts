import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '../services/api';

export function useNotifications() {
  const queryClient = useQueryClient();

  const { mutate: markAsRead } = useMutation({
    mutationFn: notifications.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  return { markAsRead };
}