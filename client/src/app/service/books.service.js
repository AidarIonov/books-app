import axios from '../api/api.config';

export const booksService = {
  getAll: async () => {
    return await axios.get('/books');
  },
  getById: async (bookId) => {
    return await axios.get(`/books/${bookId}`)
  },
  update: async (bookId, body) => {
    return await axios.get(`/books/update/${bookId}`, body)
  }
};
