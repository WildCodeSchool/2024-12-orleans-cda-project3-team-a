import ReturnHome from '@/components/return-home';
import useVisitors from '@/hooks/use-visitors';

export default function PageVisitors() {
  const { visitorsPark, visitors } = useVisitors();

  const isExit = (exit_time: Date): boolean => exit_time.getTime() < Date.now();

  return (
    <div className='flex h-screen flex-col'>
      <h1 className='font-aerokids text-outline-white mt-4 bg-[linear-gradient(to_right,var(--color-winged-red),var(--color-fairy-blue),var(--color-fairy-green),var(--color-title-orange),var(--color-title-purple))] bg-clip-text text-center text-4xl text-transparent md:text-6xl'>
        {'Discover your visitors!'}
      </h1>
      <div className='absolute top-0 right-0 m-4'>
        <ReturnHome />
      </div>
      <div className='text-secondary-blue overflow-auto text-xs md:text-base'>
        <div className='border-secondary-blue bg-primary-blue m-5 grid grid-cols-5 items-center gap-3 border-1 text-center font-bold'>
          <h2>{'N°'}</h2>
          <h2>{'Entry Time'}</h2>
          <h2>{'Exit Time'}</h2>
          <h2>{'Type of visitor'}</h2>
          <h2>{'State'}</h2>
        </div>
        {visitorsPark.map((visitorPark, index) => {
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

              {/* Display the exit time or "not here" if entry time > exit time */}
              {entryTime > exitTime ? (
                <p className='text-white italic'>{'not here'}</p>
              ) : (
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
              )}

              {entryTime > exitTime ? (
                <p className='text-white italic'>{'---'}</p>
              ) : (
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
              )}

              {isExit(exitTime) ? (
                <p className='text-red-500'>{'OUT'}</p>
              ) : (
                <p className='text-green-500'>{'IN'}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
