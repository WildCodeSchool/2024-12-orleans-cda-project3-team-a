import { useState } from 'react';

type InputProps = {
  readonly type: 'email' | 'password' | 'text';
  readonly placeholder: string;
};

const Input = ({ type, placeholder }: InputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <input
      className='border-secondary-blue bg-primary-blue w-51 rounded border px-2 md:h-11 md:w-86 md:rounded-md md:text-2xl'
      type={type}
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChange}
    />
  );
};

export default Input;
