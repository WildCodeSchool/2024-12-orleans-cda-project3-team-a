import { useNavigate } from 'react-router-dom';

import backImg from '../assets/images/icons-buttons/back.png';

export default function ReturnHome() {
  const navigate = useNavigate();

  const handleClick = () => {
    void navigate('/');
  };

  return (
    <button
      type='button'
      onClick={handleClick}
      className='bg-tertiary-gray flex h-10 w-10 items-center justify-center rounded shadow-[0px_4px_4px_rgba(0,0,0,0.25)] active:shadow-none md:h-12 md:w-12 md:rounded-md'
    >
      <img src={backImg} alt='' className='w-8 md:w-10' />
    </button>
  );
}
