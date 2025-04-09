import InfoNbVisitorsMoons from '@/components/info-nb-visitors-moons';
import Menu from '@/components/menu';

export default function Home() {
  return (
    <>
      {/* <div className='flex items-center justify-center p-4'>
        <p className='font-aerokids bg-[linear-gradient(to_right,var(--color-winged-red),var(--color-fairy-blue),var(--color-fairy-green),var(--color-title-orange),var(--color-title-purple))] bg-clip-text p-7 text-9xl text-transparent'>
          {'Fantasy Park !'}
        </p>
      </div> */}
      {/* <div></div> */}

      <div className='flex flex-row gap-2'>
        <Menu />
        <InfoNbVisitorsMoons />
      </div>

      {/* <div className='flex flex-row gap-2'>
        <div className='flex-1 bg-blue-100 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]'>Contenu gauche </div>
        <div className='bg-red-400 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]'>Contenu droite</div>
      </div> */}
    </>
  );
}
