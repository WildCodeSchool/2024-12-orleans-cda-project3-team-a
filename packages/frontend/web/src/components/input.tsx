import { useState } from 'react';

type InputProps = {
  readonly type: 'email' | 'password' | 'text';
  readonly placeholder: string;
};

export default function Input({ type, placeholder }: InputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <input
      className='border-secondary-blue bg-primary-blue focus:border-secondary-blue h-7 w-51 rounded border px-2 focus:border-2 focus:outline-none md:w-74 md:rounded-md'
      type={type}
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
    />
  );
}
