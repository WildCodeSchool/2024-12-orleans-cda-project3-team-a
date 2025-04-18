import { type PropsWithChildren, useState } from 'react';

import ButtonBuy from './button-buy';

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
  readonly srcLockedCreature: string;
  readonly nmbrCreature: number;
  readonly name: string;
  readonly positionDeco1: number;
  readonly positionDeco2: number;
}>;

export default function Enclosure({
  bgColor,
  srcImgDeco1,
  srcImgDeco2,
  srcImgCreature,
  price,
  positionDeco1,
  positionDeco2,
  name,
  srcLockedCreature,
  nmbrCreature,
}: EnclosureProps) {
  console.log('positionDeco1:', positionDeco1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lockedCreature, setLockedCreature] = useState(false);
  const handleModale = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div
      className={`flex h-[50vh] w-full flex-col justify-between p-4 ${bgColor}`}
    >
      <img
        style={{ left: `${positionDeco1}px` }}
        className={`relative w-15`}
        src={srcImgDeco1}
        alt=''
      />
      <div
        onClick={handleModale}
        className='relative flex flex-col items-center justify-center gap-2'
      >
        <img
          className='w-30'
          src={lockedCreature ? srcLockedCreature : srcImgCreature}
          alt=''
        />

        <h1 className={` ${lockedCreature ? 'absolute top-10' : 'hidden'} `}>
          {name}
        </h1>

        <ButtonBuy>{lockedCreature ? price : nmbrCreature}</ButtonBuy>
      </div>
      <img
        className={`relative left-${positionDeco2} w-15`}
        src={srcImgDeco2}
        alt=''
      />
    </div>
  );
}

//Manque: pouvoir acheter via le boutons sous le panneaux
//Grisé les creatures quand elles sont inactivent
//la modale pour les nourrires
//

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
