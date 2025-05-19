import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonBlue from '@/components/button-blue';
import Input from '@/components/input';
import { useAuth } from '@/contexts/auth-context';

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    //get the response to know if user and password ok
    const res = await fetch(`/api/auth/login`, {
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

    //typage data
    const data = (await res.json()) as {
      ok: boolean;
      user: {
        id: number;
        email: string;
        parkId: number | null;
      };
    };

    //if good user put setisloggedin in true and hasParkId in true and go home
    if (data.ok) {
      auth?.setIsLoggedIn(true);

      if (data.user.parkId !== null) {
        auth?.setHasParkId(true);
      }

      await navigate('/home');
    }
  };

  return (
    //Form to login
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await login();
      }}
      className='z-3 flex flex-col items-center justify-center gap-5 p-4 px-6 text-xs md:px-10 md:text-base'
    >
      <h2 className='text-secondary-blue pl-4 text-xl font-extrabold tracking-[0.6em] md:text-2xl'>
        {'LOG IN'}
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
