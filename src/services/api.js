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

export default api;
