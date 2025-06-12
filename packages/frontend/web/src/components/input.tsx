type InputProps = {
  readonly bgColor: 'bg-primary-blue' | 'bg-white';
  readonly borderColor: 'border-secondary-blue' | 'border-gray';
  readonly type: 'email' | 'password' | 'text';
  readonly placeholder: string;
  readonly onChangeInput: (value: string) => void;
  readonly onBlur?: (value: string) => void;
  readonly value: string;
};

export default function Input({
  bgColor,
  borderColor,
  type,
  placeholder,
  onChangeInput,
  value,
  onBlur,
}: InputProps) {
  return (
    <input
      className={`${borderColor} ${bgColor} h-7 w-50 rounded border px-2 focus:border-2 focus:outline-none md:w-70 md:rounded-md`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(event) => {
        onChangeInput(event.target.value);
      }}
      onBlur={(event) => {
        if (onBlur) {
          onBlur(event.target.value);
        }
      }}
    />
  );
}
