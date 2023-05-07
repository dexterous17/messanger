import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@blueprintjs/core';

function SignOutButton({ socket }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    socket.disconnect();
    navigate('/login');
  };



  return (
    <Button onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default SignOutButton;
