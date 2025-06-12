import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/auth-context';
import { useGameInfoContext } from '@/contexts/game-info-context';

import profileIcon from '../assets/images/icons-buttons/profile.png';
import BgMenu from './bg-menu';
import ButtonBlue from './button-blue';
import CloseWindow from './close-window';
import EditAvatar from './edit-avatar';
import EditPassword from './edit-password';
import Input from './input';
import Loader from './loader';

type EditProfileProps = {
  readonly closeEditProfile: () => void;
};

export default function EditProfile({ closeEditProfile }: EditProfileProps) {
  const [modalView, setModalView] = useState<'profile' | 'password' | 'avatar'>(
    'profile',
  );

  const { parkName } = useGameInfoContext();
  const { user, refetchUser } = useAuth();

  const [newUsername, setNewUsername] = useState('');
  const [newParkName, setNewParkName] = useState('');

  const [isModified, setIsModified] = useState(false);

  const [messErrorModification, setMessErrorModification] = useState('');

  const [isConformUsername, setIsConformUsername] = useState(false);
  const [isTouchedUsername, setIsTouchedUsername] = useState(false);

  const [isConformParkName, setIsConformParkName] = useState(false);
  const [isTouchedParkName, setIsTouchedParkName] = useState(false);

  const toPassword = () => {
    setModalView('password');
  };
  const toAvatar = () => {
    setModalView('avatar');
  };
  const toProfile = () => {
    setModalView('profile');
  };

  const isFormatValid = (value: string) => {
    // At least 6 characters
    const regex = /^.{6,}$/;
    return value.trim() !== '' && regex.test(value);
  };

  const isFormValid = () => {
    return (
      (isConformUsername && isConformParkName) ||
      isConformUsername ||
      isConformParkName
    );
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isModified) {
      setTimeout(() => {
        void navigate('/');
      }, 2000); // 2 secondes
    }
  }, [isModified, navigate]);

  const editMyData = async () => {
    const res = await fetch(`/api/game/park/`, {
      method: 'PATCH',
      body: JSON.stringify({
        newUsername,
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
      setIsModified(true);
    } else {
      setMessErrorModification(data.message);
    }
  };

  const handleNavigate = async () => {
    await refetchUser();
    toProfile();
  };

  const avatarSource =
    user?.src_image !== null
      ? `/images/avatar/${user?.src_image}`
      : profileIcon;

  return isModified ? (
    <BgMenu>
      <div className='top-6 mb-5 flex flex-col items-center justify-center'>
        <p className='text-secondary-blue z-3 mt-20 mb-10 flex flex-col items-center justify-center gap-10 px-10 text-center text-sm italic md:text-base'>
          {'Successful modification ✅! '}
        </p>
        <Loader />
      </div>
    </BgMenu>
  ) : (
    <div className='relative top-6 w-[80%] overflow-y-auto md:min-w-[80%]'>
      <BgMenu>
        <div className='absolute top-0 right-0 m-3'>
          <CloseWindow onClick={closeEditProfile} />
        </div>

        {modalView === 'profile' && (
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              if (isFormValid()) {
                await editMyData();
              }
            }}
            className='flex flex-col items-center justify-center'
          >
            {/* EDIT PROFILE */}
            <h1 className='mb-4 text-lg font-semibold'>{'EDIT MY PROFILE'}</h1>

            <div className='flex flex-col gap-4 p-4 md:grid md:grid-cols-2 md:grid-rows-3'>
              <div className='row-span-2 flex items-center justify-center md:order-1'>
                <img
                  className='w-30 md:w-40'
                  src={avatarSource}
                  alt='profile picture'
                />
              </div>

              <div className='flex items-center justify-center md:order-4'>
                <button
                  type='button'
                  onClick={toAvatar}
                  className='cursor-pointer text-sm font-semibold text-[#EF8300] underline md:text-base'
                >
                  {'Edit avatar'}
                </button>
              </div>

              {/* Username */}
              <div className='flex flex-col items-center justify-center md:order-2'>
                <Input
                  bgColor='bg-primary-blue'
                  borderColor='border-secondary-blue'
                  type='text'
                  placeholder={`Username : ${user?.username}`}
                  value={newUsername}
                  onChangeInput={(value) => {
                    setNewUsername(value);
                    setIsConformUsername(isFormatValid(value));
                  }}
                  onBlur={() => {
                    setIsTouchedUsername(true);
                  }}
                />
                {!isConformUsername && isTouchedUsername ? (
                  <p className='text-sm text-red-500 italic'>
                    {'At least 6 chars.'}
                  </p>
                ) : null}
              </div>

              {/* Park name */}
              <div className='flex flex-col items-center justify-center md:order-3'>
                <Input
                  bgColor='bg-primary-blue'
                  borderColor='border-secondary-blue'
                  type='text'
                  placeholder={`Park name : ${parkName}`}
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
                    {'At least 6 chars.'}
                  </p>
                ) : null}
              </div>

              <div className='flex items-center justify-center md:order-5'>
                <button
                  type='button'
                  onClick={toPassword}
                  className='cursor-pointer text-sm font-semibold underline md:text-base'
                >
                  {'Edit password'}
                </button>
              </div>
            </div>

            <ButtonBlue bg='bg-primary-blue' type='submit'>
              {'EDIT'}
            </ButtonBlue>
            <p className='text-sm text-red-500 italic'>
              {messErrorModification}
            </p>
          </form>
        )}

        {/* show edit password view */}
        {modalView === 'password' && (
          <div className='flex flex-col items-center justify-center p-4'>
            <EditPassword navigate={toProfile} />
            <ButtonBlue bg='bg-tertiary-blue' type='button' onClick={toProfile}>
              {'BACK'}
            </ButtonBlue>
          </div>
        )}

        {/* show edit avatar view */}
        {modalView === 'avatar' && (
          <div className='flex flex-col items-center justify-center p-4'>
            <EditAvatar navigate={handleNavigate} />
            <ButtonBlue bg='bg-tertiary-blue' type='button' onClick={toProfile}>
              {'BACK'}
            </ButtonBlue>
          </div>
        )}
      </BgMenu>
    </div>
  );
}
