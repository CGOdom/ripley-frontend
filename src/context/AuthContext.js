// src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // State to hold user information
  const [loading, setLoading] = useState(true); // Loading state to handle async auth checks

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/users/me'); // Call /users/me endpoint
        console.log('Auth Check Response:', response.data); // Debugging log
        if (response.data && response.data.user) {
          setIsAuthenticated(true);
          setUser(response.data.user); // Set user data if authenticated
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Auth Check Error:', error); // Debugging log
        if (error.response && error.response.status === 401) {
          // Not authenticated
          setIsAuthenticated(false);
          setUser(null);
        } else {
          console.error('Unexpected error during auth check:', error);
        }
      } finally {
        setLoading(false); // Set loading to false after auth check
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
