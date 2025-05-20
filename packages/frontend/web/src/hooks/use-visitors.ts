import { useEffect, useState } from 'react';

export default function useVisitors() {
  const [visitors, setVisitors] = useState<
    Array<{
      visitor_id: number;
      visitor_count: number;
      src_image: string | null;
      spending: number;
      spending_time: number;
    }>
  >([]);

  useEffect(() => {
    async function fetchVisitors() {
      try {
        const resp = await fetch(`/api/game/visitors`, {
          credentials: 'include',
        });
        const data = (await resp.json()) as {
          ok: boolean;
          visitorsCountById: Array<{
            visitor_id: number;
            visitor_count: number;
            src_image: string | null;
            spending: number;
            spending_time: number;
          }>;
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
