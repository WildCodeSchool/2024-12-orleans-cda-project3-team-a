import { useGameInfoContext } from '@/contexts/game-info-context';

const requiredbyZone: Record<number, number> = {
  1: 15,
  2: 10,
  3: 5,
  4: 0,
};

export default function InfoBulleHome() {
  const { creaturesMenu, unlockedZones } = useGameInfoContext();
  console.log(unlockedZones);

  if (!creaturesMenu.length) return null;

  const zones = unlockedZones.map((zone) => zone.zone_id);

  let currentZoneId = 1;

  //filter creature by zone
  for (const zoneId of zones) {
    const creaturesInZone = creaturesMenu.filter(
      (c) => c.zone_id === zoneId && Number(c.quantityCreature) > 0,
    );

    //extraction of creatures for advancement
    const allSpeciesInZone = [
      ...new Set(
        creaturesMenu.filter((c) => c.zone_id === zoneId).map((c) => c.species),
      ),
    ];

    //check if zone completed
    const isZoneComplete = allSpeciesInZone.every((species) => {
      const totalForSpecies = creaturesInZone
        .filter((c) => c.species === species)
        .reduce((sum, c) => sum + Number(c.quantityCreature), 0);
      return totalForSpecies >= requiredbyZone[zoneId];
    });

    if (!isZoneComplete) {
      currentZoneId = zoneId;
      break;
    } else {
      currentZoneId = zoneId + 1;
    }
  }

  if (currentZoneId >= 4) return null;

  const creaturestotal = creaturesMenu.filter(
    (c) => c.zone_id === currentZoneId,
  );

  //item that counts purchased creatures
  const speciesMap: Record<string, number> = {};

  //Count the total number of creatures purchased by species in a speciesMap object
  creaturestotal.forEach((c) => {
    const quantity = Number(c.quantityCreature);
    if (!speciesMap[c.species]) speciesMap[c.species] = 0;
    speciesMap[c.species] += quantity;
  });

  //recover the minimum number of creatures by zone
  const required = requiredbyZone[currentZoneId];

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
          {Object.entries(speciesMap).map(([species, count]) => {
            const creature = creaturestotal.find((c) => c.species === species);
            if (!creature) return null;

            return (
              <div
                key={species}
                className='flex min-w-[60px] flex-col items-center'
              >
                <img
                  src={`/images/creatures/${creature.src_image}`}
                  alt={species}
                  className='h-5 w-5 md:h-10 md:w-10'
                />
                <p
                  className={`mt-1 text-xs md:text-base ${
                    count >= required
                      ? 'font-semibold text-green-600'
                      : 'text-gray-600'
                  }`}
                >
                  {count} {'/'} {required}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
