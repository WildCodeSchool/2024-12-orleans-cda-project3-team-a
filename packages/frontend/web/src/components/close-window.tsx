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
      className='bg-tertiary-gray flex h-10 w-10 cursor-pointer items-center justify-center rounded shadow-[0px_4px_4px_rgba(0,0,0,0.25)] active:shadow-none md:h-12 md:w-12 md:rounded-md'
      onClick={closeWindow}
    >
      <img src={close} alt='close' className='w-5 md:w-7' />
    </button>
  );
}
