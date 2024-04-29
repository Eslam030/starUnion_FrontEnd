import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Assuming you're using Redux to store auth state

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = useSelector(state => !!state.auth.token); // Check auth state from Redux

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  

  return children; // If authenticated, show the component that was passed in
}



export default RequireAuth;