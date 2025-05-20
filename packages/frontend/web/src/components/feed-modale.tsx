import { useState } from 'react';

import BgMenu from './bg-menu';
import CreatureLine from './creature-line';

export default function FeedModale() {
  const [isOpen, setIsOpen] = useState(false);

  const handleModale = () => {
    setIsOpen(false);
  };

  return (
    <button type='button' onClick={handleModale}>
      <BgMenu>
        <CreatureLine />
      </BgMenu>
    </button>
  );
}
