'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import useSpotify from '@/hooks/useSpotify';
import { playlistIdState } from '@/atoms/playlistAtom';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BuildingLibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from '@heroicons/react/24/outline';

// ================================================

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [playlists, setPlayLists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlayLists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <aside className='h-screen hidden md:inline-flex p-5 sm:max-w-[12rem] lg:max-w-[15rem] overflow-y-scroll text-xs text-gray-500 border-r border-gray-900 lg:text-sm scrollbar-hide '>
      <div className='space-y-4'>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HomeIcon className='w-5 h-5' />
          <p>Home</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <MagnifyingGlassIcon className='w-5 h-5' />
          <p>Search</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <BuildingLibraryIcon className='w-5 h-5' />
          <p>Your Library</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900' />

        <button className='flex items-center space-x-2 hover:text-white'>
          <PlusCircleIcon className='w-5 h-5' />
          <p>Create Playlist</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HeartIcon className='w-5 h-5' />
          <p>Liked Songs</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <RssIcon className='w-5 h-5' />
          <p>Your episodes</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900' />

        {playlists?.map((playlist) => (
          <p onClick={() => setPlaylistId(playlist.id)} className='cursor-pointer hover:text-white' key={playlist.id}>
            {playlist.name}
          </p>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
