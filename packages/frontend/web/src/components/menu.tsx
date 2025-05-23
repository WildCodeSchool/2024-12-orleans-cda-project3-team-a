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
import ShopCreature from './modal-shop-creatures';

type ModalName = 'dashboard' | 'shop' | 'ranking' | 'profil' | null;

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState<ModalName>(null);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick = (modal: ModalName) => {
    setOpenModal(modal);
    if (window.innerWidth < 768) {
      setIsMenuOpen(false);
    }
  };

  const handleClose = () => {
    setOpenModal(null);
  };

  return (
    <>
      {/* Display or not if isMenuOpen */}
      <div
        className={`flex w-8 flex-col items-center gap-5 rounded pb-2 md:h-9 md:flex-1 md:flex-row md:rounded-lg md:pr-2 md:pb-0 ${
          isMenuOpen
            ? 'bg-primary-gray h-[95vh] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] active:shadow-none'
            : ''
        }`}
      >
        {/* button menu */}
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

        {/* Content of menu if is open */}
        <div
          className={` ${isMenuOpen ? 'flex h-screen flex-col justify-between md:h-auto md:flex-1 md:flex-row' : 'hidden'}`}
        >
          {/* First part of the menu content : dahsboard, shop, ranking */}
          <div className='flex flex-col gap-7 md:flex-row'>
            <div
              onClick={() => {
                handleClick('dashboard');
              }}
              className='cursor-pointer'
            >
              <img src={iconDashboard} alt='' className='h-6 md:h-7' />
            </div>
            <div
              onClick={() => {
                handleClick('shop');
              }}
            >
              <img
                src={iconShop}
                alt=''
                className='h-6 cursor-pointer md:h-7'
              />
            </div>
            <div>
              <img
                onClick={() => {
                  handleClick('ranking');
                }}
                src={iconRanking}
                alt=''
                className='h-6 cursor-pointer md:h-7'
              />
            </div>
          </div>
          {/* Second part of the menu content : profil, rules, log out */}
          <div className='flex flex-col gap-7 md:flex-row'>
            <div>
              <img
                onClick={() => {
                  handleClick('profil');
                }}
                src={iconProfil}
                alt=''
                className='h-6 cursor-pointer md:h-7'
              />
            </div>
            <Link to='/rules'>
              <img src={iconRules} alt='' className='h-6 md:h-7' />
            </Link>

            <Logout />
          </div>
        </div>
      </div>

      {/* Display Dashboard in pop-up if is open*/}
      {openModal === 'dashboard' ? (
        <div className='absolute flex max-h-screen w-[98%] translate-y-10 justify-center pb-6 text-center md:translate-y-2/10'>
          <Dashboard closeDashboard={handleClose} />
        </div>
      ) : null}

      {/* Display Shop in pop-up if is open*/}
      {openModal === 'shop' ? (
        <div className='maw-h-screen absolute top-11 flex w-[98%] justify-center pb-6 text-center md:translate-y-2/10'>
          <ShopCreature closeShop={handleClose} />
        </div>
      ) : null}
    </>
  );
}
