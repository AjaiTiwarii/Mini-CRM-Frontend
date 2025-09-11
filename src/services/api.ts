import type { User, Segment, Campaign, SegmentRule } from '@/types';

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
  // ✅ RESTORED: The missing loginWithGoogle function
  loginWithGoogle: () => window.location.href = `${BASE}/auth/google`,
  getCurrentUser: () => fetchJson('/auth/me'),
  logout: () => fetchJson('/auth/logout', { method: 'POST' }),
};

/* ---------------- DATA INGESTION ---------------- */
export const dataAPI = {
  /* Customers */
  getCustomers: () => fetchJson('/api/data/customers'),
  createCustomer: (payload: { email: string; name: string; phone?: string }) => 
    fetchJson('/api/data/customers', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  /* Orders */
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

  /* Stats */
  getStats: () => fetchJson('/api/data/stats'),
};

/* ---------------- SEGMENTS  ---------------- */
export const segmentAPI = {
  createSegment: (data: Segment): Promise<Segment> => 
    Promise.resolve({ ...data, id: 'mock' } as Segment),
  getSegments: (): Promise<Segment[]> => 
    Promise.resolve([]),
  previewAudience: (rules: SegmentRule[]): Promise<{ audienceSize: number }> => 
    Promise.resolve({ audienceSize: 0 }),
  parseNaturalLanguage: (prompt: string): Promise<{ rules: SegmentRule[] }> => 
    Promise.resolve({ rules: [] }),
};

/* ---------------- CAMPAIGNS ---------------- */
export const campaignAPI = {
  getCampaigns: (): Promise<Campaign[]> => 
    Promise.resolve([]),
  launchCampaign: (segmentId: string, name: string): Promise<Campaign> => 
    Promise.resolve({ 
      id: 'mock', 
      name, 
      segmentId, 
      status: 'PENDING',
      audienceSize: 0,
      sentCount: 0,
      failedCount: 0,
      createdAt: new Date().toISOString()
    } as Campaign),
};