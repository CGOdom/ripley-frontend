// src/services/api.js

import axios from 'axios';

// Get the base URL from environment variables or default to your backend's URL
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';


// Create an Axios instance with predefined configurations
const api = axios.create({
  baseURL: BASE_URL, // Backend URL without trailing slash
  withCredentials: true, // Include credentials (cookies) with requests
  headers: {
    'Content-Type': 'application/json', // Ensure JSON is used for request bodies
  },
});

// Optional: Add interceptors for request or response if needed
// Example: Handle global errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error statuses globally
    if (error.response && error.response.status === 401) {
      // Optionally, redirect to login or show a modal
      console.error('Unauthorized access - perhaps redirect to login.');
      // Example: window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
