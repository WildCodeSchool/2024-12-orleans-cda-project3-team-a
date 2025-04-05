import { useNavigate } from 'react-router-dom';

import backImg from '../assets/images/icons-buttons/back.png';

export default function ReturnHome() {
  const navigate = useNavigate();

  const handleClick = () => {
    void navigate('/');
  };

  return (
    <div>
      <button
        type='button'
        onClick={handleClick}
        className='bg-tertiary-gray xl:bg-tertiary-gray rounded-2xl p-1 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]'
      >
        <img src={backImg} alt='' className='lg:w- w-9 sm:w-9 xl:w-13' />
      </button>
    </div>
  );
}
