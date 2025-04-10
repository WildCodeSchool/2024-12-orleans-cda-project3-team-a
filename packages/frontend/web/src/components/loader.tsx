import loader from '../assets/images/icons-buttons/loader.png';

export default function Loader() {
  return (
    <div className='flex h-12 w-12 animate-spin items-center justify-center rounded-full bg-[linear-gradient(to_bottom,_#BA42FF,_#00E1FF)] text-center shadow-[0px_-5px_20px_0px_rgb(186,_66,_255),_0px_5px_20px_0px_rgb(0,_225,_255)]'>
      <div className='bg-primary-gray h-10 w-10 rounded-[50px]' />
      <img src={loader} alt='loader' className='absolute' />
    </div>
  );
}
