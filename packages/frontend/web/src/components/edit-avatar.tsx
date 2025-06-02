import { useState } from 'react';

import { useGameInfoContext } from '@/contexts/game-info-context';

import ButtonBlue from './button-blue';

type EditAvatarProps = {
  readonly onSave: (avatar: { id: number; src_image: string }) => void;
};

export default function EditAvatar({ onSave }: EditAvatarProps) {
  const { avatars, userAvatar } = useGameInfoContext();

  const initialSelectedIndex = avatars.findIndex(
    (avatar) => avatar.src_image === userAvatar,
  );
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(
    initialSelectedIndex >= 0 ? initialSelectedIndex : null,
  );

  const handleAvatarClick = (index: number) => {
    setSelectedAvatar(index);
  };

  const handleSaveClick = () => {
    if (selectedAvatar !== null) {
      const avatarToSave = avatars[selectedAvatar];
      onSave(avatarToSave);
    }
  };

  return (
    <div className='relative w-full overflow-y-auto md:min-w-[90%]'>
      <div className='flex flex-col items-center gap-4 p-4'>
        <h1 className='text-lg font-semibold'>{'EDIT AVATAR'}</h1>
        <div className='flex flex-wrap justify-center gap-8 md:w-3/4'>
          {avatars.map((avatar, index) => {
            const isSelected = selectedAvatar === index;
            const isCurrentUserAvatar = avatar.src_image === userAvatar;

            const isOrangeBorder =
              selectedAvatar !== null ? isSelected : isCurrentUserAvatar;

            return (
              <div
                key={avatar.id}
                onClick={() => {
                  handleAvatarClick(index);
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
          onClick={handleSaveClick}
        >
          {'EDIT'}
        </ButtonBlue>
      </div>
    </div>
  );
}
