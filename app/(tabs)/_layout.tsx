import { Stack } from 'expo-router';

import { Navbar } from '@/components/Navbar'; // Adjust the path

export default function Layout() {
  return (
    <>
      <Navbar />
      <Stack />
    </>
  );
}
