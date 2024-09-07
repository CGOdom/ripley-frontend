// src/services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Base URL for your backend API
});

export default api;
