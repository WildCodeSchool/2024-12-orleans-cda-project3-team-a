import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useGameInfoContext } from '@/contexts/game-info-context';

import profileIcon from '../assets/images/icons-buttons/profile.png';
import BgMenu from './bg-menu';
import ButtonBlue from './button-blue';
import CloseWindow from './close-window';
import Input from './input';

type EditProfileProps = {
  readonly closeEditProfile: () => void;
};

export default function EditProfile({ closeEditProfile }: EditProfileProps) {
  const { parkName, userName, fetchAll } = useGameInfoContext();

  const [newUserName, setNewUserName] = useState('');
  const [newParkName, setNewParkName] = useState('');

  const [isModified, setIsModified] = useState(false);

  const [messErrorModification, setMessErrorModification] = useState('');

  const [isConformUsername, setIsConformUsername] = useState(false);
  const [isTouchedUsername, setIsTouchedUsername] = useState(false);

  const [isConformParkName, setIsConformParkName] = useState(false);
  const [isTouchedParkName, setIsTouchedParkName] = useState(false);

  const isFormatValid = (value: string) => {
    // At least 5 characters, no spaces
    const regex = /^[a-zA-Z0-9_-]{5,}$/;
    return value.trim() !== '' && regex.test(value);
  };

  const isFormValid = () => {
    return isConformUsername && isConformParkName;
  };

  if (isModified) {
    return <Navigate to='/' />;
  }

  const editMyData = async () => {
    const res = await fetch(`/api/game/park/data-modify`, {
      method: 'POST',
      body: JSON.stringify({
        newUserName,
        newParkName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = (await res.json()) as {
      ok: boolean;
      message: string;
    };

    if (data.ok) {
      await fetchAll();
      alert('Successful modification ✅');
      setIsModified(true);
    } else {
      setMessErrorModification(data.message);
    }
  };

  return (
    <div className='relative w-full overflow-y-auto md:min-w-[90%]'>
      <BgMenu>
        <div className='absolute top-0 right-0 m-3'>
          <CloseWindow onClick={closeEditProfile} />
        </div>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            if (isFormValid()) {
              await editMyData();
            }
          }}
          className='flex flex-col items-center justify-center'
        >
          <h1 className='mb-4 text-lg font-semibold'>{'EDIT MY PROFILE'}</h1>

          <div className='flex flex-col gap-4 p-4 md:grid md:grid-cols-2 md:grid-rows-3'>
            <div className='row-span-2 flex items-center justify-center md:order-1'>
              <img
                className='w-30 md:w-40'
                src={profileIcon}
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

            <div className='flex flex-col items-center justify-center md:order-2'>
              <Input
                bgColor='bg-primary-blue'
                borderColor='border-secondary-blue'
                type='text'
                placeholder={userName}
                value={newUserName}
                onChangeInput={(value) => {
                  setNewUserName(value);
                  setIsConformUsername(isFormatValid(value));
                }}
                onBlur={() => {
                  setIsTouchedUsername(true);
                }}
              />
              {!isConformUsername && isTouchedUsername ? (
                <p className='text-sm text-red-500 italic'>
                  {'At least 5 char. without spaces'}
                </p>
              ) : null}
            </div>

            <div className='flex flex-col items-center justify-center md:order-3'>
              <Input
                bgColor='bg-primary-blue'
                borderColor='border-secondary-blue'
                type='text'
                placeholder={parkName}
                value={newParkName}
                onChangeInput={(value) => {
                  setNewParkName(value);
                  setIsConformParkName(isFormatValid(value));
                }}
                onBlur={() => {
                  setIsTouchedParkName(true);
                }}
              />
              {!isConformParkName && isTouchedParkName ? (
                <p className='text-sm text-red-500 italic'>
                  {'At least 5 char. without spaces'}
                </p>
              ) : null}
            </div>

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
          <p className='text-sm text-red-500 italic'>
            {messErrorModification}{' '}
          </p>
        </form>
      </BgMenu>
    </div>
  );
}
