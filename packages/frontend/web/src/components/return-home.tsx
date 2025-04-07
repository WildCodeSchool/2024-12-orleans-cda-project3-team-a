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
      className='bg-tertiary-gray xl:bg-tertiary-gray rounded-2xl p-1 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] active:shadow-none'
    >
      <img src={backImg} alt='' className='w-6 md:w-7' />
    </button>
  );
}
