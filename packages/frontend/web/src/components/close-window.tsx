import { useState } from 'react';

import close from '../assets/images/icons-buttons/close.png';

export default function Close() {
  const [isOpen, setIsOpen] = useState(true);

  const closeWindow = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <button
      type='button'
      className='bg-tertiary-gray flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.25)] active:shadow-none md:h-14 md:w-14 md:rounded-2xl'
      onClick={closeWindow}
    >
      <img src={close} alt='close' className='w-6 md:w-9' />
    </button>
  );
}
