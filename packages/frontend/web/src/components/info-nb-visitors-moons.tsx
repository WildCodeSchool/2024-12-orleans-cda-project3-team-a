import moon from '../assets/images/icons-buttons/moon2.png';
import visitor from '../assets/images/icons-buttons/visitors.png';

export default function InfoNbVisitorsMoons() {
  return (
    <div className='bg-secondary-gray flex h-10 w-32 items-center justify-between rounded px-2 py-0.5 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] md:h-12 md:w-38 md:rounded-md'>
      <div className='flex flex-row items-center gap-0.5 md:gap-1'>
        {'50'}
        <img src={visitor} alt='visitors' className='h-6 md:h-8' />
      </div>
      <div className='flex flex-row items-center gap-0.5 md:gap-1'>
        {'100k'}
        <img src={moon} alt='mooney' className='h-6 md:h-8' />
      </div>
    </div>
  );
}
