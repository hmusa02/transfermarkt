import apiClient from './api';

export const clubsApi = {
  // Get all clubs
  getAll: async (params = {}) => {
    const response = await apiClient.get('/v1/clubs', { params });
    return response.data;
  },

  // Get single club
  getById: async (id) => {
    const response = await apiClient.get(`/v1/clubs/${id}`);
    return response.data;
  },
};

