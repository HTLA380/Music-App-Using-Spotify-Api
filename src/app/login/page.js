'use client';

import React, { useEffect, useState } from 'react';
import { getProviders, signIn } from 'next-auth/react';

const Login = () => {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen'>
      <img className='w-48 mb-5' src='/assets/images/spotify.png' />
      {providers &&
        Object.values(providers).map((provider) => (
          <div>
            <button
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
              className='bg-[#18D860] text-white p-5 rounded-lg'>
              Login with {provider.name}
            </button>
          </div>
        ))}
    </div>
  );
};

export default Login;
