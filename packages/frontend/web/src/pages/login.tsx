import BgHome from '../assets/images/background/bg-home.webp';
import Logo from '../assets/images/logo/fp-logo-arc.png';

export default function Login() {
  return (
    <div
      className='h-screen bg-cover bg-center'
      style={{ backgroundImage: `url(${BgHome})` }}
    >
      <img
        src={Logo}
        alt='Fantasy Park'
        className='absolute h-80 min-w-266 pl-55'
      />
      <div className='flex items-center justify-center pt-45'>
        <div className='h-135 w-156 bg-white'>
          <form>
            <p>{'coucou'}</p>
          </form>
        </div>
      </div>
    </div>
  );
}
