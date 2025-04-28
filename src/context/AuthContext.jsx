import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase/config';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap the app and provide auth state
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Store the current user
  const [loading, setLoading] = useState(true); // Track loading state

  // Sign up function using Firebase Auth
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Log in function using Firebase Auth
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Log out function using Firebase Auth
  const logout = () => {
    return signOut(auth);
  };

  // Set up auth state listener on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Clean up the listener on unmount
    return unsubscribe;
  }, []);

  // Value provided to context consumers
  const value = {
    currentUser,
    signup,
    login,
    logout,
    loading
  };

  // Only render children when not loading
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};