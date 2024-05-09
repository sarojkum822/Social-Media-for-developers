import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from './UserContext';

const GetUser = ({ children }) => {
  const { isAuthenticated} = useContext(UserContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
 



  return <>{children}</>;
};

export default GetUser;
