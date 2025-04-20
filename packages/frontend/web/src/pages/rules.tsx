import ReturnHome from '@/components/return-home';

export default function tRules() {
  return (
    <div className='text-secondary-blue z-3 flex flex-col items-center justify-center p-2'>
      <p className='mt-6 p-4 text-xl font-extrabold tracking-[0.6em] md:mt-14 md:text-2xl'>
        {'RULES'}
      </p>
      <div>
        <p>
          {`🎉 Welcome to the adventure! 🎉 Ready to manage the most incredible fantasy creature park ?
 In this magical world, you can collect and care for legendary beings while attracting amazed visitors!`}
        </p>
        <p>{`🌍 Explore the 4 main zones: Fairy, Winged, Mythological, and Shadows. To start, only the Fairy zone is unlocked. Click on it to discover your first enclosures and welcome your creatures!`}</p>
        <p>{`💰 Your adventure begins with 500 Moons in your wallet. Make the right choices to develop your park!`}</p>
        <p>{`👥 Attract visitors and make your park thrive: The first creature purchased in a zone attracts 2 visitors who will pay their entrance fee to admire your wonders. Each additional creature brings 1 more visitor.`}</p>
        <p>{`⚠️ Take care of your creatures! A fantasy park takes work! Don't forget to keep the magic alive, or they'll become inactive, scaring away visitors… reducing your earnings!`}</p>
        <p>{`✨ It's your turn to play—build the park of your dreams! ✨`}</p>
      </div>
      <div className='self-end'>
        <ReturnHome />
      </div>
    </div>
  );
}
