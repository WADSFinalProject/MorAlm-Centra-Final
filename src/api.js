// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://centrabackend.vercel.app',
});

export default api;
