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
        className='bg-tertiary-gray w-14 rounded-2xl p-1 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]'
      >
        <img src={backImg} alt='' />
      </button>
    </div>
  );
}
