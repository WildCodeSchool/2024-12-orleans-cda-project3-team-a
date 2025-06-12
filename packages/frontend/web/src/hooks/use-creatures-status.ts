import { useCallback, useState } from 'react';

type CreaturesStatusProps = {
  hasCreature: boolean;
  checkCreatureStatus: () => Promise<void>;
};

export default function useCreaturesStatus(): CreaturesStatusProps {
  const [hasCreature, setHasCreature] = useState<boolean>(false);

  const checkCreatureStatus = useCallback(async (): Promise<void> => {
    const response = await fetch('/api/game/creature/has-creatures');

    if (!response.ok) {
      return;
    }

    const data = await response.json();

    if (data.hasCreatures === false) {
      return;
    }
    setHasCreature(data.hasCreature);
  }, []);

  return {
    hasCreature,
    checkCreatureStatus,
  };
}
