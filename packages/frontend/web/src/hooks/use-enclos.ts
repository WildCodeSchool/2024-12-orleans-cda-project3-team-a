import { useEffect, useState } from 'react';

import type { Enclosure } from '@app/api';

const API_URL = import.meta.env.VITE_API_URL;

export default function useEnclosures() {
  const [creaturesEnclos, setCreaturesEnclos] = useState<Enclosure[]>([]);
  const [countCreaturesIdUnlocked, setCountCreaturesIdUnlocked] = useState<[]>(
    [],
  );

  useEffect(() => {
    async function fetchCreatures() {
      try {
        const response = await fetch(`${API_URL}/game/enclos`, {
          credentials: 'include',
        });
        // const data = (await response.json()) as {
        //   ok: boolean;
        //   enclosure: [{
        //     background: string;
        //     feed_timer: number | null;
        //     id: number | null;
        //     price: number;
        //     species: string;
        //     src_image: string | null;
        //     unlock_cost: number | null;
        //     zone_id: number;
        //     src_sign: string | null;
        //     quantityCreature: string | number | bigint;
        //   }];
        // };
        const data = await response.json();
        if (data.ok === false) {
          throw new Error('No park');
        }
        setCreaturesEnclos(data.enclosure);
        setCountCreaturesIdUnlocked(data.creaturesUnlocked);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('fetch failed', error);
      }
    }
    void fetchCreatures();
  }, []);
  return { creaturesEnclos, countCreaturesIdUnlocked };
}
