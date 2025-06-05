import { useCallback, useEffect, useState } from 'react';

import type { Decorations } from '@app/api';

export default function useDecorations() {
  const [decorations, setDecorations] = useState<Decorations>([]);

  const fetchDecorations = useCallback(async () => {
    try {
      const response = await fetch(`/api/game/decorations`, {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.ok === true) {
        setDecorations(data.decorations);
      }
    } catch (error) {
      console.error('fetch failed', error);
    }
  }, []);

  useEffect(() => {
    void fetchDecorations();
  }, [fetchDecorations]);

  return { decorations, refetchDecorations: fetchDecorations };
}
