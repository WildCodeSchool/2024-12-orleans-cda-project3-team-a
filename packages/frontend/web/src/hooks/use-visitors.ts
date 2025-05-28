import { useCallback, useEffect, useState } from 'react';

import type {
  Visitors,
  VisitorsPark,
} from '@app/api/src/game/visitor/get.visitors';

export default function useVisitors() {
  const [visitors, setVisitors] = useState<Visitors>([]);
  const [visitorsPark, setVisitorsPark] = useState<VisitorsPark>([]);

  const fetchVisitors = useCallback(async () => {
    try {
      const resp = await fetch(`/api/game/visitors`, {
        credentials: 'include',
      });
      const data = (await resp.json()) as {
        ok: boolean;
        visitorsCountById: Visitors;
        visitorsPark: VisitorsPark;
      };

      if (!data.ok) {
        throw new Error('No visitors');
      }

      setVisitors(data.visitorsCountById);
      setVisitorsPark(data.visitorsPark);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('fetch visitors failed');
    }
  }, []);

  useEffect(() => {
    void fetchVisitors();
  }, [fetchVisitors]);

  return { visitors, visitorsPark, refetchVisitors: fetchVisitors };
}
