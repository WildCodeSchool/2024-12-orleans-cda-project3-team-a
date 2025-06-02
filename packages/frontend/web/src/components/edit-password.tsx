import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useGameInfoContext } from '@/contexts/game-info-context';

import ButtonBlue from './button-blue';
import Input from './input';

export default function EditPassword() {
  const { fetchAll } = useGameInfoContext();

  const [actualPassword, setActualPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [isModified, setIsModified] = useState(false);

  const [messErrorModification, setMessErrorModification] = useState('');

  const [isConformUsername, setIsConformUsername] = useState(false);
  const [isTouchedNewPassword, setIsTouchedNewPassword] = useState(false);

  const [isConformParkName, setIsConformParkName] = useState(false);
  const [isTouchedActualPassword, setIsTouchedActualPassword] = useState(false);

  const [isTouchedconfirmNewPassword, setIsTouchedconfirmNewPassword] =
    useState(false);

  // const isFormatValid = (value: string) => {
  //   // At least 5 characters, no spaces
  //   const regex = /^[a-zA-Z0-9_-]{5,}$/;
  //   return value.trim() !== '' && regex.test(value);
  // };

  const isFormValid = () => {
    return isConformUsername && isConformParkName;
  };

  if (isModified) {
    return <Navigate to='/' />;
  }

  const editPassword = async () => {
    const res = await fetch(`/api/game/park/data-modify`, {
      method: 'POST',
      body: JSON.stringify({
        newPassword,
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
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (isFormValid()) {
            await editPassword();
          }
        }}
        className='mb-4 flex flex-col items-center justify-center'
      >
        <div className='flex flex-col gap-4 p-4'>
          <h1 className='mb-4 text-lg font-semibold'>{'EDIT PASSWORD'}</h1>

          <Input
            bgColor='bg-primary-blue'
            borderColor='border-secondary-blue'
            type='password'
            placeholder='Current password'
            value={actualPassword}
            onChangeInput={(value) => {
              setActualPassword(value);
              // setIsConformParkName(isFormatValid(value));
            }}
            onBlur={() => {
              setIsTouchedActualPassword(true);
            }}
          />

          <Input
            bgColor='bg-primary-blue'
            borderColor='border-secondary-blue'
            type='password'
            placeholder='New password'
            value={newPassword}
            onChangeInput={(value) => {
              setNewPassword(value);
              // setIsConformParkName(isFormatValid(value));
            }}
            onBlur={() => {
              setIsTouchedNewPassword(true);
            }}
          />

          <Input
            bgColor='bg-primary-blue'
            borderColor='border-secondary-blue'
            type='password'
            placeholder='Confirm new password'
            value={confirmNewPassword}
            onChangeInput={(value) => {
              setConfirmNewPassword(value);
              // setIsConformParkName(isFormatValid(value));
            }}
            onBlur={() => {
              setIsTouchedconfirmNewPassword(true);
            }}
          />
        </div>

        <ButtonBlue bg='bg-primary-blue' type='submit'>
          {'EDIT'}
        </ButtonBlue>
        {/* <p className='text-sm text-red-500 italic'>{messErrorModification}</p> */}
      </form>
    </div>
  );
}
