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
        const response = await api.get('/users/check-auth');
        console.log('Auth Check Response:', response.data); // Debugging log
        setIsAuthenticated(response.data.isAuthenticated);
        setUser(response.data.user); // Set user data if authenticated
      } catch (error) {
        console.error('Auth Check Error:', error); // Debugging log
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false); // Set loading to false after auth check
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
