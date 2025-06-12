import { Link } from 'react-router-dom';

import { formatNumber } from '@/utils/number-formatter';

import moon from '../assets/images/icons-buttons/moon.png';
import visitor from '../assets/images/icons-buttons/visitors.png';
import { useGameInfoContext } from '../contexts/game-info-context';

export default function NbVisitorsMoons() {
  const { wallet, countVisitorActiveFormated, isWalletUpdated, profitWallet } =
    useGameInfoContext();

  return (
    <div className='bg-secondary-gray flex h-8 w-fit cursor-default items-center justify-between gap-2 rounded px-2 py-0.5 text-xs shadow-[0px_4px_4px_rgba(0,0,0,0.25)] md:h-9 md:rounded-md md:text-base'>
      <div className='flex flex-row items-center gap-0.5 md:gap-1'>
        {countVisitorActiveFormated}
        <Link to='/visitors'>
          <img
            src={visitor}
            alt='visitors'
            className='h-6 md:h-7'
            title='visitor'
          />
        </Link>
      </div>
      <div
        className='relative flex flex-row items-center gap-0.5 md:gap-1'
        title={wallet.toLocaleString()}
      >
        {formatNumber(wallet)}
        <img src={moon} alt='money' className='h-6 md:h-7' title='Moons' />
        <div
          //add a key to re-render the animation
          key={Date.now()}
          className='animate-wallet-up absolute -bottom-10 text-green-600'
        >
          {isWalletUpdated ? (
            <p>
              {'+'}
              {profitWallet.toLocaleString()}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
