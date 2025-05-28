import moon from '../assets/images/icons-buttons/moon.png';
import visitor from '../assets/images/icons-buttons/visitors.png';
import { useGameInfoContext } from '../contexts/game-info-context';

export default function NbVisitorsMoons() {
  const { walletFormated, wallet } = useGameInfoContext();
  const { countVisitorActiveFormated } = useGameInfoContext();

  return (
    <div className='bg-secondary-gray flex h-8 w-fit cursor-default items-center justify-between gap-2 rounded px-2 py-0.5 text-xs shadow-[0px_4px_4px_rgba(0,0,0,0.25)] md:h-9 md:rounded-md md:text-base'>
      <div className='flex flex-row items-center gap-0.5 md:gap-1'>
        {countVisitorActiveFormated}
        <img src={visitor} alt='visitors' className='h-6 md:h-7' />
      </div>
      <div
        className='flex flex-row items-center gap-0.5 md:gap-1'
        title={wallet.toLocaleString()}
      >
        {walletFormated}
        <img src={moon} alt='money' className='h-6 md:h-7' />
      </div>
    </div>
  );
}
