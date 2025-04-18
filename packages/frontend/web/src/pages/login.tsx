import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import ButtonBlue from '@/components/button-blue';
import InputBlue from '@/components/input-blue';
import { useAuth } from '@/contexts/auth-context';

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const isLoggedIn = auth?.isLoggedIn;
  const isLoading = auth?.isLoading;

  if (isLoading) {
    return;
  }

  if (isLoggedIn) {
    return <Navigate to='/home' />;
  }

  const login = async () => {
    // console.log(email, password);
    // console.log('API_URL:', API_URL);

    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await res.json();

    if (data.message === 'User logged in!') {
      auth?.setIsLoggedIn(true);

      await navigate('/home');
    }

    // console.log(data);
  };

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await login();
      }}
      className='flex flex-col items-center justify-center gap-5 p-4 px-6 text-xs md:px-10 md:text-base'
    >
      <h2 className='text-secondary-blue pl-4 text-xl font-extrabold tracking-[0.6em] md:text-2xl'>
        {'LOG IN'}
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
        type='password'
        placeholder='Password'
        value={password}
        onChangeInput={(value) => {
          setPassword(value);
        }}
      />

      <ButtonBlue bg='bg-primary-blue' type='submit'>
        {'LOG IN'}
      </ButtonBlue>

      <ButtonBlue bg='bg-tertiary-blue' type='button'>
        <a href='/rules'>{'RULES'}</a>
      </ButtonBlue>

      <p>
        {"Don't have an account ? "}
        <a href='/signup' className='text-secondary-blue underline'>
          {'Sign up here.'}
        </a>
      </p>
    </form>
  );
}
