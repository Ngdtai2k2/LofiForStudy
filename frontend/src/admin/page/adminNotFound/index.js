import React, { useEffect } from 'react';
import NavigationBar from '../../components/NavigationBar';

import notFound from '../../../assets/images/notfound.gif';
import './styles.css';

export default function AdminNotFound() {
  useEffect(() => {
    document.title = 'Not found!!!';
  }, []);
  return (
    <>
      <NavigationBar />
      <div className="background-image">
        <img src={notFound} alt="background 404" className="img-fluid" />
      </div>
    </>
  );
}
