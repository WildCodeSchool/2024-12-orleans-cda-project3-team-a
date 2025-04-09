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
      className='bg-secondary-gray flex h-8 w-8 cursor-pointer items-center justify-center rounded shadow-[0px_4px_4px_rgba(0,0,0,0.25)] active:shadow-none md:h-9 md:w-9 md:rounded-md'
    >
      <img src={backImg} alt='' className='w-6 md:w-7' />
    </button>
  );
}
