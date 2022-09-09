import axios from '../api/api.config';

export const booksService = {
  getAll: async () => {
    return await axios.get('/books');
  },
  getById: async () => {},
};
