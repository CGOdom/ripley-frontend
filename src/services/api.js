// src/services/api.js

import axios from 'axios';

// Determine the base URL from environment variables or default to localhost
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

// Create an Axios instance with predefined configurations
const api = axios.create({
  baseURL: BASE_URL, // Base URL for your backend API
  withCredentials: true, // Include credentials (cookies) with requests
  headers: {
    'Content-Type': 'application/json', // Ensure JSON is used for request bodies
  },
});

// Optional: Add request interceptors for logging or modifying requests
api.interceptors.request.use(
  (config) => {
    // Example: Log the request details
    console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    // Handle request errors
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Optional: Add response interceptors for handling responses globally
api.interceptors.response.use(
  (response) => {
    // Example: Log the response details
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    // Handle response errors
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error(
        `[API Response Error] ${error.response.status} ${error.response.config.url}`,
        error.response.data
      );
    } else if (error.request) {
      // Request was made but no response received
      console.error('[API Response Error] No response received:', error.request);
    } else {
      // Something else caused the error
      console.error('[API Response Error]', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
