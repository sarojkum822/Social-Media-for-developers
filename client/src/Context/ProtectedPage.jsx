import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from './UserContext';
import LoadingComponent from '../Pages/Loading.jsx'; // Import your loading component here

const ProtectedPage = ({ children }) => {
  const { isAuthenticated } = useContext(UserContext);
  const [delayedNavigation, setDelayedNavigation] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedNavigation(true);
    }, 1000); // Delay navigation for 2 seconds

    // Set loading to false after the delay
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []); // Run this effect only once when the component mounts

  if (loading) {
    return <LoadingComponent />; // Render loading component
  }

  if (!isAuthenticated && !delayedNavigation) {
    return null; // Render nothing while waiting for the delay
  }

  if (!isAuthenticated && delayedNavigation) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedPage;
