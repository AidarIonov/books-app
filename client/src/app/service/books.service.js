import axios from '../api/api.config';

export const booksService = {
  getAll: async () => {
    return await axios.get('/books');
  },
  getById: async (bookId) => {
    return await axios.get(`/books/${bookId}`);
  },
  update: async (bookId, body) => {
    return await axios.put(`/books/update/${bookId}`, body);
  },
  create: async (data) => {
    return await axios.post('/books/create', data);
  },
  delete: async (bookId) => {
    return await axios.delete(`/books/delete/${bookId}`);
  },
};
