import { useEffect, useState } from 'react';

import ButtonBlue from './button-blue';
import Input from './input';
import Loader from './loader';

type EditPasswordProps = {
  readonly navigate: () => void;
};

export default function EditPassword({ navigate }: EditPasswordProps) {
  const [actualPassword, setActualPassword] = useState('');
  const [isConformActualPassword, setIsConformActualPassword] = useState(false);
  const [isTouchedActualPassword, setIsTouchedActualPassword] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [isConformNewPassword, setIsConformNewPassword] = useState(false);
  const [isTouchedNewPassword, setIsTouchedNewPassword] = useState(false);

  const isPassWordValid = (value: string) => {
    // At least 6 characters, and 1 special character or 1 digit
    const regex = /^(?=.*[\d\W]).{6,}$/;
    return value.trim() !== '' && regex.test(value);
  };

  const [confirmPassword, setConfirmPassword] = useState('');
  const [isConformConfirmPassword, setIsConformConfirmPassword] =
    useState(false);
  const [isTouchedConfirmPassword, setIsTouchedConfirmPassword] =
    useState(false);

  const [isModified, setIsModified] = useState(false);

  const [messErrorModification, setMessErrorModification] = useState('');

  const isFormValid = () => {
    return (
      isConformActualPassword &&
      isConformNewPassword &&
      isConformConfirmPassword
    );
  };

  useEffect(() => {
    if (isModified) {
      setTimeout(() => {
        navigate();
      }, 2000); // 2 secondes
    }
  }, [isModified, navigate]);

  const editPassword = async () => {
    const res = await fetch(`/api/auth/edit-password`, {
      method: 'POST',
      body: JSON.stringify({
        actualPassword,
        newPassword,
        confirmPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    //typage data
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

  return isModified ? (
    <p className='text-secondary-blue z-3 mt-20 mb-10 flex flex-col items-center justify-center gap-10 px-10 text-center text-sm italic md:text-base'>
      {'Successful registration ✅! '}
      <br /> {'Redirection to LOGIN...!'}
      <Loader />
    </p>
  ) : (
    <div className='relative w-full overflow-y-auto md:min-w-[90%]'>
      <div className='flex flex-col items-center justify-center'>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            if (isFormValid()) {
              await editPassword();
            }
          }}
          className='flex flex-col items-center gap-4'
        >
          <h1 className='mb-4 text-lg font-semibold'>{'EDIT PASSWORD'}</h1>

          {/* Actual Password */}
          <div>
            <Input
              bgColor='bg-primary-blue'
              borderColor='border-secondary-blue'
              type='password'
              placeholder='Actual Password'
              value={actualPassword}
              onChangeInput={(value) => {
                setActualPassword(value);

                if (value.trim() === '') {
                  setIsConformActualPassword(true);
                  setIsTouchedActualPassword(false);
                } else {
                  setIsConformActualPassword(isPassWordValid(value));
                  setIsTouchedActualPassword(true);
                }
              }}
              onBlur={() => {
                setIsTouchedActualPassword(true);
                setIsConformActualPassword(isPassWordValid(actualPassword));
              }}
            />
            {!isConformActualPassword && isTouchedActualPassword ? (
              <p className='text-sm text-red-500 italic'>
                {'Min 6 char., 1 special char. or 1 digit!'}
              </p>
            ) : null}
          </div>

          {/* New Password */}
          <div>
            <Input
              bgColor='bg-primary-blue'
              borderColor='border-secondary-blue'
              type='password'
              placeholder='New Password'
              value={newPassword}
              onChangeInput={(value) => {
                setNewPassword(value);

                if (value.trim() === '') {
                  setIsConformNewPassword(true);
                  setIsTouchedNewPassword(false);
                } else {
                  setIsConformNewPassword(isPassWordValid(value));
                  setIsTouchedNewPassword(true);
                }
              }}
              onBlur={() => {
                setIsTouchedNewPassword(true);
                setIsConformNewPassword(isPassWordValid(newPassword));
              }}
            />
            {!isConformNewPassword && isTouchedNewPassword ? (
              <p className='text-sm text-red-500 italic'>
                {'Min 6 char., 1 special char. or 1 digit!'}
              </p>
            ) : null}
          </div>

          {/* New Password */}
          <div>
            <Input
              bgColor='bg-primary-blue'
              borderColor='border-secondary-blue'
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChangeInput={(value) => {
                setConfirmPassword(value);

                if (value.trim() === '') {
                  setIsConformConfirmPassword(true);
                  setIsTouchedConfirmPassword(false);
                } else {
                  setIsTouchedConfirmPassword(true);
                  setIsConformConfirmPassword(value === newPassword);
                }
              }}
              onBlur={() => {
                setIsTouchedConfirmPassword(true);
                setIsConformConfirmPassword(confirmPassword === newPassword);
              }}
            />
            {!isConformConfirmPassword && isTouchedConfirmPassword ? (
              <p className='text-sm text-red-500 italic'>
                {'Min 6 char., 1 special char. or 1 digit!'}
              </p>
            ) : null}
          </div>

          <ButtonBlue bg='bg-primary-blue' type='submit'>
            {'EDIT'}
          </ButtonBlue>
          <p className='mt-1 text-sm text-red-500 italic'>
            {messErrorModification}
          </p>
        </form>
      </div>
    </div>
  );
}
