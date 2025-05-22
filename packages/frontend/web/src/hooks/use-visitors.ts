import { useEffect, useState } from 'react';

import type { Visitors } from '@app/api/src/game/visitor/get.visitors';

export default function useVisitors() {
  const [visitors, setVisitors] = useState<Visitors>([]);

  useEffect(() => {
    async function fetchVisitors() {
      try {
        const resp = await fetch(`/api/game/visitors`, {
          credentials: 'include',
        });
        const data = (await resp.json()) as {
          ok: boolean;
          visitorsCountById: Visitors;
        };

        if (!data.ok) {
          throw new Error('No visitors');
        }
        setVisitors(data.visitorsCountById);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('fetch visitors failed');
      }
    }
    void fetchVisitors();
  }, []);
  return { visitors };
}
