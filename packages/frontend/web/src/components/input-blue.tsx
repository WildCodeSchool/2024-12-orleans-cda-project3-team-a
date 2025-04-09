import type { ChangeEvent } from 'react';

type InputProps = {
  readonly type: 'email' | 'password' | 'text';
  readonly placeholder: string;
  readonly onChange: (value: string) => void;
  readonly value: string;
};

export default function Input({
  type,
  placeholder,
  onChange,
  value,
}: InputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <input
      className='border-secondary-blue bg-primary-blue focus:border-secondary-blue h-7 w-51 rounded border px-2 focus:border-2 focus:outline-none md:w-74 md:rounded-md'
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
}
