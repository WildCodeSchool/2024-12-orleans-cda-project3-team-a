import type { PropsWithChildren } from 'react';

type EnclosureProps = PropsWithChildren<{
  readonly bgColor:
    | 'bg-fairy-blue'
    | 'bg-fairy-green'
    | 'bg-winged-red'
    | 'bg-winged-yellow'
    | 'bg-mythologic-beige'
    | 'bg-shadow-purple'
    | 'bg-shadow-green';
  readonly srcImgDeco1: string;
  readonly srcImgDeco2: string;
  readonly srcImgCreature: string;
  readonly price: number;
  readonly srcLocked: string;
  readonly nmbrCreature: number;
  readonly name: string;
}>;

export default function Enclosure({
  bgColor,
  srcImgDeco1,
  srcImgDeco2,
  srcImgCreature,
  price,
  srcLocked,
  nmbrCreature,
  name,
}: EnclosureProps) {
  return (
    <div
      className={`relative grid h-[50vh] w-[959px] grid-cols-3 grid-rows-3 place-items-center ${bgColor}`}
    >
      <div className='col-start-1 row-start-1'>
        <img className='w-15' src={srcImgDeco1} alt='' />
      </div>
      <div className='col-start-2 row-start-2'>
        <img className='w-30' src={srcImgCreature} alt='' />
      </div>
      <div className='col-start-2 row-start-3 mb-30'>
        <button
          type='button'
          className='h-10 w-20 cursor-pointer rounded-lg bg-gray-300 text-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)] active:shadow-none'
        >
          {price}
        </button>
      </div>
      <div className='col-start-3 row-start-3'>
        <img className='w-15' src={srcImgDeco2} alt='' />
      </div>
    </div>
  );
}

// function buy() {
//   if (wallet >= creature.price) {
//     wallet -= creature.price;
//     creature.unlocked = true;
//   } else {
//     alert("Pas assez d'argent !");
//   }
// return (
{
  /* <div className={`relative grid h-[50vh] w-[959px] grid-cols-3 grid-rows-3 place-items-center ${bgColor}`}>
  <div className="row-start-1 col-start-1">
    <img className="w-15" src={srcImgDeco1} alt="" />
  </div>

  <div className="row-start-2 col-start-2">
    <img className="w-30" src={nmbrCreature>0 ? srcImgCreature : srcLocked} alt="" />
  </div>

  <div className="row-start-2 col-start-2 mt-[-15px]">
    {!unlocked && (
      <button
        onClick={buy}
        className="cursor-pointer shadow-[0px_4px_4px_rgba(0,0,0,0.25)] active:shadow-none bg-gray-300 w-20 h-10 rounded-lg text-center"
      >
        {locked ? price : nmbrCreature}
      </button>
    )}
  </div>

  <div className="row-start-3 col-start-3">
    <img className="w-15" src={srcImgDeco2} alt="" />
  </div>
</div>
);
} */
}

// locked ? srcLocked :
