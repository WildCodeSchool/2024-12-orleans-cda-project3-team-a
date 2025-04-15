import { useState } from 'react';

import Enclosure from '@/components/enclosure';
import Input from '@/components/input-blue';
import Loader from '@/components/loader';
import ReturnHome from '@/components/return-home';

import boat from '../assets/images/fairy-zone/boat.png';
import elf from '../assets/images/fairy-zone/elf.png';
import iceCream from '../assets/images/fairy-zone/ice-cream-shop.png';
import locked from '../assets/images/fairy-zone/sign.png';

export default function Test() {
  const [email, setEmail] = useState('test');

  return (
    <div className='grid grid-cols-2'>
      {/* <ReturnHome />
      <Input
        type='email'
        placeholder='Votre email'
        value={email}
        onChangeInput={setEmail}
      />
      {email}
      <p>{'PAGE TEST A SUPPRIMER PLUS TARD'}</p>
      <p className='text-2xl'>{' Laisse courrir ton imagination 🦅'}</p>
      <Loader /> */}
      <Enclosure
        bgColor='bg-fairy-blue'
        srcImgDeco1={boat}
        srcImgDeco2={iceCream}
        srcImgCreature={elf}
        price={1000}
        srcLocked={locked}
        nmbrCreature={1}
        name={elf}
      />
      <Enclosure
        bgColor='bg-fairy-green'
        srcImgDeco1={boat}
        srcImgDeco2={iceCream}
        srcImgCreature={locked}
        price={200}
        srcLocked={locked}
        nmbrCreature={1}
        name={elf}
      />
      <Enclosure
        bgColor='bg-fairy-green'
        srcImgDeco1={boat}
        srcImgDeco2={iceCream}
        srcImgCreature={elf}
        price={200}
        srcLocked={locked}
        nmbrCreature={2}
        name={elf}
      />
      <Enclosure
        bgColor='bg-fairy-blue'
        srcImgDeco1={boat}
        srcImgDeco2={iceCream}
        srcImgCreature={elf}
        price={300}
        srcLocked={locked}
        nmbrCreature={1}
        name={elf}
      />
    </div>
  );
}
