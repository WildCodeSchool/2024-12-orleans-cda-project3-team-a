import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonBlue from '@/components/button-blue';
import InputBlue from '@/components/input-blue';

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const login = async () => {
    console.log(email, password);
    console.log('API_URL:', API_URL);

    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (data.message === 'User logged in!') {
        console.log('Redirection vers la page d\'accueil');
        navigate('/');
    }

    console.log(data);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        login();
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
        type='password'
        placeholder='Password'
        value={password}
        onChangeInput={(value) => {
          setPassword(value);
        }}
      />

      <ButtonBlue bg='bg-primary-blue' type='submit'>
        LOG IN
      </ButtonBlue>
    </form>
  );
}
