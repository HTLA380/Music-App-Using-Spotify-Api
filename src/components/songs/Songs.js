'use client';

import { playlistState } from '@/atoms/playlistAtom';
import React from 'react';
import { useRecoilValue } from 'recoil';
import Song from './Song';

const Songs = () => {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className='flex flex-col px-8 space-y-1 text-white pb-28'>
      {playlist?.tracks.items.map((track, i) => {
        return <Song key={track.track.id + i} track={track} order={i} />;
      })}
    </div>
  );
};

export default Songs;
