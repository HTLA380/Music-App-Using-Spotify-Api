import PageLayout from '@/components/page-layout/PageLayout';
import Sidebar from '@/components/sidebar/Sidebar';
import React from 'react';

const layout = async ({ children }) => {
  return (
    <main className='flex'>
      <Sidebar />
      <PageLayout>{children}</PageLayout>
    </main>
  );
};

export default layout;
