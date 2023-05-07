import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedPage = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('jwtToken') ? true : false;

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to={'/login'} replace={true} />
  );
};

export default ProtectedPage;
