import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import ButtonBlue from '@/components/button-blue';
import InputBlue from '@/components/input-blue';
import { useAuth } from '@/contexts/auth-context';

const API_URL = import.meta.env.VITE_API_URL;

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const auth = useAuth();
  const isLoggedIn = auth?.isLoggedIn;
  if (isLoggedIn === true || isRegistered) {
    return <Navigate to='/' />;
  }
  const signUp = async () => {
    const res = await fetch(`${API_URL}/auth/register`, {
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

    const data = await res.json();

    if (data.ok === true) {
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
      <InputBlue
        type='email'
        placeholder='Email'
        value={email}
        onChangeInput={(value) => {
          setEmail(value);
        }}
      />

      <InputBlue
        type='text'
        placeholder='Pseudo'
        value={username}
        onChangeInput={(value) => {
          setUsername(value);
        }}
      />

      <InputBlue
        type='password'
        placeholder='Password'
        value={password}
        onChangeInput={(value) => {
          setPassword(value);
        }}
      />

      <InputBlue
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
