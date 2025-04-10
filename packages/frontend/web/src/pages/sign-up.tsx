import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonBlue from '@/components/button-blue';
import InputBlue from '@/components/input-blue';

const API_URL = import.meta.env.VITE_API_URL;

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const signUp = async () => {
    console.log(email, username, password, confirmPassword);

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

    if (data.message === 'User registered') {
      console.log('Redirection vers la page créer mon park');
      await navigate('/home');
    }

    console.log(data);
  };

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        await signUp();
      }}
      className='flex flex-col items-center justify-center gap-3 p-4'
    >
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
        </a>{' '}
      </p>
    </form>
  );
}
