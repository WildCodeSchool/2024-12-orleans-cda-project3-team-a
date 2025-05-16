import Barrier from '@/components/barrier';
import BuyCreature from '@/components/buy-creature';
import Loader from '@/components/loader';
import NbVisitorsMoons from '@/components/nb-visitors-moons';
import ReturnHome from '@/components/return-home';
import useFetchBarriers from '@/hooks/use-fetch-barriers';

export default function Test() {
  const { barriers, isLoading, refetch } = useFetchBarriers();

  const creatureId = 5;

  return (
    <div className='grid min-w-[1600px] grid-cols-2'>
      <ReturnHome />

      <p>{'PAGE TEST A SUPPRIMER PLUS TARD'}</p>
      <p className='text-2xl'>{' Laisse courrir ton imagination 🦅'}</p>

      <NbVisitorsMoons />

      <div className='relative min-h-200 min-w-200 bg-blue-200'>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {barriers.map((barrier) => {
              return (
                <Barrier
                  key={`${barrier.barrierId}`}
                  barrier={barrier}
                  refetch={refetch}
                />
              );
            })}
          </>
        )}
      </div>
      <BuyCreature creatureId={creatureId} />
    </div>
  );
}
