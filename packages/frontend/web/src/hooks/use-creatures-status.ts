import { useCallback, useState } from 'react';

type CreaturesStatusProps = {
  hasCreatures: boolean;
  checkCreaturesStatus: () => Promise<void>;
};

export default function useCreaturesStatus(): CreaturesStatusProps {
  const [hasCreatures, setHasCreatures] = useState<boolean>(false);

  const checkCreaturesStatus = useCallback(async (): Promise<void> => {
    const response = await fetch('/api/game/creature/has-creatures');

    if (!response.ok) {
      return;
    }

    const data = await response.json();

    if (data.hasCreatures === false) {
      return;
    }
    setHasCreatures(data.hasCreatures);
  }, []);

  return {
    hasCreatures,
    checkCreaturesStatus,
  };
}
