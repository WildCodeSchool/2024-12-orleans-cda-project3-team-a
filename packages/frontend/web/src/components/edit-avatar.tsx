import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useGameInfoContext } from '@/contexts/game-info-context';

import ButtonBlue from './button-blue';

export default function EditAvatar() {
  const { fetchAll, avatars, userAvatar } = useGameInfoContext();

  const [isModified, setIsModified] = useState(false);

  // Initialise le selectedAvatar en fonction de l’avatar utilisateur
  const initialSelectedIndex = avatars.findIndex(
    (a) => a.src_image === userAvatar,
  );
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(
    initialSelectedIndex >= 0 ? initialSelectedIndex : null,
  );

  if (isModified) {
    return <Navigate to='/' />;
  }

  const handleAvatarClick = (index: number) => {
    setSelectedAvatar(index);
  };

  const editAvatar = async () => {
    if (selectedAvatar === null) {
      alert('Veuillez sélectionner un avatar.');
      return;
    }

    const selectedAvatarId = avatars[selectedAvatar].id;

    const res = await fetch(`/api/game/park/data-modify`, {
      method: 'POST',
      body: JSON.stringify({
        selectedAvatarId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (data.ok === true) {
      await fetchAll();
      alert('Modification réussie ✅');
      setIsModified(true);
    } else {
      alert('Échec de la modification');
    }
  };

  return (
    <div className='relative mb-4 w-full overflow-y-auto md:min-w-[90%]'>
      <div className='flex flex-col items-center gap-4 p-4'>
        <h1 className='text-lg font-semibold'>{'EDIT AVATAR'}</h1>
        <div className='flex flex-wrap justify-center gap-8 md:w-3/4'>
          {avatars.map((avatar, index) => {
            const isSelected = selectedAvatar === index;
            const isCurrentUserAvatar = avatar.src_image === userAvatar;

            return (
              <div
                key={avatar.id}
                onClick={() => {
                  handleAvatarClick(index);
                }}
                className={`w-18 cursor-pointer rounded-full border-3 bg-white/50 transition duration-200 ${
                  isSelected || isCurrentUserAvatar
                    ? 'border-[#EF8300]'
                    : 'border-gray-400'
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

      <div onClick={editAvatar}>
        <ButtonBlue bg='bg-primary-blue' type='submit'>
          {'EDIT'}
        </ButtonBlue>
      </div>
    </div>
  );
}
