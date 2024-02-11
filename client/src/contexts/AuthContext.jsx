import React, { createContext, useState, useContext, useEffect } from "react";

// Create a context
export const AuthContext = createContext();

// Function to check if user is logged in
const checkLoggedIn = () => {
  return !!localStorage.getItem('token');
};

// Create a provider that holds the state and function to update the state
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(checkLoggedIn());

  // Update isLoggedIn when localStorage changes
  useEffect(() => {
    window.addEventListener('storage', () => {
      setIsLoggedIn(checkLoggedIn());
    });

    // Cleanup event listener
    return () => {
      window.removeEventListener('storage', () => {
        setIsLoggedIn(checkLoggedIn());
      });
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook that lets child components access the auth context
export const useAuth = () => useContext(AuthContext);
