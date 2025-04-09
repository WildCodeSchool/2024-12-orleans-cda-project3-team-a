import moon from '../assets/images/icons-buttons/moon.png';
import visitor from '../assets/images/icons-buttons/visitors.png';

//faire le fetch dans le contexte!

export default function InfoNbVisitorsMoons() {
  return (
    <div className='bg-secondary-gray flex h-8 cursor-default items-center justify-between gap-2 rounded px-2 py-0.5 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] md:h-9 md:rounded-md'>
      <div className='flex flex-row items-center gap-0.5 md:gap-1'>
        {'50'}
        <img src={visitor} alt='visitors' className='h-6 md:h-7' />
      </div>
      <div className='flex flex-row items-center gap-0.5 md:gap-1'>
        {'100k'}
        <img src={moon} alt='mooney' className='h-6 md:h-7' />
      </div>
    </div>
  );
}
