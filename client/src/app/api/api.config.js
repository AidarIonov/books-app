import axios from 'axios';

export const SERVER_URL = 'http://localhost:4500';

export const axiosClient = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const instance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('token'));
  if (config.headers && token) {
    config.headers = {
      ...config.headers,
      'X-Auth': token,
    };
  }

  return config;
});

export default instance;
