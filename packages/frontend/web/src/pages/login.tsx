import BgHome from '../assets/images/background/bg-home.webp';
import Logo from '../assets/images/logo/fp-logo-arc.png';

export default function Login() {
  return (
    <div
      className='flex h-screen justify-center bg-cover bg-center'
      style={{ backgroundImage: `url(${BgHome})` }}
    >
      <img
        src={Logo}
        alt='Fantasy Park'
        className='absolute top-30 z-2 min-h-23 min-w-80 md:h-80 md:min-w-266'
      />
      <div className='flex items-center justify-center pt-45 md:pt-45'>
        <div className='h-83 w-74 rounded-lg bg-white opacity-90 shadow-[0px_8px_4px_rgba(0,0,0,0.25)] md:h-135 md:w-156'>
          <form>{'coucou'}</form>
        </div>
      </div>
    </div>
  );
}

//faire la carré blanc aussi

//  w-80 ,w-266 h23

// h-80, h-23

// <img
// src={Logo}
// alt='Fantasy Park'
// className='z-2 min-h-23 min-w-80 pt-15 md:absolute md:h-80 md:min-w-266 md:pl-55'
// />
// <div className='flex items-center justify-center pt-45'>
// <div className='h-83 w-73 bg-white opacity-90 md:h-135 md:w-156'>
//   <form>{'coucou'}</form>
// </div>
// </div>
// </div>
