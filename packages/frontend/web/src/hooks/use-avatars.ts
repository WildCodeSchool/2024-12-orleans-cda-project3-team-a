import { useCallback, useEffect, useState } from 'react';

import type { Avatar } from '@app/api';

export default function useAvatars() {
  const [isLoadingAvatars, setIsLoadingAvatars] = useState(true);
  const [avatars, setAvatars] = useState<Avatar[]>([]);

  const fetchAvatars = useCallback(async () => {
    try {
      const response = await fetch(`/api/game/avatars`, {
        credentials: 'include',
      });

      const data = await response.json();

      if (data.ok === false) {
        throw new Error('No avatars');
      }

      setAvatars(data.avatars);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('fetch avatars failed');
    } finally {
      setIsLoadingAvatars(false);
    }
  }, []);

  useEffect(() => {
    void fetchAvatars();
  }, [fetchAvatars]);

  return {
    avatars,
    isLoadingAvatars,
    refetchAvatars: fetchAvatars,
  };
}
