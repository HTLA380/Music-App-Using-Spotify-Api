'use client';

import React, { useEffect, useState } from 'react';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BuildingLibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
  WrenchIcon,
} from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import useSpotify from '@/hooks/useSpotify';

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlayLists] = useState([]);
  const [playlistId, setPlaylistId] = useState(null);

  useEffect(() => {
    console.log(session);
    console.log(spotifyApi);
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlayLists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <aside className='h-screen p-5 overflow-y-scroll text-sm text-gray-500 border-r border-gray-900 scrollbar-hide '>
      <div className='space-y-4'>
        <button onClick={() => signOut()} className='flex items-center space-x-2 hover:text-white'>
          <p>Log out</p>
        </button>
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
          <p className='cursor-pointer hover:text-white' key={playlist.id}>
            {playlist.name}
          </p>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
