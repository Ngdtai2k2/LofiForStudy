import React, { useEffect } from 'react';

export default function ForgetPassword() {
  useEffect(() => {
    document.title = 'Forget password';
  }, []);
  return <div>ForgetPassword</div>;
}
