import apiClient from './api';

export const leaguesApi = {
  // Get all leagues
  getAll: async (params = {}) => {
    const response = await apiClient.get('/v1/leagues', { params });
    return response.data;
  },

  // Get single league
  getById: async (id) => {
    const response = await apiClient.get(`/v1/leagues/${id}`);
    return response.data;
  },
};

