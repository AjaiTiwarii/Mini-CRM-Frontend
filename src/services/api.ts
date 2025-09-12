import type { SegmentRule } from '@/types';

const BASE = import.meta.env.VITE_API_BASE_URL;

const fetchJson = async (url: string, options: RequestInit = {}) => {
  const res = await fetch(`${BASE}${url}`, { 
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options 
  });
  
  const data = await res.json();
  
  if (!res.ok) {
    throw new Error(data.message || res.statusText);
  }
  
  return data;
};

/* ---------------- AUTH ---------------- */
export const authAPI = {
  loginWithGoogle: () => window.location.href = `${BASE}/auth/google`,
  getCurrentUser: () => fetchJson('/auth/me'),
  logout: () => fetchJson('/auth/logout', { method: 'POST' }),
};

/* ---------------- DATA INGESTION ---------------- */
export const dataAPI = {
  getCustomers: () => fetchJson('/api/data/customers'),
  createCustomer: (payload: { email: string; name: string; phone?: string }) => 
    fetchJson('/api/data/customers', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  getOrders: () => fetchJson('/api/data/orders'),
  createOrder: (payload: { 
    customerId?: string; 
    customerEmail?: string; 
    amount: number; 
    status?: string 
  }) => fetchJson('/api/data/orders', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  getStats: () => fetchJson('/api/data/stats'),
};

/* ---------------- SEGMENTS ---------------- */
export const segmentAPI = {
  getSegments: () => fetchJson('/api/segments'),
  createSegment: (data: { name: string; description?: string; rules: SegmentRule[] }) => 
    fetchJson('/api/segments', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  previewAudience: (rules: SegmentRule[]) => 
    fetchJson('/api/segments/preview', {
      method: 'POST',
      body: JSON.stringify({ rules })
    }),
};

/* ---------------- CAMPAIGNS ---------------- */
export const campaignAPI = {
  getCampaigns: () => fetchJson('/api/campaigns'),
  createCampaign: (data: { segmentId: string; name: string }) => 
    fetchJson('/api/campaigns', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  getCampaignDetails: (campaignId: string) => fetchJson(`/api/campaigns/${campaignId}`),
};