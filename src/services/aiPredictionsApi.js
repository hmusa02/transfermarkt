import apiClient from './api';

export const aiPredictionsApi = {
  // Get player development prediction
  getPlayerDevelopment: async (playerId) => {
    const response = await apiClient.get(`/v1/players/${playerId}/development`);
    return response.data;
  },

  // Get AI predictions
  getPredictions: async (params = {}) => {
    const response = await apiClient.get('/v1/ai-predictions', { params });
    return response.data;
  },
};

