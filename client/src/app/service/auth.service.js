import axios from 'axios';
import { SERVER_URL } from '../api/api.config';
import { saveToLocalStorage } from '../utils/saveToLocalStorage';

export const authService = {
  login: async (username, password) => {
    const res = await axios.post(`${SERVER_URL}/login`, {
      username,
      password,
    });

    if (res.data.token) {
      saveToLocalStorage('user', res.data.data);
      saveToLocalStorage('token', res.data.token);
    }
    return res;
  },
  register: async (username, password, firstName, age) => {
    const res = await axios.post(`${SERVER_URL}/signin`, {
      username,
      password,
      firstName,
      age,
    });
    return res;
  },
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },
};
