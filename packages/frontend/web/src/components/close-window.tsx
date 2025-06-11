import close from '../assets/images/icons-buttons/close.png';

type CloseWindowProps = {
  readonly onClick: () => void;
};

export default function CloseWindow({ onClick }: CloseWindowProps) {
  return (
    <button
      type='button'
      className='bg-secondary-gray flex h-8 w-8 cursor-pointer items-center justify-center rounded shadow-[0px_4px_4px_rgba(0,0,0,0.25)] active:shadow-none md:h-9 md:w-9 md:rounded-md'
      onClick={onClick}
    >
      <img src={close} alt='close' className='w-4 md:w-5' />
    </button>
  );
}
