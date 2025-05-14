import { Link } from 'react-router-dom';

import ButtonBuy from '@/components/button-buy';

import mingush from '../assets/images/icons-buttons/minguch.png';

export default function Page404() {
  return (
    <div className='text-secondary-blue relative h-screen bg-[url(/images/background/404-mobile.webp)] bg-cover bg-center px-4 py-10 md:items-start md:bg-[url(/images/background/404-desktop.webp)] md:py-3'>
      <div className='flex h-full flex-col items-center justify-between md:h-auto md:flex-row'>
        <div className='z-2 flex items-center gap-2 rounded bg-white/95 p-1 px-4 text-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)] md:rounded-md'>
          <img src={mingush} alt='Mingush' className='w-10' />
          <p>{'Impassable path... even your creatures refuse to go there! '}</p>
        </div>

        <Link to='/home' className='font-semibold'>
          <ButtonBuy
            bg='bg-[linear-gradient(to_bottom,_#FFFFFF,_#D8D8D8)]'
            cursor='pointer'
          >
            {'< Home '}
          </ButtonBuy>
        </Link>
      </div>

      <div className='absolute top-3/8 flex items-center justify-center text-7xl md:text-8xl'>
        <p className='font-aerokids text-outline-purple bg-white bg-clip-text p-7 text-center text-transparent'>
          {'404'}
          <br />
          {'Not Found'}
        </p>
      </div>
    </div>
  );
}
