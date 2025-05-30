import { useState } from 'react';

// import { useGameInfoContext } from '@/contexts/game-info-context';
// import useEnclosures from '@/hooks/use-enclos';

import profile from '../assets/images/icons-buttons/profile.png';
import BgMenu from './bg-menu';
import ButtonBlue from './button-blue';
import CloseWindow from './close-window';
import Input from './input';

type EditProfileProps = {
  readonly closeEditProfile: () => void;
};

export default function EditProfile({ closeEditProfile }: EditProfileProps) {
  // const { creaturesEnclos } = useEnclosures();
  // const { unlockedZones: zones } = useGameInfoContext();

  // const [selectedZoneId, setSelectedZoneId] = useState<number>(1);
  const [pseudo, setPseudo] = useState('');
  const [parkName, setParkName] = useState('');

  return (
    <div className='relative w-full overflow-y-auto md:min-w-[90%]'>
      <BgMenu>
        <div className='absolute top-0 right-0 m-3'>
          <CloseWindow onClick={closeEditProfile} />
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='mb-4 text-lg font-semibold'>{'EDIT MY PROFILE'}</h1>

          <div className='flex flex-col gap-4 p-4 md:grid md:grid-cols-2 md:grid-rows-3'>
            <div className='row-span-2 flex items-center justify-center md:order-1'>
              <img
                className='w-30 md:w-40'
                src={profile}
                alt='profile picture'
              />
            </div>

            <div className='flex items-center justify-center md:order-4'>
              <a
                href='/'
                className='text-sm font-semibold text-[#EF8300] underline md:text-base'
              >
                {'Change avatar'}
              </a>
            </div>

            <div className='flex items-center justify-center md:order-2'>
              <Input
                bgColor='bg-primary-blue'
                borderColor='border-secondary-blue'
                type='text'
                placeholder='Pseudo'
                onChangeInput={(value) => {
                  setPseudo(value);
                }}
                value={pseudo}
              />
            </div>

            {/* Cellule 3 : Park Name */}
            <div className='flex items-center justify-center md:order-3'>
              <Input
                bgColor='bg-primary-blue'
                borderColor='border-secondary-blue'
                type='text'
                placeholder='Park Name'
                onChangeInput={(value) => {
                  setParkName(value);
                }}
                value={parkName}
              />
            </div>

            {/* Cellule 5 : Change password */}
            <div className='flex items-center justify-center md:order-5'>
              <a
                href='/'
                className='text-sm font-semibold underline md:text-base'
              >
                {'Change password'}
              </a>
            </div>
          </div>

          <ButtonBlue bg='bg-primary-blue' type='submit'>
            {'EDIT'}
          </ButtonBlue>
        </div>
      </BgMenu>
    </div>
  );
}
