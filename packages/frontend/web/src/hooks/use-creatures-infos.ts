import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export default function Creatures() {
  const [creatures, setCreatures] = useState([]);

  useEffect(() => {
    async function fetchCreatures() {
      try {
        const response = await fetch(`${API_URL}/game/info-creatures`);
        const data = await response.json();
        console.log('donné recup', data);
        setCreatures(data.creaturesInfo.creatures);
      } catch (error) {
        console.error('fetch failed', error);
      }
    }
    void fetchCreatures();
  }, []);
  return { creatures };
}
