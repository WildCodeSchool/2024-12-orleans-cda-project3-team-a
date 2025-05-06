type InputProps = {
  readonly bgColor: 'bg-primary-blue' | 'bg-white';
  readonly borderColor: 'border-secondary-blue' | 'border-gray';
  readonly type: 'email' | 'password' | 'text';
  readonly placeholder: string;
  readonly onChangeInput: (value: string) => void;
  readonly value: string;
};

export default function InputBlue({
  bgColor,
  borderColor,
  type,
  placeholder,
  onChangeInput,
  value,
}: InputProps) {
  return (
    <input
      className={`${borderColor} ${bgColor} h-7 w-51 rounded border px-2 focus:border-2 focus:outline-none md:w-74 md:rounded-md`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(event) => {
        onChangeInput(event.target.value);
      }}
    />
  );
}
