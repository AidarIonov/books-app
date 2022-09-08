import { axiosClient } from '../api/api.config';

export const authService = {
  login: async (username, password) => {
    return axiosClient.post('/login', {
      username,
      password,
    });
  },
  getProfile: async () => {},
};
