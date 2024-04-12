import React, { useEffect } from 'react';
import NavigationBar from './components/NavigationBar';

export default function Admin() {
  useEffect(() => {
    document.title = 'Admin';
  }, []);
  return (
    <>
      <NavigationBar />
      <div>Admin</div>
    </>
  );
}
