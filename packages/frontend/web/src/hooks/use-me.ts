import { useCallback, useEffect, useState } from 'react';

import type { User } from '@app/api';

export default function useEnclosures() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch(`/api/auth/me`, {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.ok === false) {
        throw new Error('No user found');
      }
      setUser(data.user);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('fetch failed', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchUser();
  }, [fetchUser]);

  return { user, isLoading, refetchUser: fetchUser };
}
