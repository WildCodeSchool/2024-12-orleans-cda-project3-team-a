import BgHome from '../assets/images/background/bg-home.webp';
import Logo from '../assets/images/logo/fp-logo-arc.png';

export default function Login() {
  return (
    <div
      className='flex min-h-screen justify-center bg-black bg-cover bg-center px-4 py-8 md:h-dvh md:bg-contain md:bg-center md:bg-no-repeat'
      style={{ backgroundImage: `url(${BgHome})` }}
    >
      <div className='flex w-full items-center justify-center pt-15 md:pt-45'>
        <img
          src={Logo}
          alt='Fantasy Park'
          className='absolute top-27 z-2 h-23 w-80 md:top-18 md:h-80 md:min-w-266'
        />
        <div className='h-83 w-74 rounded-lg bg-white/90 shadow-[0px_8px_4px_rgba(0,0,0,0.25)] md:h-133 md:w-142'>
          <p className='text-center'>{'coucou'}</p>
        </div>
      </div>
    </div>
  );
}
