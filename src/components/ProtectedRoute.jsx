import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ProtectedRoute component restricts access to authenticated users only
const ProtectedRoute = ({ children }) => {
  // Get current user and loading state from auth context
  const { currentUser, loading } = useAuth();

  // Show a loading spinner while authentication state is being determined
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login page
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the protected children components
  return children;
};

export default ProtectedRoute;