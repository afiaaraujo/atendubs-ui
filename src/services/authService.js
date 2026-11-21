import { api } from './api.js';

export const authService = {
  async login(credentials) {
    const response = await api.post('/login', credentials);
    return response.data;
  },
};
