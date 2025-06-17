import { useCallback, useEffect, useState } from 'react';

type Gift =
  | { type: 'creature'; creatureId: number; image: string }
  | { type: 'visitor'; visitor: string; image: string }
  | { type: 'moons'; moons: number };

export default function useGift() {
  const [gift, setGift] = useState<Gift>();

  const fetchGift = useCallback(async () => {
    try {
      const response = await fetch(`/api/game/gift`);

      const data = await response.json();

      if (data.ok === false) {
        throw new Error('No gift yet');
      }

      setGift(data.gift);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('fetch gift failed');
    }
  }, []);

  useEffect(() => {
    void fetchGift();
  }, [fetchGift]);

  return {
    gift,
    fetchGift,
  };
}
