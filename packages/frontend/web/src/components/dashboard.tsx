import BgMenu from './bg-menu';

export default function Dashboard() {
  return (
    <BgMenu>
      <div className='p-3'>
        <h1 className='font-aerokids text-outline-white mb-10 bg-[linear-gradient(to_right,var(--color-winged-red),var(--color-fairy-blue),var(--color-fairy-green),var(--color-title-orange),var(--color-title-purple))] bg-clip-text text-4xl text-transparent md:text-6xl'>
          {'Dahsboard Name'}
        </h1>
        {/* Container My park and My visitor */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <div className='relative'>
            <h2 className='font-aerokids text-outline-white absolute w-full -translate-y-1/2 bg-[linear-gradient(to_right,var(--color-winged-yellow),var(--color-title-purple-dark),var(--color-winged-yellow))] bg-clip-text pb-3 text-3xl text-transparent md:text-5xl'>
              {'My park'}
            </h2>
            <li className='grid grid-cols-2 gap-3 rounded border-1 border-gray-500 bg-white/60 p-3 pt-5 md:rounded-md'>
              <ul>{'150$$'}</ul>
              <ul>{'200 visitors'}</ul>
              <ul>{'3/4 world unlocked'}</ul>
              <ul>{'16/20 creatures unlocked'}</ul>
            </li>
          </div>
          <div className='relative'>
            <h2 className='font-aerokids text-outline-white absolute w-full -translate-y-1/2 bg-[linear-gradient(to_right,var(--color-winged-yellow),var(--color-title-purple-dark),var(--color-winged-yellow))] bg-clip-text pb-3 text-3xl text-transparent md:text-5xl'>
              {'My visitors'}
            </h2>
            <li className='grid grid-cols-2 gap-3 rounded border-1 border-gray-500 bg-white/60 p-3 md:rounded-md'>
              <ul>{'150$$'}</ul>
              <ul>{'200 visitors'}</ul>
              <ul>{'3/4 world unlocked'}</ul>
              <ul>{'16/20 creatures unlocked'}</ul>
            </li>
          </div>
        </div>
        {/* Container */}
      </div>
    </BgMenu>
  );
}
