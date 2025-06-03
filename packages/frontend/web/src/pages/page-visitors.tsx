import ReturnHome from '@/components/return-home';
import useVisitors from '@/hooks/use-visitors';

import moon from '../assets/images/icons-buttons/moon.png';

export default function PageVisitors() {
  const { visitorsPark, visitors } = useVisitors();

  return (
    <div className='flex h-screen flex-col'>
      {/* Title */}
      <h1 className='font-aerokids text-outline-white mt-4 bg-[linear-gradient(to_right,var(--color-winged-red),var(--color-fairy-blue),var(--color-fairy-green),var(--color-title-orange),var(--color-title-purple))] bg-clip-text text-center text-4xl text-transparent md:text-6xl'>
        {'Discover your visitors!'}
      </h1>

      {/* Button to return home */}
      <div className='absolute top-0 right-0 m-4'>
        <ReturnHome />
      </div>

      {/* Table of visitors */}
      <div className='text-secondary-blue overflow-auto text-xs md:text-base'>
        <div className='border-secondary-blue bg-primary-blue m-5 grid grid-cols-5 items-center gap-3 border-1 text-center font-bold'>
          <h2>{'N°'}</h2>
          <h2>{'Last entry time'}</h2>
          <h2>{'Entry price'}</h2>
          <h2>{'Type of visitor'}</h2>
          <h2>{'Next entry'}</h2>
        </div>

        {visitorsPark
          // .filter((visitorPark) => new Date(visitorPark.exit_time) > new Date())
          .map((visitorPark, index) => {
            const entryTime = new Date(visitorPark.entry_time);
            const exitTime = new Date(visitorPark.exit_time);

            return (
              <div
                key={visitorPark.id}
                className='border-secondary-blue bg-primary-blue m-5 grid grid-cols-5 items-center gap-3 border-1 text-center'
              >
                <h3>{index + 1}</h3>
                <p>
                  {entryTime.toLocaleString('fr-FR', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </p>

                <p className='flex items-center justify-center gap-1'>
                  {
                    visitors.find(
                      (visitor) =>
                        visitor.visitor_id === visitorPark.visitor_id,
                    )?.entry_price
                  }
                  <img src={moon} alt='money' className='h-4 md:h-5' />
                </p>

                <div className='flex justify-center'>
                  <img
                    src={`/images/creatures/${
                      visitors.find(
                        (visitor) =>
                          visitor.visitor_id === visitorPark.visitor_id,
                      )?.src_image
                    }`}
                    alt='visitor'
                    className='h-5 md:h-7'
                  />
                </div>

                <p>
                  {exitTime.toLocaleString('fr-FR', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
