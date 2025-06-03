import { useState } from 'react';

import ButtonBlue from './button-blue';
import Input from './input';

type EditPasswordProps = {
  readonly onSave: (password: string) => void;
};

export default function EditPassword({ onSave }: EditPasswordProps) {
  const [actualPassword, setActualPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [messErrorModification, setMessErrorModification] = useState('');

  const [isConformUsername, setIsConformUsername] = useState(false);
  const [isTouchedNewPassword, setIsTouchedNewPassword] = useState(false);

  const [isConformParkName, setIsConformParkName] = useState(false);
  const [isTouchedActualPassword, setIsTouchedActualPassword] = useState(false);

  const [isTouchedconfirmNewPassword, setIsTouchedconfirmNewPassword] =
    useState(false);

  const handleSaveClick = () => {
    if (newPassword && newPassword === confirmNewPassword) {
      onSave(newPassword);
      console.log(newPassword);
    } else {
      setMessErrorModification('Passwords do not match or are empty.');
    }
  };

  return (
    <div className='relative w-full overflow-y-auto md:min-w-[90%]'>
      <div className='mb-4 flex flex-col items-center justify-center'>
        <form className='flex flex-col gap-4 p-4'>
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
        </form>

        <ButtonBlue
          bg='bg-primary-blue'
          type='submit'
          onClick={handleSaveClick}
        >
          {'EDIT'}
        </ButtonBlue>
        <p className='mt-1 text-sm text-red-500 italic'>
          {messErrorModification}
        </p>
      </div>
    </div>
  );
}
