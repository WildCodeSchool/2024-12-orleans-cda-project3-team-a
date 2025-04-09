import { useState } from 'react';

import iconDashboard from '../assets/images/icons-buttons/dashboard.png';
import iconMenu from '../assets/images/icons-buttons/menu.png';
import iconProfil from '../assets/images/icons-buttons/profile.png';
import iconRanking from '../assets/images/icons-buttons/ranking.png';
import iconRules from '../assets/images/icons-buttons/rules.png';
import iconShop from '../assets/images/icons-buttons/shop.png';

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    //Ouvrir ou fermer menu selon la valeur isMenuOpen
    <div
      className={`flex h-8 flex-1 items-center gap-5 rounded md:h-9 md:rounded-lg ${
        isMenuOpen
          ? 'bg-primary-gray shadow-[0px_4px_4px_rgba(0,0,0,0.25)] active:shadow-none'
          : ''
      }`}
    >
      <button
        type='button'
        className={`flex items-center justify-center rounded px-2 ${
          !isMenuOpen
            ? 'bg-primary-gray h-8 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] active:shadow-none md:h-9'
            : ''
        }`}
      >
        <img
          src={iconMenu}
          alt='Menu'
          onClick={handleMenu}
          className='h-5 cursor-pointer md:h-7'
        />
      </button>
      {isMenuOpen ? (
        <div className='flex flex-1 justify-between'>
          <div className='flex gap-7'>
            <img src={iconDashboard} alt='' className='h-5 md:h-7' />
            <img src={iconShop} alt='' className='h-5 md:h-7' />
            <img src={iconRanking} alt='' className='h-5 md:h-7' />
          </div>
          <div className='flex gap-7'>
            <img src={iconProfil} alt='' className='h-5 md:h-7' />
            <img src={iconRules} alt='' className='h-5 md:h-7' />
          </div>
        </div>
      ) : null}
    </div>
  );
}
