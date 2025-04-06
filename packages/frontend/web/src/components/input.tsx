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
    <div>
      <input
        className='border-secondary-blue bg-primary-blue w-85 rounded border px-2 py-1'
        type={type}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
