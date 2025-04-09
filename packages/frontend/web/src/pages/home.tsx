import ButtonBuy from '@/components/button-buy';
import CloseWindow from '@/components/close-window';
import InfoNbVisitorsMoons from '@/components/info-nb-visitors-moons';
import ReturnHome from '@/components/return-home';

export default function Home() {
  return (
    <>
      {/* <div className='flex items-center justify-center p-4'>
        <p className='font-aerokids bg-[linear-gradient(to_right,var(--color-winged-red),var(--color-fairy-blue),var(--color-fairy-green),var(--color-title-orange),var(--color-title-purple))] bg-clip-text p-7 text-9xl text-transparent'>
          {'Fantasy Park !'}
        </p>
      </div> */}
      <div className='flex gap-1.5'>
        {' '}
        <InfoNbVisitorsMoons />
        <CloseWindow />
        <ReturnHome />
      </div>
    </>
  );
}
