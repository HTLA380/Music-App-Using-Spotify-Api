'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { playlistState, playlistIdState } from '@/atoms/playlistAtom';
import { useRecoilValue } from 'recoil';
import { useRecoilState } from 'recoil';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];

const PageLayout = () => {
  const { data: session, status } = useSession();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  return (
    <div className='flex-grow text-white'>
      <header className='absolute top-5 right-8'>
        <div className='flex items-center p-1 pr-2 space-x-3 bg-red-300 rounded-full cursor-pointer opacity-90 hover:opacity-80'>
          <img className='w-10 h-10 rounded-full' src={session?.user.image} alt='' />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className='w-5 h-5' />
        </div>
      </header>

      <section className={`flex items-end space-x-7 bg-gradient-to-b h-80 text-white p-8 to-black ${color}`}>
        <h1>Hello</h1>
      </section>
    </div>
  );
};

export default PageLayout;
