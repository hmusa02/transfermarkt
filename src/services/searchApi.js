import apiClient from './api';
import { searchMockPlayers } from './mockSearchData';

// Provjeri da li smo na Vercel-u (production) ili trebamo koristiti Vercel API
const isVercel = typeof window !== 'undefined' && window.location.hostname.includes('vercel.app');
// Koristi Vercel API ako smo na Vercel-u ILI ako je eksplicitno postavljeno u env
// ILI ako nema vanjskog backend-a konfigurisanog (default na localhost:8000)
const hasExternalBackend = import.meta.env.VITE_API_BASE_URL && 
  !import.meta.env.VITE_API_BASE_URL.includes('localhost:8000');
const useVercelAPI = isVercel || import.meta.env.VITE_USE_VERCEL_API === 'true' || !hasExternalBackend;
// Za lokalno testiranje, koristi mock podatke ako API ne radi
const useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true' || (!isVercel && !hasExternalBackend);

// Debug log
if (typeof window !== 'undefined') {
  console.log('[SearchAPI] Hostname:', window.location.hostname);
  console.log('[SearchAPI] VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
  console.log('[SearchAPI] VITE_USE_VERCEL_API:', import.meta.env.VITE_USE_VERCEL_API);
  console.log('[SearchAPI] Has external backend:', hasExternalBackend);
  console.log('[SearchAPI] Using Vercel API:', useVercelAPI);
  console.log('[SearchAPI] Using mock data:', useMockData);
}

export const searchApi = {
  // Search suggestions
  suggest: async (query) => {
    if (useMockData) {
      const results = searchMockPlayers(query, 8);
      return results.players.map(p => ({
        model_type: p.model_type,
        model_id: p.model_id,
        title: p.title
      }));
    }
    
    if (useVercelAPI) {
      try {
        const response = await fetch(`/api/search/suggest?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.warn('[SearchAPI] Vercel API failed, using mock data:', error);
        const results = searchMockPlayers(query, 8);
        return results.players.map(p => ({
          model_type: p.model_type,
          model_id: p.model_id,
          title: p.title
        }));
      }
    }
    
    // Koristi vanjski backend
    const response = await apiClient.get('/v1/search/suggest', {
      params: { q: query },
    });
    return response.data;
  },

  // Full search
  full: async (query, params = {}) => {
    if (useMockData) {
      return searchMockPlayers(query, params.limit || 5);
    }
    
    if (useVercelAPI) {
      try {
        const queryParams = new URLSearchParams({
          q: query,
          ...params,
        });
        console.log('[SearchAPI] Fetching from Vercel API:', `/api/search?${queryParams}`);
        const response = await fetch(`/api/search?${queryParams}`);
        console.log('[SearchAPI] Response status:', response.status);
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('[SearchAPI] Response data:', data);
        return data;
      } catch (error) {
        console.warn('[SearchAPI] Vercel API failed, using mock data:', error);
        return searchMockPlayers(query, params.limit || 5);
      }
    }
    
    // Koristi vanjski backend
    const response = await apiClient.get('/v1/search', {
      params: { q: query, ...params },
    });
    return response.data;
  },
};

