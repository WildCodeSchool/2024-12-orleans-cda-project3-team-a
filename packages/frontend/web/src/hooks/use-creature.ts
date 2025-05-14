import { useEffect, useState } from 'react';
import type { GetCreature } from '@app/api';

const API_URL = import.meta.env.VITE_API_URL;

export default function useCreature() {
  const [creature, setCreature] = useState<GetCreature>([]);
  const [activeCreature, setActiveCreature] = useState<GetCreature>([]);

  useEffect(() => {
    async function fetchCreature() {
      try {
        const response = await fetch(`${API_URL}/game/creature`, {
          credentials: 'include',
        });
        const data = await response.json();
        setCreature(data.creature);
        setActiveCreature(data.activeCreature);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('fetch creature failed', error);
      }
    }

    void fetchCreature();
  }, []);

  return {
    creature,
    activeCreature,
  };
}
