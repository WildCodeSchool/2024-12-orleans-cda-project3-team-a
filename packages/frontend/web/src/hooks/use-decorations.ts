import { useEffect, useState } from 'react';

import type { Decorations } from '@app/api';

const API_URL = import.meta.env.VITE_API_URL;

export default function useDecoration() {
  const [decorElements, setDecorElements] = useState<Decorations>([]);

  useEffect(() => {
    async function fetchCreatures() {
      try {
        const response = await fetch(`${API_URL}/game/decorations`, {
          credentials: 'include',
        });
        const data = await response.json();
        setDecorElements(data.decorations);
      } catch (error) {
        console.error('fetch failed', error);
      }
    }
    void fetchCreatures();
  }, []);
  return { decorElements };
}
