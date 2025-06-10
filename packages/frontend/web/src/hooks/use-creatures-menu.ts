import { useCallback, useEffect, useState } from 'react';

import type { Enclosure } from '@app/api';

export default function useCreaturesMenu() {
  const [creaturesMenu, setCreaturesMenu] = useState<Enclosure[]>([]);

  const fetchCreaturesMenu = useCallback(async () => {
    try {
      const response = await fetch(`/api/game/creatures-menu`);
      const data = await response.json();
      if (data.ok === false) {
        throw new Error('No park');
      }
      setCreaturesMenu(data.creaturesMenu);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('fetch failed', error);
    }
  }, []);

  useEffect(() => {
    void fetchCreaturesMenu();
  }, [fetchCreaturesMenu]);

  return { creaturesMenu, refetchCreaturesMenu: fetchCreaturesMenu };
}
