import React, { useState } from 'react';
import Index from '../components/home';
import Settings from '@/components/settings';
import { useContext } from 'react';
import { GlobalContext } from '@/context/GlobalContext';
export default function Home() {
  const { activePage } = useContext(GlobalContext);
  return (
    <>
      {activePage === 'index' && <Index />}
      {activePage === 'settings' && <Settings />}
    </>
  );
}
