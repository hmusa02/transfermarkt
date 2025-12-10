import apiClient from './api';

export const transfersApi = {
  // Get all transfers
  getAll: async (params = {}) => {
    const response = await apiClient.get('/v1/transfers', { params });
    return response.data;
  },

  // Get single transfer
  getById: async (id) => {
    const response = await apiClient.get(`/v1/transfers/${id}`);
    return response.data;
  },
};

