import { useState } from 'react';
import { Link } from 'react-router-dom';

import iconDashboard from '../assets/images/icons-buttons/dashboard.png';
import iconMenu from '../assets/images/icons-buttons/menu.png';
import iconProfil from '../assets/images/icons-buttons/profile.png';
import iconRanking from '../assets/images/icons-buttons/ranking.png';
import iconRules from '../assets/images/icons-buttons/rules.png';
import iconShop from '../assets/images/icons-buttons/shop.png';
import Dashboard from './dashboard';
import Logout from './logout';

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDahsboardOpen, setIsDahsboardOpen] = useState(false);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDashboard = () => {
    setIsDahsboardOpen(!isDahsboardOpen);
  };

  return (
    <>
      {/* //Ouvrir ou fermer menu selon la valeur isMenuOpen */}
      <div
        className={`flex w-8 flex-col items-center gap-5 rounded pb-2 md:h-9 md:flex-1 md:flex-row md:rounded-lg md:pr-2 md:pb-0 ${
          isMenuOpen
            ? 'bg-primary-gray h-[95vh] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] active:shadow-none'
            : ''
        }`}
      >
        <button
          type='button'
          className={`items-center justify-center rounded p-1 md:p-2 md:py-0 ${
            !isMenuOpen
              ? 'bg-primary-gray h-8 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] active:shadow-none md:h-9'
              : ''
          }`}
        >
          <img
            src={iconMenu}
            alt='Menu'
            onClick={handleMenu}
            className='cursor-pointer md:h-7 md:w-7'
          />
        </button>

        <div
          className={` ${isMenuOpen ? 'flex h-screen flex-col justify-between md:h-auto md:flex-1 md:flex-row' : 'hidden'}`}
        >
          <div className='flex flex-col gap-7 md:flex-row'>
            <div onClick={handleDashboard}>
              <img src={iconDashboard} alt='' className='h-6 md:h-7' />
            </div>

            <img src={iconShop} alt='' className='h-6 md:h-7' />
            <img src={iconRanking} alt='' className='h-6 md:h-7' />
          </div>
          <div className='flex flex-col gap-7 md:flex-row'>
            <img src={iconProfil} alt='' className='h-6 md:h-7' />
            <Link to='/rules'>
              <img src={iconRules} alt='' className='h-6 md:h-7' />
            </Link>

            <Logout />
          </div>
        </div>
      </div>
    </>
  );
}
