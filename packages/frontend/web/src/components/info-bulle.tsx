import useCreaturesMenu from '@/hooks/use-creatures-menu';

const requiredbyZone: Record<number, number> = {
  1: 15,
  2: 10,
  3: 5,
  4: 0,
};

export default function InfoBulleHome() {
  const { creaturesMenu } = useCreaturesMenu();

  if (!creaturesMenu.length) return null;

  const zones = [1, 2, 3, 4];
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
    <div className='flex flex-row justify-center gap-6 rounded-md bg-white p-4 text-xs shadow-[0px_4px_4px_rgba(0,0,0,0.25)] md:text-base'>
      <img className='h-10 w-10' src='/images/minguch.png' alt='Mingush' />

      <div className='flex flex-col'>
        <p className='text-secondary-blue mb-2 text-center'>
          {'To unlock the next Zone you need:'}
        </p>

        <div className='flex justify-center gap-4'>
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
                  className='h-10 w-10'
                />
                <p
                  className={`mt-1 text-sm ${
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
