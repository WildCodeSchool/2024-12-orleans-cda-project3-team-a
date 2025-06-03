import { useState } from 'react';

import { useGameInfoContext } from '@/contexts/game-info-context';

import ButtonBlue from './button-blue';

type EditAvatarProps = {
  readonly navigate: () => void;
};

export default function EditAvatar({ navigate }: EditAvatarProps) {
  const { avatars, userAvatar } = useGameInfoContext();
  // console.log(avatars);

  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(() => {
    const initialAvatar = avatars.find(
      (avatar) => avatar.src_image === userAvatar,
    );
    return initialAvatar ? initialAvatar.id : null;
  });

  const [messErrorModification, setMessErrorModification] = useState('');

  const handleAvatarClick = (id: number) => {
    setSelectedAvatar(id);
  };

  const editMyData = async () => {
    const res = await fetch(`/api/game/park/data-modify`, {
      method: 'POST',
      body: JSON.stringify({
        selectedAvatar,
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
      alert('Successful modification ✅');
    } else {
      setMessErrorModification(data.message);
    }
  };

  const handleNavigationClick = async () => {
    // console.log('selected avatar id : ', selectedAvatar);
    await editMyData();
    navigate();
  };

  return (
    <div className='relative w-full overflow-y-auto md:min-w-[90%]'>
      <div className='flex flex-col items-center gap-4 p-4'>
        <h1 className='text-lg font-semibold'>{'EDIT AVATAR'}</h1>
        <div className='flex flex-wrap justify-center gap-8 md:w-3/4'>
          {avatars.map((avatar, index) => {
            const isSelected = selectedAvatar === avatar.id;
            const isCurrentUserAvatar = avatar.src_image === userAvatar;

            const isOrangeBorder =
              selectedAvatar !== null ? isSelected : isCurrentUserAvatar;

            return (
              <div
                key={avatar.id}
                onClick={() => {
                  handleAvatarClick(avatar.id);
                }}
                className={`w-18 cursor-pointer rounded-full border-3 bg-white/50 ${
                  isOrangeBorder ? 'border-[#EF8300]' : 'border-gray-400'
                }`}
              >
                <img
                  src={`/images/avatar/${avatar.src_image}`}
                  alt={avatar.src_image || `avatar-${index}`}
                  className='rounded-full'
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className='mb-4'>
        <ButtonBlue
          bg='bg-primary-blue'
          type='button'
          onClick={handleNavigationClick}
        >
          {'EDIT'}
        </ButtonBlue>
        <p className='text-sm text-red-500 italic'>{messErrorModification}</p>
      </div>
    </div>
  );
}
