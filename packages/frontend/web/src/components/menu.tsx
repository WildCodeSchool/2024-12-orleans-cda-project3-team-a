import { useState } from 'react';
import { Link } from 'react-router-dom';

import iconDashboard from '../assets/images/icons-buttons/dashboard.png';
import iconMenu from '../assets/images/icons-buttons/menu.png';
import iconProfil from '../assets/images/icons-buttons/profile.png';
import iconRanking from '../assets/images/icons-buttons/ranking.png';
import iconRules from '../assets/images/icons-buttons/rules.png';
import iconShop from '../assets/images/icons-buttons/shop.png';
import Dashboard from './dashboard';
import EditProfile from './edit-profile';
import Leaderboard from './leaderboard';
import Logout from './logout';
import ShopCreature from './modal-shop-creatures';
import Portal from './portal';

type ModalName = 'dashboard' | 'shop' | 'ranking' | 'profile' | null;

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
            ? 'bg-primary-gray h-[90vh] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] active:shadow-none'
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
            title='Menu'
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
              <img
                src={iconDashboard}
                alt='Dashboard'
                title='Dashboard'
                className='h-6 md:h-7'
              />
            </div>
            <div
              onClick={() => {
                handleClick('shop');
              }}
            >
              <img
                src={iconShop}
                alt='Shop'
                title='Shop'
                className='h-6 cursor-pointer md:h-7'
              />
            </div>
            <div>
              <img
                onClick={() => {
                  handleClick('ranking');
                }}
                src={iconRanking}
                alt='Ranking'
                title='Ranking'
                className='h-6 cursor-pointer md:h-7'
              />
            </div>
          </div>
          {/* Second part of the menu content : profil, rules, log out */}
          <div className='flex flex-col gap-7 md:flex-row'>
            <div>
              <img
                onClick={() => {
                  handleClick('profile');
                }}
                src={iconProfil}
                alt='Profil'
                title='Profil'
                className='h-6 cursor-pointer md:h-7'
              />
            </div>
            <Link to='/rules'>
              <img
                src={iconRules}
                alt='Rules'
                title='Rules'
                className='h-6 md:h-7'
              />
            </Link>

            <Logout />
          </div>
        </div>
      </div>
      <Portal>
        <div
          className={
            openModal
              ? 'md:pd-0 absolute top-[2%] left-1 flex max-h-screen w-[98%] translate-y-10 justify-center pb-6 text-center md:translate-y-[10%]'
              : ''
          }
        >
          {/* Display Dashboard in pop-up if is open*/}
          {openModal === 'dashboard' ? (
            <Dashboard closeDashboard={handleClose} />
          ) : null}

          {/* Display Shop in pop-up if is open*/}
          {openModal === 'shop' ? (
            <ShopCreature closeShop={handleClose} />
          ) : null}

          {/* Display Rank in pop-up if is open*/}
          {openModal === 'ranking' ? (
            <Leaderboard closeRank={handleClose} />
          ) : null}

          {/* Display edit profile in pop-up if is open*/}
          {openModal === 'profile' ? (
            <EditProfile closeEditProfile={handleClose} />
          ) : null}
        </div>
      </Portal>
    </>
  );
}
