import { useNavigate } from 'react-router-dom';

import backImg from '../assets/images/icons-buttons/back.png';

export default function ReturnHome() {
  const navigate = useNavigate();

  const handleClick = () => {
    void navigate('/');
  };

  return (
    <div className='flex justify-end pt-4 pr-4'>
      <img
        className='bg-tertiary-gray w-14 rounded-2xl p-1'
        onClick={handleClick}
        src={backImg}
        alt=''
      />
    </div>
  );
}
