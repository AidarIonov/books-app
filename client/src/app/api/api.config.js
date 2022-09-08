import axios from 'axios';

export const SERVER_URL = 'http://localhost:4500';

export const axiosClient = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
