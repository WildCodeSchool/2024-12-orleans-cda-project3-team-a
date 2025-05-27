import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import ButtonBlue from '@/components/button-blue';
import Input from '@/components/input';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const [messErrorRegister, setMessErrorRegister] = useState('');

  const [isConformPseudo, setIsConformPseudo] = useState(false);
  const [isTouchedPseudo, setIsTouchedPseudo] = useState(false);

  const isPseudoValid = (value: string) => {
    return value.trim() !== '' && value.length > 0 && value.length < 25;
  };

  const [isConformPassword1, setIsConformPassword1] = useState(false);
  const [isTouchedPassword1, setIsTouchedPassword1] = useState(false);

  const isPassWordValid1 = (value: string) => {
    // At least 6 characters, and 1 special character or 1 digit
    const regex = /^(?=.*[\d\W]).{6,}$/;
    return value.trim() !== '' && regex.test(value);
  };

  const [isConformPassword2, setIsConformPassword2] = useState(false);
  const [isTouchedPassword2, setIsTouchedPassword2] = useState(false);

  const isPassWordValid2 = (value: string, password: string) => {
    return value === password && value.trim() !== '';
  };

  const isFormValid = () => {
    return (
      isConformPseudo &&
      isConformPassword1 &&
      isConformPassword2 &&
      email.trim() !== ''
    );
  };

  if (isRegistered) {
    return <Navigate to='/' />;
  }

  const signUp = async () => {
    const res = await fetch(`/api/auth/register`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        username,
        password,
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
      alert('Successful registration ✅, log in📝!');
      setIsRegistered(true);
    } else {
      setMessErrorRegister(data.message);
    }
  };

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        if (isFormValid()) {
          await signUp();
        }
      }}
      className='z-3 mt-4 flex flex-col items-center justify-center gap-5 p-4 px-6 text-xs md:px-10 md:text-base'
    >
      <h2 className='text-secondary-blue pl-4 text-xl font-extrabold tracking-[0.6em] md:text-2xl'>
        {'SIGN UP'}
      </h2>

      {/* EMAIL */}
      <Input
        bgColor='bg-primary-blue'
        borderColor='border-secondary-blue'
        type='email'
        placeholder='Email'
        value={email}
        onChangeInput={(value) => {
          setEmail(value);
        }}
      />

      {/* PSEUDO */}
      <div>
        <Input
          bgColor='bg-primary-blue'
          borderColor='border-secondary-blue'
          type='text'
          placeholder='Pseudo'
          value={username}
          onChangeInput={(value) => {
            setUsername(value);
            // if field empty -> no error
            if (value.trim() === '') {
              setIsConformPseudo(true);
              setIsTouchedPseudo(false);
            } else {
              setIsConformPseudo(isPseudoValid(value));
              setIsTouchedPseudo(true);
            }
          }}
          onBlur={() => {
            setIsTouchedPseudo(true); // we are not in the field
            setIsConformPseudo(isPseudoValid(username));
          }}
        />
        {!isConformPseudo && isTouchedPseudo ? (
          <p className='text-sm text-red-500 italic'>
            {'Max 25 characters and not empty!'}
          </p>
        ) : null}
      </div>

      {/* PASSWORD */}
      <div>
        <Input
          bgColor='bg-primary-blue'
          borderColor='border-secondary-blue'
          type='password'
          placeholder='Password'
          value={password}
          onChangeInput={(value) => {
            setPassword(value);

            if (value.trim() === '') {
              setIsConformPassword1(true);
              setIsTouchedPassword1(false);
            } else {
              setIsConformPassword1(isPassWordValid1(value));
              setIsTouchedPassword1(true);
            }
          }}
          onBlur={() => {
            setIsTouchedPassword1(true);
            setIsConformPassword1(isPassWordValid1(password));
          }}
        />
        {!isConformPassword1 && isTouchedPassword1 ? (
          <p className='text-sm text-red-500 italic'>
            {'Min 6 char., 1 special char. or 1 digit!'}
          </p>
        ) : null}
      </div>

      {/* CONFIRM PASSWORD */}
      <div>
        <Input
          bgColor='bg-primary-blue'
          borderColor='border-secondary-blue'
          type='password'
          placeholder='Confirm password'
          value={confirmPassword}
          onChangeInput={(value) => {
            setConfirmPassword(value);

            if (value.trim() === '') {
              setIsConformPassword2(true);
              setIsTouchedPassword2(false);
            } else {
              setIsConformPassword2(isPassWordValid2(value, password));
              setIsTouchedPassword2(true);
            }
          }}
          onBlur={() => {
            setIsTouchedPassword2(true);
            setIsConformPassword2(isPassWordValid2(confirmPassword, password));
          }}
        />
        {!isConformPassword2 && isTouchedPassword2 ? (
          <p className='text-sm text-red-500 italic'>
            {'Passwords does not match'}
          </p>
        ) : null}
      </div>

      <div>
        <ButtonBlue bg='bg-primary-blue' type='submit'>
          {'SIGN UP'}
        </ButtonBlue>

        <p className='text-sm text-red-500 italic'>{messErrorRegister} </p>
      </div>

      <p>
        {'Already have an account ? '}
        <a href='/' className='text-secondary-blue underline'>
          {'Log in here.'}
        </a>
      </p>
    </form>
  );
}
