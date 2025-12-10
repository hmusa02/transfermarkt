import apiClient from './api';

export const matchesApi = {
  // Get all matches
  getAll: async (params = {}) => {
    const response = await apiClient.get('/v1/matches', { params });
    return response.data;
  },

  // Get single match
  getById: async (id) => {
    const response = await apiClient.get(`/v1/matches/${id}`);
    return response.data;
  },

  // Get match events
  getEvents: async (matchId) => {
    const response = await apiClient.get(`/v1/matches/${matchId}/events`);
    return response.data;
  },

  // Get match player stats
  getPlayerStats: async (matchId) => {
    const response = await apiClient.get(`/v1/matches/${matchId}/player-stats`);
    return response.data;
  },
};

