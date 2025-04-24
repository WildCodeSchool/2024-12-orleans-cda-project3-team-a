import { useEffect, useState } from 'react';

// import Barrier from '@/components/barrier';
import BarrierBis from '@/components/barrierebis';
import InfoNbVisitorsMoons from '@/components/info-nb-visitors-moons';
import Input from '@/components/input-blue';
// import Loader from '@/components/loader';
import ReturnHome from '@/components/return-home';

const API_URL = import.meta.env.VITE_API_URL;

type BarrierType = {
  id: number;
  name: string;
  deco_id: number;
  src_image: string;
  position: string;
};

export default function Test() {
  const [email, setEmail] = useState('test');
  const [barriers, setBarriers] = useState<BarrierType[]>([]);

  //fetch pour tableau des barrières
  useEffect(() => {
    async function fetchBarrier() {
      try {
        const response = await fetch(`${API_URL}/game/barrier`);
        const data = await response.json();
        setBarriers(data.barrier);
      } catch (error) {
        console.error(error);
      }
    }
    void fetchBarrier();
  }, []);

  console.log(barriers);

  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <ReturnHome />
      <Input
        type='email'
        placeholder='Votre email'
        value={email}
        onChangeInput={setEmail}
      />
      {email}
      <p>{'PAGE TEST A SUPPRIMER PLUS TARD'}</p>
      <p className='text-2xl'>{' Laisse courrir ton imagination 🦅'}</p>
      {/* <Loader /> */}
      <InfoNbVisitorsMoons />
      <div className='relative min-h-200 min-w-200 bg-blue-200'>
        <p>{'afficher le map de barriers ici :'}</p>
        {barriers.map((barrier) => {
          return <BarrierBis key={barrier.id} barrier={barrier} />;
        })}
      </div>
    </div>
  );
}
