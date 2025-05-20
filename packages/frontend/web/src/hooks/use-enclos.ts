import { useEffect, useState } from 'react';

import type { Enclosure } from '@app/api';

export default function useEnclosures() {
  const [creaturesEnclos, setCreaturesEnclos] = useState<Enclosure[]>([]);
  const [countCreaturesIdUnlocked, setCountCreaturesIdUnlocked] = useState<[]>(
    [],
  );

  useEffect(() => {
    async function fetchCreatures() {
      try {
        const response = await fetch(`/api/game/enclos`, {
          credentials: 'include',
        });
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
