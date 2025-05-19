import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import ButtonBlue from '@/components/button-blue';
import Input from '@/components/input';

const API_URL = import.meta.env.VITE_API_URL;

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

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
    };

    if (data.ok) {
      setIsRegistered(true);
    }
  };

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await signUp();
      }}
      className='z-3 mt-4 flex flex-col items-center justify-center gap-5 p-4 px-6 text-xs md:px-10 md:text-base'
    >
      <h2 className='text-secondary-blue pl-4 text-xl font-extrabold tracking-[0.6em] md:text-2xl'>
        {'SIGN UP'}
      </h2>
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

      <Input
        bgColor='bg-primary-blue'
        borderColor='border-secondary-blue'
        type='text'
        placeholder='Pseudo'
        value={username}
        onChangeInput={(value) => {
          setUsername(value);
        }}
      />

      <Input
        bgColor='bg-primary-blue'
        borderColor='border-secondary-blue'
        type='password'
        placeholder='Password'
        value={password}
        onChangeInput={(value) => {
          setPassword(value);
        }}
      />

      <Input
        bgColor='bg-primary-blue'
        borderColor='border-secondary-blue'
        type='password'
        placeholder='Confirm password'
        value={confirmPassword}
        onChangeInput={(value) => {
          setConfirmPassword(value);
        }}
      />

      <ButtonBlue bg='bg-primary-blue' type='submit'>
        {'SIGN UP'}
      </ButtonBlue>

      <p>
        {'Already have an account ? '}
        <a href='/' className='text-secondary-blue underline'>
          {'Log in here.'}
        </a>
      </p>
    </form>
  );
}
