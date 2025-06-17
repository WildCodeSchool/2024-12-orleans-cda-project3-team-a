import { useGameInfoContext } from '@/contexts/game-info-context';

const requiredbyZone: Record<number, number> = {
  1: 15,
  2: 10,
  3: 5,
  4: 0,
};

export default function InfoBulleHome() {
  const { creaturesMenu, unlockedZones } = useGameInfoContext();

  if (!creaturesMenu.length) return null;

  //recover the number of zone unlocked
  const countZoneIdUnlocked = unlockedZones.reduce((count, element) => {
    return count + (element.park_zone_id !== null ? 1 : 0);
  }, 0);

  //recover the minimum number of creatures by zone
  const required = unlockedZones
    .filter((zone) => zone.zone_id === countZoneIdUnlocked)
    .map((zone) => Number(zone.required_qty));

  return (
    <div className='absolute top-1/2 right-5 flex -translate-y-1/2 items-center justify-center md:left-1/2 md:-translate-x-1/2'>
      <div className='flex flex-col justify-center rounded-md bg-white px-0 py-2 text-xs shadow-[0px_4px_4px_rgba(0,0,0,0.25)] md:p-4 md:text-base'>
        <div className='mb-4 flex flex-row items-center justify-center gap-4 font-extrabold'>
          <img
            className='h-7 w-7 md:h-10 md:w-10'
            src='/images/minguch.png'
            alt='Mingush'
          />
          <p className='text-secondary-blue hidden text-center md:flex'>
            {'To unlock the next zone you need:'}
          </p>
        </div>
        <div className='flex flex-col justify-center gap-4 md:flex-row'>
          {/* Displays each creature species with its total number purchased */}
          {creaturesMenu
            .filter((creature) => creature.zone_id === countZoneIdUnlocked)
            .map((creature) => (
              <div
                key={creature.id}
                className='flex min-w-[60px] flex-col items-center'
              >
                <img
                  src={`/images/creatures/${creature.src_image}`}
                  alt={creature.species}
                  className='h-5 w-5 md:h-10 md:w-10'
                />
                <p
                  className={`mt-1 text-xs md:text-base ${
                    Number(creature.quantityCreature) >= Number(required)
                      ? 'font-semibold text-green-500'
                      : 'text-gray-600'
                  }`}
                >
                  {creature.quantityCreature}
                  {'/'}
                  {required}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
