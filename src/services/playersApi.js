import apiClient from './api';

export const playersApi = {
  // Get all players
  getAll: async (params = {}) => {
    const response = await apiClient.get('/v1/players', { params });
    return response.data;
  },

  // Get single player
  getById: async (id) => {
    const response = await apiClient.get(`/v1/players/${id}`);
    return response.data;
  },

  // Search players
  search: async (query, params = {}) => {
    const response = await apiClient.get('/v1/search', {
      params: { q: query, type: 'player', ...params },
    });
    return response.data;
  },
};

