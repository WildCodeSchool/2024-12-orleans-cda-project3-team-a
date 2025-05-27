import { useState } from 'react';

import useVisitors from '@/hooks/use-visitors';

export default function PageVisitors() {
  const { visitorsPark } = useVisitors();
  //   const [isExit, setIsExit]=useState(false);
  // console.log(visitors);

  //   console.log(visitorsPark);
  const isExit = (exit_time: Date): boolean => exit_time.getTime() < Date.now();

  return (
    <div className='h-screen overflow-auto'>
      {visitorsPark.map((visitorPark) => {
        return (
          <div
            key={visitorPark.id}
            className='m-5 flex flex-row justify-between gap-3 border-1 border-amber-200'
          >
            <h1>{visitorPark.id}</h1>
            <p>{visitorPark.entry_time.toLocaleString()} </p>
            <p>{visitorPark.exit_time.toLocaleString()} </p>
            {/* <p>{new Date().toLocaleDateString().gettime} </p> */}
            <p>{visitorPark.visitor_id} </p>
            {isExit(new Date(visitorPark.exit_time)) ? (
              <p>{'plus là'}</p>
            ) : (
              <p>{'encore la '}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
