import ReturnHome from '@/components/return-home';

export default function Rules() {
  return (
    <div className='text-secondary-blue z-3 flex flex-col items-center justify-center p-2'>
      <h1 className='mt-6 p-4 text-xl font-extrabold tracking-[0.6em] md:mt-14 md:text-2xl'>
        {'RULES'}
      </h1>
      <div className='text-xs md:text-base'>
        <p className='mb-3 text-center font-extrabold'>
          {`How would you manage the most incredible fantasy creature park ?👀`}
        </p>
        <p>
          {`  In this magical world, you can collect and care for legendary beings while attracting amazed visitors!`}
        </p>
        <p>{`🌍 Explore the 4 main zones: Fairy, Winged, Mythological, and Shadows. To start, only the Fairy zone is unlocked. Click on it to discover your first enclosures and welcome your creatures!`}</p>
        <p>{`💰 Your adventure begins with 200 Moons in your wallet. Make the right choices to develop your park!`}</p>
        <p>{`👥 Each time you buy a creature, 1 visitor will enter and pay an entrance fee for 4 hours and a new visitor take his place with a entrance fee also, etc.`}</p>
        <p>{`⚠️ Take care of your creatures! Don't forget to keep the magic alive to earn money from them every minute.`}</p>
        <p className='mt-2 text-center font-extrabold'>{`✨ It's your turn to play—build the park of your dreams! ✨`}</p>
      </div>
      <div className='self-end'>
        <ReturnHome />
      </div>
    </div>
  );
}
