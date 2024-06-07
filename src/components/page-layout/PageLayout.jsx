'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { playlistState, playlistIdState } from '@/atoms/playlistAtom';
import { useRecoilValue } from 'recoil';
import { useRecoilState } from 'recoil';
import useSpotify from '@/hooks/useSpotify';
import Songs from '../songs/Songs';

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
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((error) => console.log('Something went wrong', error));
  }, [spotifyApi, playlistId]);

  return (
    <div className='flex-grow h-screen overflow-y-scroll text-white scrollbar-hide'>
      <header className='absolute top-5 right-8'>
        <div
          onClick={signOut}
          className='flex items-center p-1 pr-2 space-x-3 bg-black rounded-full cursor-pointer opacity-90 hover:opacity-80'>
          <img className='w-10 h-10 rounded-full' src={session?.user.image} alt='' />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className='w-5 h-5' />
        </div>
      </header>

      <section className={`flex items-end space-x-7 bg-gradient-to-b h-80 text-white p-8 to-black ${color}`}>
        <img className='shadow-2xl h-44 w-44' src={playlist?.images?.[0]?.url} alt='' />
        <div>
          <p>PLAYLIST</p>
          <h1 className='text-2xl font-bold md:text-3xl lg:text-5xl'>{playlist?.name}</h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
};

export default PageLayout;
