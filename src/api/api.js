import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your API base URL
  timeout: 5000, // Timeout in milliseconds
});

export default api;
