import axios from 'axios';
import type { User, Segment, Campaign, SegmentRule } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Auth API
export const authAPI = {
  loginWithGoogle: () => window.location.href = `${API_BASE_URL}/auth/google`,
  getCurrentUser: (): Promise<User> => api.get('/auth/me').then(res => res.data),
  logout: () => api.post('/auth/logout'),
};

// Segment API
export const segmentAPI = {
  createSegment: (data: Segment): Promise<Segment> => 
    api.post('/segments', data).then(res => res.data),
  getSegments: (): Promise<Segment[]> => 
    api.get('/segments').then(res => res.data),
  previewAudience: (rules: SegmentRule[]): Promise<{ audienceSize: number }> => 
    api.post('/segments/preview', { rules }).then(res => res.data),
  parseNaturalLanguage: (prompt: string): Promise<{ rules: SegmentRule[] }> => 
    api.post('/ai/parse-segment', { prompt }).then(res => res.data),
};

// Campaign API
export const campaignAPI = {
  getCampaigns: (): Promise<Campaign[]> => 
    api.get('/campaigns').then(res => res.data),
  launchCampaign: (segmentId: string, name: string): Promise<Campaign> => 
    api.post('/campaigns', { segmentId, name }).then(res => res.data),
};

export default api;
